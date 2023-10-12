
def restartRemoteCommand(host, username, password, command):
    message = ""
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        client.connect(host, username=username, password=password)
        stdin, stdout, stderr = client.exec_command(command)

        # Print the output
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



    

