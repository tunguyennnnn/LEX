FROM python:3.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt
COPY nltk_download_packages.sh /usr/src/app/
RUN sh nltk_download_packages.sh

COPY . /usr/src/app

CMD [ "python", "./your-script.py" ]
