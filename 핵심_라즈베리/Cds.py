import spidevRead as sr
import time
import RPi.GPIO as gp

gp.setmode(gp.BCM)
    
def differ():
    data_r = sr.analog_read(0)
    print("r",data_r)
    data_l = sr.analog_read(1)
    print("l",data_l)
    
    result = data_r - data_l
    return result
'''
while(1) :
    print(differ())
    time.sleep(1)
      '''  