var express = require('express');
var router = express.Router();

const fs= require('fs');
const path = require('path');
const deviceid = '0052003C3037313111473932';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HengShan Observer FengSu Chart' });
});

router.get('/speed', function(req, res, next) {
  var resData = [];
  fs.readFile("/Users/foxer/astronomy/windspeed/access.log",(err, data) => {
    data.toString().split("\n").forEach((val)=>{
      if(!val){
        return;
      }
      if(val.indexOf(deviceid)<0){
        return;
      }
      var v = val.split('[')[2].split(']')[0];
      resData.push(parseInt(v));
    });
    if(resData.length > 100){
      resData = resData.slice(resData.length - 100);
    }
    res.end(JSON.stringify(resData));
  })
  
});

module.exports = router;
