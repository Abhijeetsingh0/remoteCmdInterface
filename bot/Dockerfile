# Use a base image with Python and SSH client tools
FROM ubuntu:20.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && apt-get install -y python3 python3-pip openssh-client cron

# Create a directory for your Python script and SSH key
RUN mkdir -p /app /root/.ssh

# Copy your Python script and variable file to the container
COPY . /app/

# Set appropriate permissions for the SSH key
# RUN sudo chmod 600 /root/.ssh/id_rsa

# Install Python packages
RUN pip3 install paramiko requests 

# Add the SSH configuration for the remote servers (if needed)

# Create a cron job script
RUN echo '* * * * * root /usr/bin/python3 /app/main.py >> /var/log/cron.log 2>&1' > /etc/cron.d/cronjob_script
RUN chmod 0644 /etc/cron.d/cronjob_script
RUN crontab /etc/cron.d/cronjob_script

# Expose the SSH agent socket (if needed)

# Start the cron service in the background
CMD ["cron", "-f"]


# docker run -d -p 222:22 remoteappbot