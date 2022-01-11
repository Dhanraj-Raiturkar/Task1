console.log("Grocery List Application");

const button = document.getElementById("submit");
const text = document.getElementById("item");

var item;
var str='';
const list = new Array();
const deleted_list = new Array();

text.addEventListener("change", (e) => {
    e.preventDefault();
    item = e.target.value;
    //console.log(item);
});

//populate grocery list
button.addEventListener("click", (e) => {
    text.value = '';
    e.preventDefault();
    list.push(item);
    var list_items = document.getElementById("item_list");
    str = `<div style="border:black 1px solid; margin:auto; width:70%; height:20px; padding:10px 0">
        <li style="list-style:none; display:inline-block; font-size:1.5em">${item}</li>
        <button onclick="del(event)" style="float:right">delete</button>
        <button onclick="check(event)" style="float:right">tick</button>
    </div>`
    list_items.innerHTML += str;
    
    sessionStorage.setItem("list",JSON.stringify(list));
    var li = JSON.parse(sessionStorage.getItem("list"));
    console.log(li);
});

//session storage
document.getElementById('demo').addEventListener("click",(e)=>{
    sessionStorage.setItem("list",JSON.stringify(list));
    var li = JSON.parse(sessionStorage.getItem("list"));
    console.log(li);
});

//delete list item
function del(e){
    e = e || window.event;
    deleted_item = e.target.parentElement.firstElementChild.innerHTML;
    deleted_list.push(deleted_item);
    e.target.parentElement.remove();
    console.log(deleted_list);
}

//check list item
function check(e){
    e = e || window.event;
    let list_item = e.target.parentElement.firstElementChild.innerHTML;
    checked_item = e.target.parentElement;
    checked_item.firstElementChild.innerHTML = `<strike>${list_item}</strike>`;
    checked_item.remove();
    str = `<div style="border:black 1px solid; margin:auto; width:70%; padding:10px 0">
        <li style="list-style:none; display:inline-block"><strike>${list_item}</strike></li>
        <button onclick="del(event)" style="float:right">delete</button>
        <button onclick="check(event)" style="float:right">tick</button>
    </div>`
    var list_node = document.getElementById('item_list');
    list_node.innerHTML += str;
}

//clear the list 
document.getElementById('clear').addEventListener('click', (e) => {
    document.getElementById('item_list').innerHTML = '';
});

