const pool = require('../middleware/dbConfig');

module.exports = { getRound, createTurn, resetTurn };

async function getRound()
{
    try {
        const connection = await pool.getConnection();
        var sql = `SELECT round, turn, start_time FROM TURN_INFO WHERE round=(SELECT MAX(round) FROM TURN_INFO) AND turn=(SELECT MAX(turn) FROM TURN_INFO);`;
        // var sql = `select round, turn, start_time, end_time from turn_info;`;
        const result = await connection.query(sql);
        connection.release();
        console.log(result);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}
async function createTurn(round, turn)
{
    try {
        const connection = await pool.getConnection();
        if (turn != 0) {
            var sql2 = `UPDATE TURN_INFO set end_time=NOW()
                        WHERE round=${round} AND turn=(SELECT max(turn) as turn FROM TURN_INFO);`
            const result2 = await connection.query(sql2);
            console.log(result2);
        }

        var sql = `INSERT INTO TURN_INFO (round, start_time)
                    VALUES (${round}, NOW());`;
        
        const result = await connection.query(sql);
        connection.release();
        console.log(result);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}
async function resetTurn(round)
{
    try {
        const connection = await pool.getConnection();
        var sql = `DELETE FROM TURN_INFO
                    WHERE round=${round};`;
        
        const result = await connection.query(sql);
        connection.release();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
}


// async function tmpMethod()
// {
//     try {
//         const connection = await pool.getConnection();
//         var sql = `insert into turn_info (round, start_time)
//         values (1, now())`;
//         const result = await connection.query(sql);
//         connection.release();
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// }