const pool = require('../middleware/dbConfig');

module.exports = { getChampionInfo, createChampionInfo };

async function getChampionInfo(id)
{
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT user_id, champ_name, champ_type, leadership, team, location
                    FROM USERS_INFO WHERE user_id = '${id}'`;
        const result = await connection.query(sql);
        connection.release();
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function createChampionInfo(c)
{
    try {
        console.log(`${c.user_id} / ${c.champ_name}`);
        const connection = await pool.getConnection();
        const sql = `INSERT INTO USERS_INFO (user_id, champ_name, champ_type, leadership, team)
                    VALUES ('${c.user_id}', '${c.champ_name}', '${c.champ_type}', '${c.leadership}', '${c.team}')`;
        const result = await connection.query(sql);
        connection.release();
        return result[0];
        // ResultSetHeader {
        // fieldCount: 0,
        // affectedRows: 1,
        // insertId: 1,
        // info: '',
        // serverStatus: 2,
        // warningStatus: 0,
        // changedRows: 0 }
    } catch (err) {
        console.log(err);
    }
}