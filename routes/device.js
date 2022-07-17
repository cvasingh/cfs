const express = require('express');
const router = express.Router()
const pool = require('./databases');


// on dashbord for selecting Device 
router.post('/selectDevice', (req, res) => {
    pool.query(`SELECT device_name, device_mac FROM cfs_device where
    org_id >= ?`, [req.body.org_id],
        (err, result, fields) => {
            console.log(req.body);
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

// on device for selecting all Device 
router.post('/deviceList', (req, res) => {
    pool.query(`SELECT device_name, device_mac, epoch, is_connected FROM cfs_device where
    org_id >= ?`, [req.body.org_id],
        (err, result, fields) => {
            console.log(req.body);
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


module.exports = router;