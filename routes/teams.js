const router = require('express').Router();
const verify = require('./verifyToken');
const { fetchResults, addData} = require('./db');


router.get('/', verify, async(req,res) => {
    try{
        let sql = `SELECT * FROM teams`;
        const teams = await fetchResults(sql);
        res.send(teams);
    }
    catch(err) {
        res.send(err.sqlMessage);
    }
})

router.post('/', verify, async(req,res) => {
    try{
        let team = {
            team_name: req.body.team_name,
            coach_id: req.body.coach_id,
        }  
        let sql = 'INSERT INTO teams SET ?';
        const savedTeam = await addData(sql, team);
        res.send(`Team ${savedTeam.insertId} is added`);
    }
    catch(err) {
        res.send(err.sqlMessage);
    }
})

module.exports = router;