const express = require('express');
const pool = require('../middleware/dbConfig');
const router = express.Router();

// const mysql = require('mysql2');
// var conn = mysql.createConnection({ 
//     host : '192.168.0.5',
//     port: 3306,  
//     user : 'chiral',
//     password : process.env.SQL_PWD,
//     database : 'tkc'
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

router.get('/building/:name', async (req, res) => {
    var name = req.params.name;
    var building_data;
    var stationed_data = [];
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT building_name, castellan, team, building_type, population, food, morale
                    FROM BUILDINGS_INFO
                    WHERE building_name = '${name}'`;
        const [rows] = await connection.query(sql);
        building_data = rows;
        var sql2 = `SELECT stationed FROM BUILDINGS_STATIONED_INFO WHERE building_name = '${name}'`
        const [rows2] = await connection.query(sql2);
        
        rows2.forEach(element => {
            stationed_data.push(element.stationed);
        });
        // building_data = JSON.stringify(rows).replace('[', '').replace(']', '').replace('{', '').replace('}', '');
        // stationed_data = JSON.stringify(stationed_data).replace('[', '').replace(']', '').replace('{', '').replace('}', '');
        // var result = '{' + building_data + ',"stationed":[' + stationed_data + ']}';
        var result = {building_data, stationed_data: '{' + stationed_data + '}'};
        console.log((result));
        res.json(result);
        connection.release();
    } catch (err) {
        console.log(err);
    }
  });

// router.get('/building/:name', (req, res) => {
//     //
//     var name = req.params.name;
//     conn.connect(); // mysql과 연결
//     var building_data = '';
//     var stationed_data = '';

//     // var sql = `SELECT BUILDINGS_INFO.building_name, BUILDINGS_INFO.castellan, BUILDINGS_INFO.team, BUILDINGS_INFO.building_type,
//     //                 BUILDINGS_INFO.population, BUILDINGS_INFO.food, BUILDINGS_INFO.morale,
//     //                 BUILDINGS_STATIONED_INFO.stationed
//     //             FROM BUILDINGS_INFO
//     //             LEFT JOIN BUILDINGS_STATIONED_INFO on BUILDINGS_INFO.building_name = BUILDINGS_STATIONED_INFO.building_name
//     //             WHERE BUILDINGS_INFO.building_name = \'${name}\';`
//     var sql = `SELECT building_name, castellan, team, building_type, population, food, morale
//                 FROM BUILDINGS_INFO
//                 WHERE building_name = '${name}'`;
//     conn.query(sql, function(err, rows, fields)
//     {
//         if (err) {
//             console.error('error connecting: ' + err.stack);
//         }
//         console.log(rows);
//         // res.json(rows);
//         building_data = rows;
//         console.log('building: ', building_data);
//     });
//     var sql2 = `SELECT stationed FROM BUILDINGS_STATIONED_INFO WHERE building_name = '${name}'`
//     conn.query(sql2, function(err, rows, fields)
//     {
//         if (err) {
//             console.error('error connecting: ' + err.stack);
//         }
//         console.log(rows);
//         // res.json(rows);
//         stationed_data = rows;
//         console.log('stationed: ', stationed_data);
//     });
//     conn.end(); // 연결 해제
    
//     var result = { building_data: building_data, stationed_data: stationed_data};
//     console.log(JSON.stringify(result));
//     res.json(result);
// });

module.exports = router;