import RPi.GPIO as gp #RPi.gp 라이브러리를 gp로 사용
from time import sleep  #time 라이브러리의 sleep함수 사용
import Cds


gp.setmode(gp.BCM) 

servo_num = 0

servoPin           = 12  
servoPin_2         = 13  

gp.setup(servoPin, gp.OUT) 
gp.setup(servoPin_2, gp.OUT)

servo = gp.PWM(servoPin, 50)  
servo_2 = gp.PWM(servoPin_2, 50)
servo.start(0)  
servo_2.start(0)

SERVO_MAX_DUTY     = 12
SERVO_MIN_DUTY     = 3 

# 각도 -> duty 로 변환, 최대 최소 각도 제한 
def setServoPos(servo_num,degree):
  # 각도는 180도를 넘을 수 없다.
    if degree > 180:
        degree = 180
    elif degree < 0:
        degree = 0

    # 각도(degree)를 duty로 변경한다.
    duty = SERVO_MIN_DUTY+(degree*(SERVO_MAX_DUTY-SERVO_MIN_DUTY)/180.0)
    # duty 값 출력
    print("{} Degree: {}to {}(Duty)".format(servo_num, degree, duty))


    if servo_num == 1:
        servo.ChangeDutyCycle(duty)
        
        
    elif servo_num == 2:
        servo_2.ChangeDutyCycle(duty)
        
#move servo
def servo_act(degree):
    dif = Cds.differ()			# 센서값 읽어오기
    if dif<=-1 or dif >= 1 :	# 오차범위 +- 1
        #실행
        if dif > 0 :				# 오른쪽이 더 빛을 많이 받으면 
            setServoPos(degree+2)	# 서보모터를 오른쪽으로 2도 이동
        else:						# 왼쪽이 더  빛을 많이 받으면
            setServoPos(degree-2)	# 서보모터를 왼쪽으로 2도 이동
