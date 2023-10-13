import time
import paramiko
import requests
import socket
from variable import BACKEND_URL

def restartRemoteCommand(host, username, password, command):
    message = ""
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(host, username=username, password=password)
        stdin, stdout, stderr = client.exec_command(command)
        for line in stdout:
            message += line.strip('\n')
        # Check for any error messages
        for line in stderr:
            message += line.strip('\n')
    except paramiko.AuthenticationException:
        print("Authentication failed. Please check the username and password.")
    except paramiko.SSHException as ssh_err:
        print("SSH error occurred:", str(ssh_err))
    except paramiko.Exception as e:
        print("An error occurred:", str(e))
    finally:
        client.close()
    return message

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
    
def sendMessage(request):
    print(request)
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
        # Handle exceptions, such as network errors
        print(f"An error occurred: {e}")
        return None

    
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

def main():
    # Your code here
    allApiRequests =  get_data_from_api()
    for reqest in allApiRequests:
        response = tcpChecker(reqest)
        print(response)
        if(not response):
            sendMessage(reqest)


if __name__ == "__main__":
    main()