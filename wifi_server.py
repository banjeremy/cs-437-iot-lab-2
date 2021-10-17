import json
import socket
from threading import Thread
from time import sleep

from controls import Controls

ctl = Controls()

HOST = "192.168.0.117"  # IP address of your pc
PORT = 1337  # The port used by the server


def send_stats(socket):
    while True:
        socket.send(json.dumps(ctl.get_stats()).encode())
        sleep(1)


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    thread = Thread(target=send_stats, args=(s,))
    thread.start()

    while True:
        try:
            data = s.recv(1024)
            message = json.loads(data.decode())

            if message["type"] == "command":
                if message["name"] == "FORWARD":
                    ctl.forward()
                elif message["name"] == "BACKWARD":
                    ctl.backward()
                elif message["name"] == "LEFT":
                    ctl.turn_left()
                elif message["name"] == "RIGHT":
                    ctl.turn_right()
                elif message["name"] == "STOP":
                    ctl.stop()

        except Exception as e:
            print(e)
