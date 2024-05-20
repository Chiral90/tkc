const pool = require('../middleware/dbConfig');

module.exports = { getChampionInfo, createChampionInfo, createStationedInfo, updateDestination, updateLocation, changeTeam };

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

async function createStationedInfo(c)
{
    try {
        const connection = await pool.getConnection();
        const sql = `INSERT INTO USERS_DESTINATION_INFO (champ_name)
                    VALUES ('${c.champ_name}');`
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
                    VALUES ('${c.user_id}', '${c.champ_name}', '${c.champ_type}', '${c.leadership}', '${c.team}');`;
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
async function updateDestination(champ_name, building_name)
{
    // 트리거로 정기 업데이트
    try {
        // 트리거로 일정 시간되면 업데이트?
    } catch (err) {

    }
    // 신규 유저 즉시 업데이트
    try {
        const connection = await pool.getConnection();
        var sql = `UPDATE USERS_DESTINATION_INFO SET destination='${building_name}'
                    WHERE champ_name='${champ_name}'`
        const result = await connection.query(sql);
        console.log(result);
        connection.release();
    } catch (err) {

    }
}

async function updateLocation(champ_name, building_name)
{
    // 트리거로 정기 업데이트
    try {
        // 트리거로 일정 시간되면 업데이트?
    } catch (err) {

    }
    // 신규 유저 즉시 업데이트
    try {
        const connection = await pool.getConnection();
        var sql = `UPDATE USERS_INFO SET location='${building_name}'
                    WHERE champ_name='${champ_name}';`;
        console.log(sql);
        const result = await connection.query(sql);
        console.log(result);
        connection.release();
    } catch (err) {

    }
}

async function getChampionInfo(id)
{
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT user_id, champ_name, champ_type, leadership, team, location
                    FROM USERS_INFO WHERE user_id = '${id}'`;
        const result = await connection.query(sql);
        console.log(result);
        connection.release();
        return result[0];
    } catch (err) {
        console.log(err);
    }
}
async function createChampionInfo(champ)
{
    try {
        console.log(`${champ.user_id} / ${champ.champ_name}`);
        const connection = await pool.getConnection();
        const sql = `INSERT INTO USERS_INFO (user_id, champ_name, champ_type, leadership, team)
                    VALUES ('${champ.user_id}', '${champ.champ_name}', '${champ.champ_type}', '${champ.leadership}', '${champ.team}')`;
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
async function changeTeam(champ, team)
{
    try {
        const connection = await pool.getConnection();
        const sql = `UPDATE USERS_INFO set team=${team} WHERE champ_name='${champ.champ_name}';`;
        const result = await connection.query(sql);
        console.log(result);
        connection.release();
        return result[0];
    } catch (err) {
        console.log(err);
    }
}