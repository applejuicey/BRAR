let express = require('express');
let router = express.Router();
let child_process = require('child_process');
let exec = child_process.exec;
let path = require("path");
let fs = require('fs');

router.post('/type1', function(req, res){
  console.log(req.body);
  let scriptParameterString = req.body.a + ' ' + req.body.b + ' ' + req.body.c + ' ' + req.body.d + ' '
      + req.body.e + ' ' + req.body.f + ' ' + req.body.g + ' ' + req.body.h + ' '
      + req.body.i + ' ' + req.body.j + ' ' + req.body.k + ' ' + req.body.l + ' '
      + req.body.m + ' ' + req.body.n + ' ' + req.body.o + ' ' + req.body.p + ' '
      + req.body.q + ' ' + req.body.r + ' ' + req.body.s + ' ' + req.body.t;
  console.log(scriptParameterString);
  let r_file_path = path.join(__dirname, "./../public/rscripts/type1.R");
  console.log(r_file_path);
  let commandLineScript = 'Rscript' + ' ' + r_file_path + ' ' + scriptParameterString;
  console.log(commandLineScript);

  let output_file_path = path.join(__dirname, "./../../../../../../BRAR_FR_OUTPUT.txt");
  console.log('ver', output_file_path)
  exec(commandLineScript, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);


      fs.readFile(output_file_path, function (err, data) {
        if (err) {
          console.log('kkknio',err);

        } else {
          let djb = JSON.parse(data)
          console.log(djb);
          console.log(data.length + ' bytes');
        }
      });

      res.send(error);
    } else {
      console.log(stdout);



      res.send(stdout);
    }
  });
});

module.exports = router;
