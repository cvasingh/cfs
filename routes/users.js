const express = require('express');
const router = express.Router()
const pool = require('./databases');

// for login
router.post('/login', (req, res) => {
    pool.query(`select firstname, lastname, org_id, id from cfs_users where username = ? && password = ?`,
        [req.body.username, req.body.password], (err, result, fields) => {
            console.log(result);
            if (err) {
                return console.log(err);
            } else {
                if (result.length === 1) {
                    return res.send(result);
                } else {
                    return res.send('NM');
                }
            }
        })
})

// for userDetails
router.post('/userDetails', (req, res) => {
    pool.query(`select id, username, password, firstname, lastname from cfs_users where id = ?`,
        [req.body.id], (err, result, fields) => {
            console.log(result);
            if (err) {
                return console.log(err);
            } else {
                if (result.length === 1) {
                    return res.send(result);
                } else {
                    return res.send('NM');
                }
            }
        })
})

// for userUpdate
router.post('/userUpdate', (req, res) => {
    pool.query(`UPDATE cfs_users SET username = ?, password = ?, firstname = ?, lastname = ?  WHERE id = ?`,
        [req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.id ],
         (err, result, fields) => {
            console.log(result);
            if (err) {
                return console.log(err);
            } else {
                return res.send('U');
            }
        })
})



// for org user list 
router.post('/select', (req, res) => {

    console.log(req.body.org_id);

    pool.query(`select * from cfs_users where org_id= ? `,
        [req.body.org_id], (err, result, fields) => {
            console.log(result);
            if (err) {
                return console.log(err);
            } else {
                if (result.length < 1) {
                    return res.send('NE');
                } else {
                    return res.send(result);
                }
            }
        })
})
router.post('/register', (req, res) => {
    console.log(req.body);
    pool.query("INSERT INTO `cfs_users`(`firstname`, `username`, `password`, `role`, `org_id`) VALUES (?, ?, ?, ?, ?)",
        [req.body.name, req.body.username, req.body.password, req.body.role, req.body.org_id,], (err, result, fields) => {
            if (err) {
                return console.log(err);
            } else {
                return res.send('I');
            }
        })
})



module.exports = router;
