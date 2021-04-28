const router = require('express').Router();
const mysql = require('mysql');
const {create_ourusers_table_query, create_coaches_table_query, create_players_table_query, create_teams_table_query} = require('../sqlqueries');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'harishma',
    database: 'coaching'
});

db.connect((err)=> {
   if(err) {
       throw err;
   }
   console.log("MySQL connected");
})

router.get('/createdb', (req, res)=> {
    let sql = 'CREATE DATABASE coaching';
    db.query(sql, (err, result)=> {
      if(err) {
          throw err;
      }
      console.log(result)
      res.send('database created ');
      
    })
 })

 router.get('/create-ourusers-table', (req, res) => {
    let sql = create_ourusers_table_query;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result)
        res.send('User table created ');
    })
})

router.get('/create-coaches-table', (req, res) => {
    let sql = create_coaches_table_query;
    fetchResults(sql);
    res.send('Coaches table created');
})

router.get('/create-teams-table', (req, res) => {
    let sql = create_teams_table_query;
    fetchResults(sql);
    res.send('Teams table created ');
})

router.get('/create-players-table', (req, res) => {
    let sql = create_players_table_query;
    fetchResults(sql);
    res.send('Players table created ');
})

 const addUser = (user) => {
    let sql = 'INSERT INTO ourusers SET ?';
    return db.query(sql, user, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        return result;
    })
 }

const updateUserToken = async({id, token}) => {
    let sql = `UPDATE ourusers SET token = '${token}' WHERE id = ${id}`;
    return await fetchResult(sql);
}

const fetchResults = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, 
          (err, result) => {
              console.log("rr" + result);
            return err ? reject(err) : resolve(result);
          }
        );
      });
 }


 const fetchResult = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, 
          (err, result) => {
            return err ? reject(err) : resolve(result[0]);
          }
        );
      });
 }

 const addData = (sql, data) => {
    return new Promise((resolve, reject) => {
        db.query(sql, data,
          (err, result) => {
            return err ? reject(err) : resolve(result);
          }
        );
      });
 }

 const findUserByEmailId = async({email}) => {
    let sql = `SELECT * FROM ourusers WHERE email='${email}'`;
    return await fetchResult(sql);
}

const findUserByToken = async({token}) => {
    let sql = `SELECT * FROM ourusers WHERE token='${token}'`;
    return await fetchResult(sql); 
}


 module.exports=router;
 module.exports.addUser=addUser;
 module.exports.findUserByEmailId=findUserByEmailId;
 module.exports.findUserByToken=findUserByToken;
 module.exports.updateUserToken=updateUserToken;
 module.exports.fetchResults=fetchResults;
 module.exports.addData=addData;
