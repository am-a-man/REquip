


function openNavbar(){
    var NavOrb = document.getElementById('navigation_orb');
    var contentOrb = document.getElementById("content_orb");
    NavOrb.style.transform = "scale(0.5,0.5) translate(calc(var(--navOrb)*(-1)),calc(var(--navOrb)/1.5*(-1)))";
    var navItems = NavOrb.getElementsByClassName('nav-items');
    console.log(navItems);
}


function closeNavbar(){
    console.log("triggerd navbar");
    var NavOrb = document.getElementById('navigation_orb');
    NavOrb.style.transform = "none";
}


function setupNavBar(){
    console.log("triggerd navbar");
    var NavOrb = document.getElementById('navigation_orb');
    var contentOrb = document.getElementById("content_orb");
    
    NavOrb.style.transitionProperty = "transform";
    NavOrb.style.transitionDuration = "2s";
    if(NavOrb.style.transform != "scale(0.5,0.5) translate(calc(var(--navOrb)*(-1)),calc(var(--navOrb)/1.5*(-1)))"){
        openNavbar();
        return true;
    }
    else{
        closeNavbar(); 
        return false;  
    }     
    // NavOrb.style.animation = "navOrb_nav 2s ease-out 0s 1 normal";
}



// function openNav(){
    
//     var navBar = document.getElementById('navigation_menu');
//     if(navBar.innerText=="" || navBar.style.display=="none"){
//         setupNavBar();
//         if(navBar.childElementCount!=0){
//             navBar.style.display = "block";
            
//         }
//         else{
//         navBar.style.display = "block";
//         fetch('/data').then(response => {
//             console.log(response);
//             return response.json();
//         }).then(json => {
//             console.log(json);
//             // document.getElementById('navigation_menu').innerText = JSON.stringify(json, null, 2);
//             var UL = document.createElement('ul');
//             var list = Object.keys(json).length;
//             for(var i = 0;i<list;i++)
//             {
//                 var A = document.createElement('a');
//                 A.setAttribute('href',json[Object.keys(json)[i]]['href']);
//                 var LI = document.createElement('li').appendChild(A);
//                 LI.setAttribute('class', "nav-items");
//                 LI.innerText = Object.keys(json)[i];
//                 UL.appendChild(LI);
//             }
//             navBar.appendChild(UL);

//         }).catch(err => {
//             console.error(err);
//         });
//         }
//     }
//     else{
//         navBar.style.display="none";
//     }
// }



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
                var LI = document.createElement('li').appendChild(A);
                LI.setAttribute('class', "nav-items");
                LI.innerText = Object.keys(json)[i];
                UL.appendChild(LI);
            }
            navBar.appendChild(UL);

        }).catch(err => {
            console.error(err);
        });
    }
    
    if(setupNavBar()){
        navBar.style.display="inline-block";
  
    }
    else{
        navBar.style.display="none";
        
    }
}


function contentDisplay(){
    ;
}


