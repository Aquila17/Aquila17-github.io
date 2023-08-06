//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
var allpages=document.querySelectorAll(".page");
var dropDown;
var pageHeight = 0;
var fading;
var overflow;
var contentOpacity = 0;

var playerX;
var playerY;

var distX;
var distY;

var destinationX;
var destinationY;

var bounds;

//select all subtopic pages
console.log(allpages);
hideall();

function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
    onepage.style.display="none"; //hide it
    }
}

function show(pgno){ //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
    //show the page
    onepage.style.display="inline";
}

function toggleFoodList(pgno, content){ //function to show selected page no
    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
    //show the page
    if(onepage.style.height == 0 +"%" || onepage.style.height=="")
    {
        onepage.style.height = 125 +"%";
        fading = setTimeout(() => fadeAnimation(content, 1),600);
        overflow = setTimeout(() => setOverflow(content, "visible"),600);

        //dropDown = setInterval(() => dropDownAnimation(onepage, +5, 300),10);
    }
    else
    {
        onepage.style.height = 0 +"%";
        fading = setTimeout(() => fadeAnimation(content, -1),100);
        overflow = setTimeout(() => setOverflow(content, "hidden"),100);
    }
    /*if(onepage.style.display=="block")
        onepage.style.display="none";
    else onepage.style.display="block";*/
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});

/*for hamMenu */
const hamBtn=document.querySelector("#hamIcon");
hamBtn.addEventListener("click",toggleMenus);
const menuItemsList=document.querySelector("nav ul");

function toggleMenus(){ /*open and close menu*/
    if(menuItemsList.style.display=="inline-block")
        menuItemsList.style.display="none";
    else menuItemsList.style.display="inline-block";
}//can optimize using toggle class with css transitions


const chinesePagebtn=document.querySelector("#chinesePageBtn");
const malayPagebtn=document.querySelector("#malayPageBtn");
const indianPagebtn=document.querySelector("#indianPageBtn");



/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
chinesePagebtn.addEventListener("click", function () {
    toggleFoodList("ChineseFood",chineseContent);
});
malayPagebtn.addEventListener("click", function () {
    toggleFoodList("MalayFood",malayContent);
});
indianPagebtn.addEventListener("click", function () {
    toggleFoodList("IndianFood",indianContent);
});

const chineseContent=document.querySelector(".chineseFoodPicture");
const malayContent=document.querySelector(".malayFoodPicture");
const indianContent=document.querySelector(".indianFoodPicture");


function fadeAnimation(page, amount)
{
   
    if(amount > 0)
    {
        page.style.opacity = "1";
    }
    else if (amount < 0)
    {

        page.style.opacity = "0";
    }

}

function setOverflow(page, displaySet)
{
    page.style.overflow = displaySet;
}

const player = document.getElementById("player");
const simulator = document.querySelector(".simulator");

simulator.addEventListener("mousemove", followMouse)

function followMouse(event)
{
    bounds = simulator.getBoundingClientRect();

    destinationX = event.clientX - bounds.left - bounds.width * 0.5;
    destinationY = event.clientY  - bounds.top - bounds.height;
    destinationY += player.getBoundingClientRect().height * 0.5;

   
    
   

}

function ResetPos() {
    playerX = 0;
    playerY = 0; //reset to zero
    distX = 0;
    distY = 0;
    destinationX = 0;
    destinationY = 0;
    bounds = simulator.getBoundingClientRect();
    
}

function MovePos(leftInc, topInc) {
    playerX += leftInc;
    playerY += topInc;
    UpdatePlayerStyle();
}
    
//function to update ball css as well as display text
function UpdatePlayerStyle(){
    distX = destinationX - playerX;
    distY = destinationY - playerY;
    playerX += distX * 0.05;
    playerY += distY * 0.05;

    console.log("player: " + Math.abs(playerY));
    console.log("yes: " +  bounds.top);
    if(Math.abs(playerY) > bounds.top)
    {
        playerY = -bounds.top;
    }
    


    //player.style.left = playerX+"px"; //set left property to ball x variable
   // player.style.top = playerY+"px"; //set top property to ball x variable

   player.style.left = playerX + "px";
   player.style.top = playerY + "px";

   requestAnimationFrame(UpdatePlayerStyle);
}
    
ResetPos();
UpdatePlayerStyle();

