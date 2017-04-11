FROM ubuntu:16.04

# get the binary dependencies
RUN sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list
#RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y --force-yes libav-tools libopus0 python3 python3-pip gcc g++ libssl-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/
RUN python3 -m pip install --no-cache-dir -r requirements.txt
COPY nltk_download_packages.sh /usr/src/app/
RUN sh nltk_download_packages.sh

COPY . /usr/src/app

# Run the Python command
#TODO: Change to http server entry point when available
CMD [ "python3", "fetcher.py", "https://www.youtube.com/watch?v=dQw4w9WgXcQ" ]
