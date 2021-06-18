

const { response } = require('express');
const express = require('express');
const cors = require('cors');

var fs = require('fs');


const app = express();
app.listen(process.env.PORT || 8000, ()=> {
    console.log("server is starting");
})

app.use(express.static('./website'));
app.use(cors());


var corsOptions = {
    origin: ['http://127.0.0.1:5500','http://127.0.0.1:8000','http://127.0.0.1:3000', 'https://skiadrum.herokuapp.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    
}



app.get('/ping',cors(corsOptions), (req, res)=>{
    console.log("received ping from skiadrum.herokuapp.com");
    return res.send({
        "recieved":"true"
    })
})


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


