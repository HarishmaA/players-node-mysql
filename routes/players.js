const router = require('express').Router();
const verify = require('./verifyToken');
const { fetchResults, addData } = require('./db');


router.get('/', verify, async(req,res) => {
    try{
        let sql = `SELECT * FROM players`;
        const players = await fetchResults(sql);
        res.send(players);
    }
    catch(err) {
        res.send(err.sqlMessage);
    }
})

router.post('/', verify, async(req,res) => {
    try{
        let player = {
            player_name: req.body.player_name,
            age: Number(req.body.age),
            coach_id: req.body.coach_id,
            team_id: req.body.team_id,
        }
        let sql = 'INSERT INTO players SET ?';
        const savedPlayer = await addData(sql, player);
        res.send(`Player ${savedPlayer.insertId} is added`);
    }
    catch(err) {
        res.send(err.sqlMessage);
    }
})

router.put('/:id', verify, (req, res)=> {
    let player_name = req.body.player_name;
    let sql = `UPDATE players SET player_name = '${player_name}' WHERE player_id = ${req.params.id}`;
    fetchResults(sql);
    res.send(`player ${req.params.id} updated`);
})

router.delete('/:id', verify, (req, res)=> {
    let sql = `DELETE FROM players WHERE player_id = ${req.params.id}`;
    fetchResults(sql);
    res.send(`player ${req.params.id} deleted`);
})

module.exports = router;