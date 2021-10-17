import picar_4wd as fc


class Controls:
    def __init__(self):
        self.current_direction = "FORWARD"
        self.power = 100
        self.distance_traveled = 0
        self.is_stopped = True

    def forward(self):
        self.current_direction = "FORWARD"
        self.is_stopped = False
        fc.forward(self.power)

    def backward(self):
        self.current_direction = "BACKWARD"
        self.is_stopped = False
        fc.backward(self.power)

    def turn_left(self):
        self.current_direction = "LEFT"
        self.is_stopped = False
        fc.turn_left(self.power)

    def turn_right(self):
        self.current_direction = "RIGHT"
        self.is_stopped = False
        fc.turn_right(self.power)

    def stop(self):
        self.current_direction = "STOP"
        self.is_stopped = True
        fc.stop()

    def get_stats(self):
        self.distance_traveled += 0 if self.is_stopped else self.power

        return [
            {
                "type": "stat",
                "name": "temperature",
                "value": fc.cpu_temperature(),
            },
            {
                "type": "stat",
                "name": "speed",
                "value": 0 if self.is_stopped else self.power,
            },
            {
                "type": "stat",
                "name": "direction",
                "value": self.current_direction,
            },
            {
                "type": "stat",
                "name": "distance",
                "value": self.distance_traveled,
            },
        ]
