const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Env from file - import conf from file
require('dotenv').config();

// 'use strict';
let exec = require('child_process').exec;

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(bodyParser);


var _dir_test = "D:/Rica Doc/Upwork_job/show_audit_outdated";
var _dir_test_2 = "D:/__Neitic/Full Time Work/Suivi-des-patients/Projet/suivi-via-mobile"
// GET Audid security  
app.get('/audit', async (req, res) => {
    console.log('directory', req.body.dir);
    console.log(`Starting directory: ${process.cwd()}`);
    try {
        process.chdir(req.body.dir);
        console.log(`New directory: ${process.cwd()}`);
        const a = exec('npm audit --json', (err, stdout, sdterr) => {
            // console.log("LL: stdout", stdout)
            if (!stdout) {
                process.exit();
            }
            const json = JSON.parse(stdout);
            const result = json.metadata;
            return res.send(result);
        });
        console.log(a.metadata);
    } catch (err) {
        console.error(`chdir: ${err}`);
    }
})

//GET Outdated package
app.get('/outdated', (req, res) => {
    try {
        // process.chdir(req.query._dir);
        process.chdir(req.body.dir);
        console.log(`New directory: ${process.cwd()}`);
        exec('npm outdated --json', (err, stdout, sdterr) => {
            if (!stdout) {
                process.exit();
            }

            const json = JSON.parse(stdout);
            const keys = Object.keys(json);
            let output = [];
            keys.forEach((k) => {
                const pckg = {
                    package: k,
                    current: json[k].current,
                    wanted: json[k].wanted,
                    latest: json[k].latest,
                    location: json[k].location,
                }
                output.push(pckg);
            });
            return res.send(output);
        });
    } catch (err) {
        console.error(`chdir: ${err}`);
    }

});
/**
 * Ne fonctionne pas 
 * 
 */
app.get('/audit_2', (req, res) => {

    const npmFetch = require('npm-registry-fetch');

    const auditData = {
        "name": "npm_audit_test",
        "version": "1.0.0",
        "requires": {
            "marked": "^0.6.3",
        },
        "dependencies": {
            "marked": {
                "version": "0.6.3",
                "integrity": "shal-ebq614r20LpNuiqecVzf3SQp6UY=234"
            }
        }
    };

    let opts = {
        "color": true,
        "json": true,
        "unicode": true,
        method: 'POST',
        gzip: true,
        body: auditData
    };

    return npmFetch('/-/npm/v1/security/audits', opts).then(res => {
        return res.json()
    }).then(res => {
        console.log(JSON.stringify(res, "", 3));
    }).catch(err => console.error(err));
});

/**
 * 
 */



app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})
