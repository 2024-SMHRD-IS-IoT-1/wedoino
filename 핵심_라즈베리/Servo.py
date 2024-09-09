import pigpio
import time

servoPin           = 12  
servoPin_2         = 13

pi = pigpio.pi()
pi.set_servo_pulsewidth(servoPin,0)
pi.set_servo_pulsewidth(servoPin_2,0)
def setServoPos(pin,degree):
    if degree>=0 and degree<=180:
        duty = 600+10*degree
        pi.set_servo_pulsewidth(pin,duty)
def servo_act(degree):
    dif = Cds.differ()			# 센서값 읽어오기
    if dif<=-1 or dif >= 1 :	# 오차범위 +- 1
        #실행
        if dif > 0 :				# 오른쪽이 더 빛을 많이 받으면 
            setServoPos(degree+2)	# 서보모터를 오른쪽으로 2도 이동
            setServoPos(180 - (degree+2))
            degree = degree+2
        else:						# 왼쪽이 더  빛을 많이 받으면
            setServoPos(degree-2)	# 서보모터를 왼쪽으로 2도 이동
            setServoPos(180 - (degree-2))
def test():
    for i in range(0,180,1):
        setServoPos(servoPin,i)
#         setServoPos(servoPin_2,180-i)
        time.sleep(0.1)
    for j in range(180,0,-1):
        setServoPos(servoPin,j)
#         setServoPos(servoPin_2,180-j)
        time.sleep(0.1)
# while True:
#     test()
    