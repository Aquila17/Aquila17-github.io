/*jshint esversion: 6 */

//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
var allpages=document.querySelectorAll(".page");

//Declaring variables

var fading;
var overflow;

var playerX;
var playerY;


var distX;
var distY;

var destinationX;
var destinationY;

var bounds;


var dragging = false;

//Select all subtopic pages
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

function toggleFoodList(pgno, content){ 
    //Select page based on parameter pased
    let onepage=document.querySelector("#page"+pgno);

    //Check if page is already displayed or not, and do the opposite
    if(onepage.style.height == 0 +"%" || onepage.style.height=="")
    {
        //Toggle On
        onepage.style.height = 125 +"%";
        fading = setTimeout(() => fadeAnimation(content, 1),600);
        overflow = setTimeout(() => setOverflow(content, "visible"),600);
    }
    else
    {
        //Toggle Off
        onepage.style.height = 0 +"%";
        fading = setTimeout(() => fadeAnimation(content, -1),100);
        overflow = setTimeout(() => setOverflow(content, "hidden"),100);
    }
   
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
    if(menuItemsList.style.display=="inline")
        menuItemsList.style.display="none";
    else menuItemsList.style.display="inline";
}

//Declaring food page
const chinesePagebtn=document.querySelector("#chinesePageBtn");
const malayPagebtn=document.querySelector("#malayPageBtn");
const indianPagebtn=document.querySelector("#indianPageBtn");



//Click event for food buttons
chinesePagebtn.addEventListener("click", function () {
    toggleFoodList("ChineseFood",chineseContent);
});
malayPagebtn.addEventListener("click", function () {
    toggleFoodList("MalayFood",malayContent);
});
indianPagebtn.addEventListener("click", function () {
    toggleFoodList("IndianFood",indianContent);
});

//Declaring food content
const chineseContent=document.querySelector(".chineseFoodPicture");
const malayContent=document.querySelector(".malayFoodPicture");
const indianContent=document.querySelector(".indianFoodPicture");

//Fading animation
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

//Setting overflow to parameter passed in
function setOverflow(page, displaySet)
{
    page.style.overflow = displaySet;
}

//Declaring simulation and its components
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const simulator = document.querySelector(".simulator");
const obstacles = document.getElementsByClassName("obstacles");

//Drag and touch event for the player
player.addEventListener("drag", followMouse);
player.addEventListener("dragend", dragFalse);
player.addEventListener("touchmove", followMouse);
player.addEventListener("touchend", dragFalse);


//Check if the two elements passed in overlap with one another
function elementsOverlap(element1, element2) {
    const boundsElement1 = element1.getBoundingClientRect();
    const boundsElement2 = element2.getBoundingClientRect();
  
    if (boundsElement1.top > boundsElement2.bottom)
        return false;
    else if (boundsElement1.right < boundsElement2.left)
        return false;
    else if (boundsElement1.bottom < boundsElement2.top)
        return false;
    else if (boundsElement1.left > boundsElement2.right)
        return false;

    return true;
        
    
}

//Set destination to mouse position
function followMouse(event)
{
    bounds = simulator.getBoundingClientRect();

    destinationX = event.clientX - bounds.left - bounds.width * 0.5;
    destinationY = event.clientY  - bounds.top - bounds.height * 0.5;

    dragging = true;

}

//Change dragging to false
function dragFalse()
{
    dragging = false;
}

//Reset simulation
function Reset() {
    playerX = 0;
    playerY = 0;
    distX = 0;
    distY = 0;
    destinationX = 0;
    destinationY = 0;
    bounds = simulator.getBoundingClientRect();
    
}



    
//function to update player's location
function UpdatePlayerStyle(){
    if(dragging)
    {
        //Update position
        distX = destinationX - playerX;
        distY = destinationY - playerY;
        playerX += distX * 0.1;
        playerY += distY * 0.1;

  

        //Check if player has collided with any obstacles
        for(var i = 0; i < obstacles.length; i++)
        {
            if (elementsOverlap(player,obstacles[i]))
            {

                Reset();

            }
        }

        //Check if player has reached the goal
        if(elementsOverlap(player,goal))
        {
            goal.style.backgroundColor = "#FFFFFF";

        }


        player.style.left = playerX + "px";
        player.style.top = playerY + "px";


        
    }
    requestAnimationFrame(UpdatePlayerStyle);
}
    
Reset();
UpdatePlayerStyle();
