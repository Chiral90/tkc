const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
var conn = mysql.createConnection({ 
    host : '192.168.0.5',
    port: 3306,  
    user : 'chiral',
    password : process.env.SQL_PWD,
    database : 'tkc'
});

// var pool = mysql.createPool(dbConfig);
// // Get Connection in Pool
// pool.getConnection(function(err,connection){
//   if(!err){
//     //connected!
//   }
//   // 커넥션을 풀에 반환
//   connection.release();
// });

router.get('/', (req, res) => {
    //
    conn.connect(); // mysql과 연결

    // var sql = `CREATE TABLE USERS_INFO
    // (
    //     _id INT PRIMARY KEY AUTO_INCREMENT,
    //     user_id VARCHAR(20) NOT NULL,
    //     champ_name VARCHAR(20) NOT NULL,
    //     champ_type INT DEFAULT 0 NOT NULL,
    //     leadership INT DEFAULT 0 NOT NULL,
    //     team INT DEFAULT 0 NOT NULL,
    //     location VARCHAR(20) DEFAULT ""
    // ) ENGINE=INNODB;`
    // var sql = `CREATE TABLE USERS_OWNCASTLES_INFO
    // (
    //     _id INT PRIMARY KEY AUTO_INCREMENT,
    //     champ_name VARCHAR(20) NOT NULL,
    //     own_castles VARCHAR(20) NOT NULL
    // ) ENGINE=INNODB;`

    // var sql = `CREATE TABLE BUILDINGS_INFO
    // (
    //     _id INT PRIMARY KEY AUTO_INCREMENT,
    //     building_name VARCHAR(20) NOT NULL,
    //     castellan VARCHAR(20) NOT NULL,
    //     team INT DEFAULT 0 NOT NULL,
    //     building_type INT DEFAULT 0 NOT NULL,
    //     population INT DEFAULT 0 NOT NULL,
    //     food INT DEFAULT 0 NOT NULL,
    //     morale INT DEFAULT 0 NOT NULL
    // ) ENGINE=INNODB;
    // var sql = `CREATE TABLE BUILDINGS_STATIONED_INFO
    // (
    //     _id INT PRIMARY KEY AUTO_INCREMENT,
    //     building_name VARCHAR(20) NOT NULL,
    //     stationed VARCHAR(20) DEFAULT '',
    //     destination VARCHAR(20) DEFAULT ''
    // ) ENGINE=INNODB;`

    // var sql = `CREATE TABLE TEAM_INFO
    // (
    //     _id INT PRIMARY KEY AUTO_INCREMENT,
    //     team_type INT NOT NULL,
    //     team_name VARCHAR(20) NOT NULL,
    //     leader VARCHAR(20) NOT NULL
    // ) ENGINE=INNODB;`

    conn.query(sql, function(err, rows, fields)
    {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log(rows);
            
    });

    conn.end(); // 연결 해제
});

module.exports = router;