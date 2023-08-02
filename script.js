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