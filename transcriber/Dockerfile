FROM python:3.6

# get the binary dependencies
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y --force-yes libav-tools

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt
COPY nltk_download_packages.sh /usr/src/app/
RUN sh nltk_download_packages.sh

COPY . /usr/src/app

# Run the Python command
CMD [ "python", "./your-script.py" ]
