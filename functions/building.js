const pool = require('../middleware/dbConfig');
const champion = require('../obj/champion');
module.exports = { getBuildingInfo, createBuildingInfo, updateBuildingTeam };


async function getBuildingInfo(building)
{
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT building_name, building_type, population, food, morale, castellan, team
                    FROM BUILDINGS_INFO WHERE building_name = '${building.building_name}'`;
        const buildingResult = await connection.query(sql);
        // const sql2 = `SELECT user_id, champ_name, champ_type, leadership, team, location FROM USERS_INFO
        //                 WHERE champ_name in (SELECT stationed FROM BUILDINGS_STATIONED_INFO WHERE building_name = '${building.building_name}')`;
        const sql2 = `SELECT user_id, champ_name, champ_type, leadership, team, location FROM USERS_INFO
                        WHERE location='${building.building_name}'`
        const stationedData = [];
        const stationedResult = await connection.query(sql2);
        stationedResult[0].forEach(element => {
            var champ = new champion(element.user_id, element.champ_name, element.champ_type, element.leadership, element.team, element.location);
            //Array.prototype.push.apply(stationedData, Object.values(champ));
            stationedData.push(champ);
        });
        const buildingData = buildingResult[0][0];
        buildingData.stationed = stationedData;
        console.log(buildingData);
        connection.release();
        return buildingData;
    } catch (err) {
        console.log(err);
    }
}

async function updateBuildingTeam(building, team)
{
    try {
        const connection = await pool.getConnection();
        const sql = `UPDATE BUILDINGS_INFO SET team=${team} WHERE building_name = '${building}'`;
        const result = await connection.query(sql);
        console.log(result);
        connection.release();
        return result;
    } catch (err) {
        console.log(err);
    }
}
async function createBuildingInfo(building)
{
    try {
        console.log(`${building.building_name} / ${building.building_type}`);
        const connection = await pool.getConnection();
        const sql = `INSERT INTO BUILDINGS_INFO (building_name, building_type, population, food, morale)
                    VALUES ('${building.building_name}', ${building.building_type}, ${building.population}, ${building.food}, ${building.morale})`;
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