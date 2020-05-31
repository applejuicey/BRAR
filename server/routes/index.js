let express = require('express');
let router = express.Router();
let child_process = require('child_process');
let exec = child_process.exec;
let path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/a', function(req, res){
    console.log(req.body);
    let Parameter = req.body.a + ' ' + req.body.b + ' ' + req.body.c + ' ' + req.body.d + ' ' + req.body.e + ' ' + req.body.f + ' ' + req.body.g + ' ' + req.body.h + ' ' + req.body.i + ' ' + req.body.j + ' ' + req.body.k + ' ' + req.body.l + ' ' + req.body.m + ' ' + req.body.n;
    console.log(Parameter);
    let R_File_Path = path.join(__dirname, "./../public/aaa.R");
    console.log(R_File_Path);
    let cmd = 'Rscript' + ' ' + R_File_Path + ' ' + Parameter;
    console.log(cmd);
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(stderr);
            res.send(error);
        } else {
            console.log(stdout);
            res.send(stdout);
        }
    });

});

module.exports = router;
