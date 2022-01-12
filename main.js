console.log("Grocery List Application");

const button = document.getElementById("btn");
const text = document.getElementById("input-bar");

var item;
var str='';
var id=0;
const list = new Array();
const deleted_list = new Array();

text.addEventListener("change", (e) => {
    e.preventDefault();
    item = e.target.value;
    //console.log(item);
});

//populate grocery list
button.addEventListener("click", (e) => {
    id+=1;
    text.value = '';
    e.preventDefault();
    const obj = {
        id: id,
        item: item,
        checked: false,
        deleted: false,
    }
    list.push(obj);
    var list_items = document.getElementById("item_list");
    str = `<div style="width:50%; height:20px; padding:10px 0; margin:1% 0">
        <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden">${item}</li>
        <i class="material-icons" style="color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
        <i class="material-icons" style="color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
    </div>`
    list_items.innerHTML += str;
    
    sessionStorage.setItem("list",JSON.stringify(list));
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
    let data = JSON.parse(sessionStorage.getItem("list"));
    data.forEach((i) => {
        if(i.item==deleted_item){
            i.deleted = true;
        }
    });
    sessionStorage.setItem("list",JSON.stringify(data));
    deleted_list.push(deleted_item);
    e.target.parentElement.remove();
}

//check list item
function check(e){
    e = e || window.event;
    let list_item = e.target.parentElement.firstElementChild.innerHTML;
    checked_item = e.target.parentElement;
    //console.log(list_item);
    let data = JSON.parse(sessionStorage.getItem("list"));
    data.forEach((i) => {
        if(i.item==list_item){
            i.checked = true;
        }
    });
    sessionStorage.setItem("list",JSON.stringify(data));
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

//fetch session data on page reload
function fetch_data(){
    console.log("check");
    let data = JSON.parse(sessionStorage.getItem("list"));
    if(data!=null){
        data.forEach((i) => {
            if(i.checked==false && i.deleted==false){
                var list_items = document.getElementById("item_list");
                str = `<div style="width:50%; height:20px; padding:10px 0; margin:1% 0">
                            <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden">${i.item}</li>
                            <i class="material-icons" style="color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
                            <i class="material-icons" style="color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
                        </div>`
                list_items.innerHTML += str;
            }else if(i.checked==true && i.deleted==false){
                var list_items = document.getElementById("item_list");
                str = `<div style="width:50%; height:20px; padding:10px 0; margin:1% 0">
                            <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden"><strike>${i.item}</strike></li>
                            <i class="material-icons" style="color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
                            <i class="material-icons" style="color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
                        </div>`
                list_items.innerHTML += str;
            }
        });
    }else{
        console.log("no data");
    }
}
