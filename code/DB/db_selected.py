import matplotlib.pyplot as plt
import pandas as pd
import mysql.connector
import json
from decimal import Decimal


conn = mysql.connector.connect(
    host = "project-db-cgi.smhrd.com",
    port = 3307,
    user = "campus_24IS_IoT1_P2_2",
    password = "smhrd2",
    database = "campus_24IS_IoT1_P2_2"
    )
curs = conn.cursor()

# 누적 생산량 구하는 코드
sql = """SELECT SUM(energy) 
        FROM tb_generated_power 
        WHERE DAY(created_at) >=1 and day(created_at) <= 31 ;"""
curs.execute(sql)
st_prod = curs.fetchall()

# 누적 축적량 구하는 코드
usage = 10000 *0.1
sql = f"""select sum(t1.energy) - {usage}
from (select distinct energy, created_at
		from tb_generated_power
		where created_at>= DATE_ADD(NOW(), INTERVAL -1 month)) t1;"""
curs.execute("SELECT SUM(energy) FROM tb_generated_power")
st_stack = curs.fetchall()

# 효율
sql="""SELECT distinct avg(t1.efficienty)
        FROM tb_generated_power t1
        JOIN (
            SELECT panel_idx, MAX(created_at) AS latest
            FROM tb_generated_power
            GROUP BY panel_idx
        ) t2
        ON t1.panel_idx = t2.panel_idx AND t1.created_at = t2.latest;"""
curs.execute(sql)
efficienty = curs.fetchall()

# 현재 평균 생산량 구하는 코드
sql = """SELECT distinct avg(t1.energy)
FROM tb_generated_power t1
JOIN (
    SELECT panel_idx, MAX(created_at) AS latest
    FROM tb_generated_power
    GROUP BY panel_idx
) t2
ON t1.panel_idx = t2.panel_idx AND t1.created_at = t2.latest;
"""
curs.execute(sql)
curr_prod = curs.fetchall()

# 배터리 충전 상태 구하는 코드
now = 0.5
usage = 10000 *0.1
battery = 10000
sql=f"""select ( {battery} * {now} + sum(t1.energy) - {usage}) /{battery} *100
from (select distinct energy , created_at from tb_generated_power) t1;
"""
curs.execute(sql)
charge = curs.fetchall()

# 전압 구하는 코드
sql = """SELECT distinct avg(t1.votage)
FROM tb_generated_power t1
JOIN (
    SELECT panel_idx, MAX(created_at) AS latest
    FROM tb_generated_power
    GROUP BY panel_idx
) t2
ON t1.panel_idx = t2.panel_idx AND t1.created_at = t2.latest;"""
curs.execute(sql)
voltage =curs.fetchall()

# 이용률 높은 주차장 위치 + 평균 이용시간 코드
sql = """SELECT parking_lot, avg(parking_duration) as D
FROM tb_parking
where parking_lot like '자리%'
GROUP BY parking_lot 
order by D desc limit 1;"""
curs.execute(sql)
avg_duration =curs.fetchall()

##초음파센서 이상치 탐지
sql="""SELECT distinct parking_lot 
        FROM tb_parking 
        where created_at>= date(date(now())-2) 
                        and(sensing_value1>170
                                or sensing_value1<2 
                                or sensing_value2>170 
                                or sensing_value2<2); """
curs.execute(sql)
test =curs.fetchall()
ultraError = []
for i in range(len(test)):
    ultraError.append(test[i][0])


##태양광 패널 이상치 탐지
sql="""SELECT distinct panel_idx 
        FROM tb_generated_power 
        where created_at>= date(date(now())-2)
            and energy<3;"""
curs.execute(sql)
test1 =curs.fetchall()
panelError = []
for i in range(len(test1)):
    panelError.append(test1[i][0])
        
# 사용자 정의 JSONEncoder 클래스
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return super(DecimalEncoder, self).default(obj)
        
        
        
print(json.dumps({ 'thisStack' : float(round(st_prod[0][0],2)), 
        'thisPure': float(round(st_stack[0][0], 2)),
        "nowEff" : float(round(efficienty[0][0],2)),
        'nowCreate':float(round(curr_prod[0][0], 2)),
        'battery':float(round(charge[0][0], 2)),
        'V':float(round(voltage[0][0],2)),
        "longUse":avg_duration[0][0],
        "useDuration": float(round(avg_duration[0][1],2)),
        "ultraError": ultraError,
        "panelError": panelError
        }))
