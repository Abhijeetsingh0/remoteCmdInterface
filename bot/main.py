import paramiko
import requests
import socket
import datetime
import json
from variable import BACKEND_URL

#to run the command on the remote server
def CommandOnRemote(host, username, password, command):
    message = ""
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(host, username=username, password=password)
        stdin, stdout, stderr = client.exec_command(command)
        for line in stdout:
            message += line.strip('\n')
        for line in stderr:
            message += line.strip('\n')
    except paramiko.AuthenticationException:
        print("Authentication failed. Please check the username and password.")
    except paramiko.SSHException as ssh_err:
        print("SSH error occurred:", str(ssh_err))
    finally:
        client.close()
    return message

#to check the serice is running on the requests server
def checkTheService(reqest):
    service = reqest["alertDetails"][0]
    host = reqest["host"]
    userName = reqest["userName"]
    password = reqest["password"]
    command = f"echo {password}"+"| sudo -S service --status-all | grep "+service +" > /tmp/bot.log && cat /tmp/bot.log"
    response = CommandOnRemote(host,userName,password,command)
    print(response)
    return response

#to check if the tcp port is up running for reqested server
def tcpChecker(reqest):
    port = int(reqest["alertDetails"][0])
    host = reqest["host"]
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(5)
            s.connect((host, port))
        return True
    except (socket.timeout, ConnectionRefusedError):
        return False

#to check the URL status on if we try to reach from the reqestes server
def urlCheckerFromTheSever(url,details):
    command = "curl -Is " + url +"| head -n 1 | awk '{print $2}' > /tmp/bot.log && cat /tmp/bot.log"
    host = details["host"]
    userName = details["userName"]
    password = details["password"]
    message = CommandOnRemote(host, userName, password, command)
    if (message == "" ) :
        return False
    else:
        statusCode = int(message)
        print(statusCode)
        if statusCode >= 400 and statusCode <= 600:
            return False
    return True 

#to post/send the message to the required api
def sendMessage(request):
    print("from the send message",request)
    data = {
        "serverName":request["serverName"],
        "host":request["serverName"],
        "userName":request["serverName"],
        "alertType":request["serverName"],
        "message":request["alertDetails"][1]
        }
    try:
        response = requests.post(BACKEND_URL+"/alert/message",json=data)
        post_response_json = response.json()
        print(post_response_json)
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

# to get the data/all the alert requests which need to check
def get_data_from_api():
    try:
        response = requests.get(BACKEND_URL+"/alert/")
        if response.status_code == 200:
            data = response.json()
            return data["data"]
        else:
            print(f"Request failed with status code: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

#this part of the code is to take care of the alert continuation casue this program
#will run every minute inside the conatiner and if somthing goes wrong the alert will
#keep comming again and again every minute so we can store the data of the perticular alert
#into the json file and check if the perticualr alert have been send or not and if yes then 
#it must be after 30 min only and in order to manage this we need to maintain recent.json file
#all the below function is responsible to communicate with it.

def create_entry(json_file, new_entry):
    try:
        with open(json_file, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {"entries": []}
    data["entries"].append(new_entry)
    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)

def read_entries(json_file):
    try:
        with open(json_file, 'r') as file:
            data = json.load(file)
            entries = data.get("entries", [])
            return entries
    except FileNotFoundError:
        return []

def does_id_exist(json_file, entry_id):
    try:
        with open(json_file, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        return False
    entries = data.get("entries", [])
    for entry in entries:
        if entry.get("id") == entry_id:
            return True
    return False

def delete_entry_by_id(json_file, entry_id):
    try:
        with open(json_file, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        return
    entries = data.get("entries", [])
    entries = [entry for entry in entries if entry.get("id") != entry_id]
    data["entries"] = entries
    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)

def manageTheAlerts(id):
    file_json = "recent.json"
    data = read_entries(file_json)
    currTime = str(datetime.datetime.now())
    for obj in data:
        if timeDeff(30,currTime,obj["date"]):
            # print(obj["id"])
            delete_entry_by_id(file_json,obj["id"])

#to find the time diff of the alert time and current time. 
def timeDeff(timeDif, timestamp1, timestamp2):
    dt1 = datetime.datetime.strptime(timestamp1, "%Y-%m-%d %H:%M:%S.%f")
    dt2 = datetime.datetime.strptime(timestamp2, "%Y-%m-%d %H:%M:%S.%f")
    time_difference = dt2 - dt1
    if abs(time_difference.total_seconds()) > timeDif * 60:
        return True
    else:
        return False

#main funtion    
def main():
    # Your code here
    allApiRequests =  get_data_from_api()
    print(allApiRequests)
    file_json = "recent.json"
    for request in allApiRequests:
        manageTheAlerts(request["_id"])
        if not does_id_exist(file_json,request["_id"]):
            if request["alertType"] == "tcp":
                response = tcpChecker(request)
                print(response)
                if(not response):
                    sendMessage(request)
                    create_entry(file_json,{"id":request["_id"],"date":str(datetime.datetime.now())})
            if request["alertType"] == "url":
                url = request["alertDetails"][0]
                response = urlCheckerFromTheSever(url,request)
                if not response:
                    sendMessage(request)
                    create_entry(file_json,{"id":request["_id"],"date":str(datetime.datetime.now())})
            if request["alertType"] == "exec":
                response = checkTheService(request)
                if '+' not in response :
                    sendMessage(request)
                    create_entry(file_json,{"id":request["_id"],"date":str(datetime.datetime.now())})
    # print(allApiRequests)

if __name__ == "__main__":
    main()