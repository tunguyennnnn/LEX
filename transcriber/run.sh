#!/bin/sh
python3 worker.py &
python3 server.py
pkill -f 'python3*'
kill $(jobs -p)
