var data = null;

function selectNav(id)
{
    var divs = document.getElementById("navigation-bar").getElementsByTagName('div');

    for(var i=0;i<divs.length;i++){
        var a = divs[i].getElementsByTagName('a')[0];
        a.style.backgroundColor = "var(--background-color)";
        a.style.color = "black";
    }
    document.getElementById(id).getElementsByTagName('a')[0].style.backgroundColor = "grey";
    document.getElementById(id).getElementsByTagName('a')[0].style.color = "white";
}


async function getData(){
    data = await fetch("/data").then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        return json;
    }).catch(err => {
        console.log(err);
    });
}

async function navInterface(arg){
    
    if(arg == undefined)
    {
        arg = "showcase";
    }
    if(typeof(arg)=="string"){
        arg = arg.trim();
    }
    else{
    await getCommonItems();
    }

    if(document.getElementById("showcase-pallete").getElementsByTagName('h1')[0].innerText.toLowerCase()==arg){
        return;
    }

    switch (arg) {
        case "showcase":
            selectNav("showcase");
            document.getElementById("showcase-pallete").getElementsByTagName('h1')[0].innerText="showcase";
            openShowcase();
            break;

        case "info":
            selectNav("info");
            document.getElementById("showcase-pallete").getElementsByTagName('h1')[0].innerText="info";
            openInfo();
            break;

        case "updates":
            selectNav("updates");
            document.getElementById("showcase-pallete").getElementsByTagName('h1')[0].innerText="updates";
            openUpdates();
            break;
    
        default:
            console.log(arg);
            selectNav("showcase");
            document.getElementById("showcase-pallete").getElementsByTagName('h1')[0].innerText="showcase";
            openShowcase();
            break;
    }
}


async function getCommonItems()
{
    
    console.log(document.getElementsByTagName("body"));
    var text = document.getElementsByTagName("body")[0];

    text.innerHTML = `<div id="navigation-bar">
        
        <div id="name"><a href="#" onclick = "navInterface('showcase')" >
            <p>
                <b>Aman Kumar - student at IIIT Ranchi</b>
            </p>
        </a></div>

        <div class = "nav-items" id="info"><a href="#" onclick = "navInterface('info')">Info</a></div>
        <div class = "nav-items" id="updates"><a href="#" onclick = "navInterface('updates')">Updates</a></div>
        <div class = "nav-items" id="showcase"><a href="#" onclick = "navInterface('showcase')">Showcase</a></div>

    </div>
        
    <hr>
    <div id="showcase-pallete">
        <h1 style="text-transform:capitalize"></h1>
        <ul id="showcase-items"></ul>
    </div>


    <hr>
    <div id="footer">
        <div id="left-footer"><p>
            <b>Aman Kumar</b>
            <br>
            Indian Institute of Information Technology
            <br>
            Ranchi
            <br>     
        </p></div>

        <div id="center-footer"><p>
            Based in India
            <br>
            &#169 2021, Aman Kumar
            <br>
        </p></div>
        
        <div id="right-footer"><p>
            Email: avy0219@gmail.com 
            <br>
            Twitter : <a href="https://twitter.com/am__a_man">@am__a_man</a>
            <br>
            Github : <a href="https://github.com/am-a-man">@am-a-man</a>
            <br>
            Instagram : <a href="https://www.instagram.com/am__a_man_/">@am__a_man_</a>
            <br>
        </p></div>
    </div>

    `;
    
}

async function openInfo(){
    var showcaseItems = document.getElementById('showcase-items');

 
    if(data==null)
        await getData();
        
    var keys = Object.keys(data['info']);

    var UL = document.createElement('UL');
    
    for(var i = 0; i < keys.length; i++)
    {
        var A = document.createElement('A');
        
        var H1 = document.createElement('H1');
        var P = document.createElement('P')
        H1.innerText = `${data['info'][keys[i]]['title']}:`;
        P.innerText = data['info'][keys[i]]['detail'];

        A.appendChild(H1);
        A.appendChild(P);

        A.setAttribute('href', data['info'][keys[i]]['href']);
    
        var LI = document.createElement('LI');
        LI.appendChild(A);
        UL.appendChild(LI);
    }
    var listItems=UL.innerHTML;
    showcaseItems.innerHTML = listItems;
}


async function openUpdates(){
    var showcaseItems = document.getElementById('showcase-items');

    if(data==null)
        await getData();
    
    var keys = Object.keys(data['updates']);
 
    var UL = document.createElement('ul');
    for(var i = 0; i < keys.length; i++)
    {
        var A = document.createElement('A');
        
        var H1 = document.createElement('H1');
        var P = document.createElement('P')
        H1.innerText = `${data['updates'][keys[i]]['title']}:`;
        P.innerText = data['updates'][keys[i]]['detail'];

        A.appendChild(H1);
        A.appendChild(P);

        A.setAttribute('href', data['updates'][keys[i]]['href']);
    
        var LI = document.createElement('LI');
        LI.appendChild(A);
        UL.appendChild(LI);
    }
    var listItems=UL.innerHTML;
    showcaseItems.innerHTML=listItems;
}





async function openShowcase()
{
    var showcaseItems = document.getElementById('showcase-items');

    
    if(data==null)
        await getData();
    
    var keys = Object.keys(data['projects']);


    var UL = document.createElement('UL');

    for(var i = 0; i < keys.length; i++)
    {
        var A = document.createElement('A');
        var IMG = document.createElement("IMG");
        var H1 = document.createElement('H1');
        var P = document.createElement('P')
        H1.innerText = `${data['projects'][keys[i]]['title']}:`;
        P.innerText = data['projects'][keys[i]]['stack'];

        IMG.setAttribute('src', data['projects'][keys[i]]["logo"])
        A.appendChild(IMG);
        A.appendChild(H1);
        A.appendChild(P);

        A.setAttribute('href', data['projects'][keys[i]]['href']);
  
        var LI = document.createElement('LI');
        LI.appendChild(A);
        UL.appendChild(LI);
    }
    var listItems = UL.innerHTML;
    showcaseItems.innerHTML = listItems;

}



function start(){
    window.onload = navInterface;
}


start();