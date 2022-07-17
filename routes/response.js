const express = require('express');
const router = express.Router()
const pool = require('./databases');


// on dashbord for selecting Device Res
router.post('/selectDeviceRes', (req, res) => {
    pool.query(`SELECT msg, COUNT(msg) as count FROM cfs_responsemaster where
    dmac = ? && CreateDate >= ? && CreateDate <= ? && 
    (msg = "0001" || msg = "0002" || msg = "0003" || msg = "0004")
     GROUP BY msg order by msg`,
        [req.body.dmac, req.body.date[0], req.body.date[1]],
        (err, result, fields) => {
            console.log(req.body);
            // console.log(result);
            if (result[0]) {
                for (let index = 0; index < 4; index++) {
                    if (result[index].msg != `000${index + 1}`) {
                        result.splice(index, 0, { msg: `000${index + 1}`, count: 0 });
                    }
                }
            } else {
                result.push(
                    { msg: `0001`, count: 0 },
                    { msg: `0002`, count: 0 },
                    { msg: `0003`, count: 0 },
                    { msg: `0004`, count: 0 },
                )
            }
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
    pool.query(`SELECT * FROM cfs_responsemaster where
        dmac = ? && CreateDate >= ? && CreateDate <= ? `,
        [req.body.dmac, req.body.date[0], req.body.date[1]],
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