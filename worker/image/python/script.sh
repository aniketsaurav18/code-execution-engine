#!/usr/bin/env bash

ulimit -s $memoryLimit
timeout -s SIGTERM $timeLimit python3 ./shared/$ID/code.py < ./shared/$ID/input.txt
exit $? 