FROM ubuntu:16.04

# get the binary dependencies
RUN sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list
#RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y --force-yes libav-tools libopus0 python3 python3-pip gcc g++ libssl-dev

# Make dirs
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/output
RUN mkdir -p /usr/src/app/recordings
WORKDIR /usr/src/app

# Copy and install all reqs
COPY requirements.txt /usr/src/app/
RUN python3 -m pip install --no-cache-dir -r requirements.txt
COPY nltk_download_packages.sh /usr/src/app/
RUN sh nltk_download_packages.sh

# Copy all relevant files (not under Dockerignore)
COPY . /usr/src/app

# Run the Python command
CMD [ "sh", "/usr/src/app/run.sh" ]
