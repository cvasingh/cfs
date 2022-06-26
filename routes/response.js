const express = require('express');
const router = express.Router()
const pool = require('./databases');


// for dashbord

router.post('/select', (req, res) => {
    pool.query(`SELECT feedback, COUNT(rcode) as count FROM cfs_responsemaster where
     campaignid = ? && cfscustomerid = ? && createdat >= ? && createdat <= ?
     GROUP BY rcode`,
        [req.body.campaignid, req.body.cfscustomerid, req.body.date[0], req.body.date[1]],
        (err, result, fields) => {
            console.log(req.body);
            // console.log(result);
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

// for report page
router.post('/selectResponse', (req, res) => {
    pool.query(`SELECT feedback AS result, createdby, createdat AS date FROM cfs_responsemaster where
     campaignid = ? && cfscustomerid = ? && createdat >= ? && createdat <= ?`,
        [req.body.campaignid, req.body.cfscustomerid, req.body.date[0], req.body.date[1]],
        (err, result, fields) => {
            console.log(req.body);
            // console.log(result);
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

module.exports = router;