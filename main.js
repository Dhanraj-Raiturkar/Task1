console.log("Grocery List Application");

const button = document.getElementById("btn");
const text = document.getElementById("input-bar");

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
    str = `<div style="width:50%; height:20px; padding:10px 0; margin:1% 0">
        <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden">${item}</li>
        <i class="material-icons" style="color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
        <i class="material-icons" style="color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
    </div>`
    list_items.innerHTML += str;
    
    sessionStorage.setItem("list",JSON.stringify(list));
    var li = JSON.parse(sessionStorage.getItem("list"));
    //console.log(li);
});

//session storage
//document.getElementById('demo').addEventListener("click",(e)=>{
//    sessionStorage.setItem("list",JSON.stringify(list));
//    var li = JSON.parse(sessionStorage.getItem("list"));
//    console.log(li);
//});

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
    str = `<div style="width:50%; height:20px; padding:10px 0; margin:1% 0">
        <li style="list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px"><strike>${list_item}</strike></li>
        <i class="material-icons" style="color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
        <i class="material-icons" style="color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
    </div>`
    var list_node = document.getElementById('item_list');
    list_node.innerHTML += str;
}

//clear the list 
document.getElementById('clear-btn').addEventListener('click', (e) => {
    document.getElementById('item_list').innerHTML = '';
});

