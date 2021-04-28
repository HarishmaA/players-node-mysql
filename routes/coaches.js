const router = require('express').Router();
const verify = require('./verifyToken');
const { fetchResults, addData } = require('./db');


router.get('/', verify, async(req,res) => {
    try{
        let sql = `SELECT * FROM coaches`;
        const coaches = await fetchResults(sql);
        res.send(coaches);
    }
    catch(err) {
        res.send(err.sqlMessage);
    }
})

router.post('/', verify, async(req,res) => {
    try{
        let coach = {
            coach_name: req.body.coach_name,
            age: Number(req.body.age),
            salary: Number(req.body.salary),
        }
        let sql = 'INSERT INTO coaches SET ?';
        const savedCoach = await addData(sql, coach);
        res.send(`Coach ${savedCoach.insertId} is added`);
    }
    catch(err) {
        console.log("Ddd " + err);
        res.send(err.sqlMessage);
    }
})

module.exports = router;