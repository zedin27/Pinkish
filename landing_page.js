const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

app.use(express.static('3D_Loader'));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/jinx',function(req,res){
  res.sendFile(path.join(__dirname+'/index1.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
