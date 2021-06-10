

const { response } = require('express');
const express = require('express');
var fs = require('fs');


const app = express();
app.listen(process.env.PORT || 8000, ()=> {
    console.log("server is starting");
})

app.use(express.static('./website'));

app.get('/data' , (request, response) => {
  try{ 
    var data = fs.readFileSync("data.json");
    data = JSON.parse(data);
    keys = Object.keys(data);
    console.log(keys);
    response.send(data);
    }
    catch(error){
        console.log(error);
    }

});

