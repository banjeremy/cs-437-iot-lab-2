from controls import Controls

ctl = Controls()
ctl.forward()

print(ctl.get_stats())

ctl.stop()

print(ctl.get_stats())
