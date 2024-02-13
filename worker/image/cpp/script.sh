#!/usr/bin/env bash

ulimit -s $memoryLimit
g++ ./shared/$ID/code.cpp -o exec
timeout -s SIGTERM $timeLimit ./exec < ./shared/$ID/input.txt
exit $?  