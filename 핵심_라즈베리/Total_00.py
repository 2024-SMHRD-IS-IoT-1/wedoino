import Current_0 as Cur
import DB_0 as DB_0
import Flame as Fl
import Servo as ser
import UlTrasonic as Ul

degree = 90
ser.setServoPos(degree) # 시작위치 지정
panel_idx = 1		# 패널명 지정
count = 0			# 각 센서의 인덱스 값을 자동으로 늘어나게 하기 위함
park_lot = 'A0'		# 주차위치 지정
emp_no = "emp_no 002"#관리자 사번 지정
parkCount = 0		# 주차 시간 count

while(1):
    #servo
    sr.servo_act(degree)
    
    #generated_power
    cur = Cur.read_ina219()
    print(cur)
    sql = "insert into tb_generated_power VALUES(%d,%d,%0.2f,%0.2f,%0.2f,%d,date(NOW()))"%(count,panel_idx,cur['voltage'],cur['current'],cur['power'],cur['power']/10.5*100)
    DB_0.DB_insert(sql)
    
    #flame 
    fl = Fl.IsFlame()
    print(fl)
    system = "n"
    firestation = "n"
    sql = "insert into tb_flame values (%d,'%s','%s',NOW(),'%s')"%(count,system,firestation,emp_no)
    DB_0.DB_insert(sql)
    
    #parking 초음파
    ul = Ul.find()
    print(ul)
    if ul['result'] == True:
        parkCount +=1
        
    else:
        parkCount = 0
    sql = "insert into tb_parking values (%d, %0.2f,%0.2f, '%s', '%s', NOW(), %d)"%(count, ul['dist1'], ul['dist2'] ,park_lot, str(parkCount), panel_idx) 
    DB_0.DB_insert(sql)
    