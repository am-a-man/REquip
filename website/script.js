


function openNavbar(){
    var NavOrb = document.getElementById('navigation_orb');
    var contentOrb = document.getElementById("content_orb");
    var reticle = document.getElementsByClassName("reticle")[0];
    
    NavOrb.style.transform = "scale(0.5,0.5) translate(calc(var(--navOrb)*(-1)),calc(var(--navOrb)/1.5*(-1)))";
    var navItems = NavOrb.getElementsByClassName('nav-items');
    console.log(navItems[0]);
    contentOrb.style.opacity = "0";
    reticle.style.opacity = "0";

}


function closeNavbar(){
    console.log("triggerd navbar");
    var NavOrb = document.getElementById('navigation_orb');
    var reticle = document.getElementsByClassName("reticle")[0];
    var contentOrb = document.getElementById("content_orb");
    NavOrb.style.transform = "none";

    reticle.style.opacity = "1";
    contentOrb.style.opacity="1";


}


function setupNavBar(){
    console.log("triggerd navbar");
    var NavOrb = document.getElementById('navigation_orb');
    var contentOrb = document.getElementById("content_orb");
    var reticle = document.getElementsByClassName("reticle")[0];
    
    NavOrb.style.transitionProperty = "transform";
    contentOrb.style.transitionProperty = "opacity";
    reticle.style.transitionProperty = "opacity";

    NavOrb.style.transitionDuration = "2s";
    contentOrb.style.transitionDuration = "1s";
    reticle.style.transitionDuration = "1s";
    
    if(NavOrb.style.transform != "scale(0.5,0.5) translate(calc(var(--navOrb)*(-1)),calc(var(--navOrb)/1.5*(-1)))"){
        openNavbar();
        return true;
    }
    else{
        closeNavbar(); 
        return false;  
    }     
   
}





function getNavData(){
    var navBar = document.getElementById('navigation_menu');
    if(navBar.innerText==""){
        fetch('/data').then(response => {
            console.log(response);
            return response.json();
        }).then(json => {
            console.log(json);
            // document.getElementById('navigation_menu').innerText = JSON.stringify(json, null, 2);
            var UL = document.createElement('ul');
            var list = Object.keys(json).length;
            for(var i = 0;i<list;i++)
            {
                var A = document.createElement('a');
                A.setAttribute('href',json[Object.keys(json)[i]]['href']);
                var LI = document.createElement('li')
                LI.appendChild(A);
                LI.setAttribute('class', "nav-items");
                LI.style.gridRow=`${i+2}/${i+3}`;
                LI.setAttribute("data-augmented-ui","tl-clip-x br-clip-inset both");
                LI.innerText = Object.keys(json)[i];
                UL.appendChild(LI);
            }
            navBar.appendChild(UL);

        }).catch(err => {
            console.error(err);
        });
    }
    
    if(setupNavBar()){
        navBar.style.display="grid";
  
    }
    else{
        navBar.style.display="none";
        
    }
}


function contentDisplay(){
    ;
}


