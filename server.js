
const { response } = require('express');
const express = require('express');
const cors = require('cors');

var fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


var limitPing = 0;

function ping(){
    setTimeout(() => {
        console.log("sending ping to skiadrum.heroku");
        fetch("http://skiadrum.herokuapp.com/ping").then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            return json;
        });

    }, 1);
    
}



const app = express();
app.listen(process.env.PORT || 8000, ()=> {
    console.log("server is starting");
    /* disabling ping */
    //ping();
})

app.use(express.static('./website'));
app.use(cors());


var corsOptions = {
    origin: ['http://127.0.0.1:5500','http://127.0.0.1:8000','http://127.0.0.1:3000', 'https://skiadrum.herokuapp.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    
}



app.get('/ping',cors(corsOptions), (req, res)=>{

    limitPing += 1;
    if(limitPing>1){
        limitPing-=1;
        res.send({
            "status":"received",
            "throttling":"true"
        });
    }


    console.log("received ping from skiadrum.herokuapp.com");
    function ping(){
        setTimeout(async () => {
            console.log("sending ping to skiadrum.heroku");
            await fetch("http://skiadrum.herokuapp.com/ping").then(res => {
                return res.json();
            }).then(json => {
                console.log(json);
                limitPing-=1;
                return json;
            });
        }, 1000*60*10);
        
    }

    ping();

    return res.send({
        "recieved":"true"
    })
})

app.get('/resume/Resume_Aman_Kumar_Software_Devlopment', async (req, res) => {
    res.contentType("application/pdf");
    url = "https://docs.google.com/document/d/1cVR0NsAbQUBkfD98yzQF5DuUrj3B8-fhlbLc1oGjSEk/export?format=pdf";
    var pdfData = await fetch(url,
    {method: 'GET'})
    .then( res => {return res.buffer();} );
    console.log("pdfData");
    const stream = res.writeHead(200, {
        'Content-Type':'application/pdf',
    });
    
    stream.write(pdfData);
    stream.end();

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


