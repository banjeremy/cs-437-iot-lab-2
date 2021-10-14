import json
import socket

from controls import Controls

ctl = Controls()

HOST = "192.168.0.100"  # IP address of your pc
PORT = 1337  # The port used by the server

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    while True:

        # send actual stats
        s.send(
            '{"type": "stat", "name": "temperature", "value": 8765}'.encode()
        )  # send the encoded message (send in binary format)

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
