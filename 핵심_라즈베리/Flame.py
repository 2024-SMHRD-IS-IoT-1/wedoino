import RPi.GPIO as gp
import spidevRead as sr
from time import sleep

INFRARED = 21  
BUZZER = 19     
LED = 16        

gp.setmode(gp.BCM)
gp.setup(INFRARED, gp.IN) #D0 핀 입력.
gp.setup(BUZZER, gp.OUT)
gp.setup(LED, gp.OUT)
p = gp.PWM(BUZZER,500) # 핀번호, 주파수
p.start(0)

def IsFlame():
        data_2 = sr.analog_read(2)
#         print(data_2)
        if data_2 < 40 :  # 적외선 센서가 '감지' 했을 때
            print("on")
            gp.output(BUZZER, True)
            p.ChangeFrequency(7900)
            gp.output(LED, True)
            result = True
            
        else :# 적외선 센서에 아무것도 감지되지 않을 때
            print("off")
            gp.output(BUZZER, False)
            gp.output(LED, False)
            result = False
        return result

