
//all the variables that are going to be passing elementents
var clear = document.querySelector(".clear");
var dateElement = document.getElementById("date");
var list = document.getElementById("list");
var input = document.getElementById("input");
var addButton = document.querySelector(".add-button")

//Classes names --- needs to have the elements with their styling
var CHECK = "fa-check-circle"; //  --- > from the CSS - FONT AWESOME
var UNCHECK = "fa-circle-thin";
var LINE_THROUGH = "lineThrough";

// Variables
 var investmentList =[];
 var id = 0;

 //get item from localStorage
 var data = localStorage.getItem("investment")

 if(data){
     investmentList = JSON.parse(data);
     id = investmentList.length;
     loadList(investmentList)
 } else {
     investmentList= [];
     ID = 0;
 }



 function loadList (array){
     array.forEach(item => {
         addInv(item.name, item.id, item.done, item.trash);

     });
 }


//current date with different options.
var options = {weekday: "long", month: "short", day:"numeric"}; // might change this.. I do not like showing the weekday.
var today = new Date ();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addInv (inv, id, done, trash){
    if(trash) {return; }

    var DONE = done?  CHECK : UNCHECK;
    var LINE = done?  LINE_THROUGH: "";

    // adding it to our list
    var item = `
                <li class="item">
                <i class=" fa ${DONE} co" inv="complete" id='${id}'></i>
                <p class="text ${LINE}"> ${inv}</p>
                <i class="fa fa-trash-o de" inv='delete' id='${id}'></i>
                </li>
                `;

    var position = "beforeend";

    list.insertAdjacentHTML(position, item)
}

// i want to add things with Enter Key as well
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        var invs = input.value;
//if the input isnt empty
        if(invs){
            addInv(invs, id, false, false)
            investmentList.push({
                 name: invs,
                 id: id,
                 done: false,
                 trash: false
            });

            //adds item to local storage
            localStorage.setItem("invesment", JSON.stringify(investmentList))

            id++;
        }
        input.value= ""
    }
});

//Add investment by clicking on add button
addButton.addEventListener("click", function(event){
    var invs = input.value;
        if(invs){
            addInv(invs, id, false, false)

            investmentList.push({
                name: invs,
                id: id,
                done: false,
                trash: false
        });

        //adds item to local storage
        localStorage.setItem("investment", JSON.stringify(investmentList))

        id++;
    }
            input.value =""

});

addInv("LAGH", 2, false, true);


//complete inv
function completeInv(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    investmentList[element.id].done = investmentList[element.id].done? false : true;
}

//remove inv
function removeInv(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    investmentList[element.id].trash = true;
}

// clear button
clear.addEventListener('click', function(){
    localStorage.clear()
    location.reload();
});


//TO observe the whole list
list.addEventListener("click", function(event){
   var element = event.target
   var elementInv = element.attributes.Inv.value;

   if(elementInv =="complete"){
       completeInv(element);
   }
    else if (elementInv == "delete") {
        removeInv(element)
    }

    //add/updates items to/in local storage
    localStorage.setItem("inv", JSON.stringify(investmentList))
});