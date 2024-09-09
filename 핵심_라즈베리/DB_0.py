from random import *
# import time
import pymysql




def DB_insert(sql):

        conn = pymysql.Connect(host="project-db-cgi.smhrd.com",
                               port= 3307,
                               user="campus_24IS_IoT1_P2_2",
                               password="smhrd2",
                               db="campus_24IS_IoT1_P2_2",
                               charset='utf8')
        curr = conn.cursor()
        
        print(sql)
        curr.execute(sql)
        conn.commit()
        
        curr.close()
        conn.close()
        conn = None
        curr = None
