/**mysql 연결정보를 관리하는 파일    */
const mysql = require("mysql2");

// db에 연결할 정보들을 기입
const conn = mysql.createPool({
                                        host : "project-db-cgi.smhrd.com",
                                        port : 3307,
                                        user : "campus_24IS_IoT1_P2_2",
                                        password : "smhrd2",
                                        database : "campus_24IS_IoT1_P2_2",
                                        waitForConnections: true,
                                        connectionLimit: 10,
                                        queueLimit: 0
                                    })
//연결실행
// conn.connect();


module.exports = conn;