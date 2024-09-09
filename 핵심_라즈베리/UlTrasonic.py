import time
import RPi.GPIO as gp

TRIG1 = 23
ECHO1 = 24
TRIG2 = 27
ECHO2 = 22
LED_0 = 20

gp.setmode(gp.BCM)
gp.setup(TRIG1, gp.OUT)
gp.setup(ECHO1, gp.IN)
gp.setup(TRIG2, gp.OUT)
gp.setup(ECHO2, gp.IN)
gp.setup(LED_0,gp.OUT)

def distance(trig, echo):
    gp.output(trig, gp.LOW)
    time.sleep(0.5)
    gp.output(trig, gp.HIGH)
    time.sleep(0.00001)
    gp.output(trig, gp.LOW)

    while gp.input(echo) == gp.LOW:
        pulse_start = time.time()

    while gp.input(echo) == gp.HIGH:
        pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150
    distance = round(distance, 2)
    return distance

def find():
        # 첫 번째 센서 측정
        dist1 = distance(TRIG1, ECHO1)
        #print(f"Distance 1: {dist1} cm")
        
        # 두 번째 센서 측정
        dist2 = distance(TRIG2, ECHO2)
        #print(f"Distance 2: {dist2} cm")
        
        if dist1 <=10 and dist2<=10:
            result = True
        else:
            result = False
        return {'dist1' : dist1,
                'dist2' : dist2,
                'result' : result}
