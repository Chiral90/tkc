const pool = require('../middleware/dbConfig');

module.exports = { getRound };

async function getRound()
{
    try {
        const connection = await pool.getConnection();
        var sql = `SELECT round, turn, start_time FROM TURN_INFO WHERE round=(SELECT MAX(round) FROM TURN_INFO) AND turn=(SELECT MAX(turn) FROM TURN_INFO);`;
        const result = await connection.query(sql);
        connection.release();
        console.log(result);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

// async function tmpMethod()
// {
//     try {
//         const connection = await pool.getConnection();
//         var sql = `CREATE TABLE TURN_INFO
//         (
//         round INT NOT NULL,
//         turn INT NOT NULL,
//         start_time datetime,
//         end_time datetime,
//         PRIMARY KEY (round, turn)
//         ) ENGINE=INNODB;`;
//         const result = await connection.query(sql);
//         connection.release();
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// }