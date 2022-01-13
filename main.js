console.log("Grocery List Application");

const button = document.getElementById("btn");
const text = document.getElementById("input-bar");

var item;
var str='';
var disp_del_list_check = 0;

text.addEventListener("change", (e) => {
    e.preventDefault();
    item = e.target.value;
});

//populate grocery list
button.addEventListener("click", (e) => {
    var list = JSON.parse(sessionStorage.getItem("list"));
    if (list == null) {
        var list = new Array();
        var id = 0;
    } else {
        var id = list.length;
    }
    id+=1;
    text.value = '';
    e.preventDefault();
    const obj = {
        id: id,
        item: item,
        checked: false,
        deleted: false,
    }
    var list_items = document.getElementById("item_list");
    str = `<div style="width:80%; height:20px; padding:10px 0; margin:1% 0">
        <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden">${item}</li>
        <i class="material-icons" style="cursor:pointer; color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
        <i class="material-icons" style="cursor:pointer; color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
    </div>`
    list_items.innerHTML = str + list_items.innerHTML;
    list.push(obj);
    sessionStorage.setItem("list",JSON.stringify(list));
});

//delete list item
function del(e){
    const check = 1;
    e = e || window.event;
    deleted_item = e.target.parentElement.firstElementChild.innerHTML;
    div = document.createElement('div');
    div.innerHTML = deleted_item;
    let text = div.innerText || div.textContent;
    let data = JSON.parse(sessionStorage.getItem("list"));
    let deleted_list = JSON.parse(sessionStorage.getItem("deleted"));
    data.forEach((i) => {
        if(i.item==text){
            deleted_row = data.splice(data.indexOf(i),1);
            if(deleted_list==null){
                deleted_list = new Array();
                deleted_list.push(deleted_row);
            }else{
                deleted_list.push(deleted_row);
            }
            sessionStorage.setItem("deleted", JSON.stringify(deleted_list));
            sessionStorage.setItem("list", JSON.stringify(data));
            e.target.parentElement.remove();
        }
    });
    
}

//check list item
function check(e){
    e = e || window.event;
    var list_node = document.getElementById('item_list');    
    list_node.innerHTML = '';
    let list_item = e.target.parentElement.firstElementChild.innerHTML;
    checked_item = e.target.parentElement;
    let div = document.createElement('div');
    div.innerHTML = list_item;
    list_item = div.innerText || div.textContent;
    let data = JSON.parse(sessionStorage.getItem("list"));
    data.map((i,index) => {
        if(i.item==list_item){
            var checked_value = data.splice(index,1);
            if(i.checked==false){
                i.checked=true;
                data = checked_value.concat(data);
            }else if(i.checked==true){
                i.checked = false;
                data = data.concat(checked_value);
            }
         }
    });
    sessionStorage.setItem("list",JSON.stringify(data));
    data = JSON.parse(sessionStorage.getItem("list"));
    data.forEach((i) => {
        if(i.checked==true){
            str = `<div style="width:80%; height:20px; padding:10px 0; margin:1% 0">
                        <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden"><strike>${i.item}</strike></li>
                        <i class="material-icons" style="cursor:pointer; color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
                        <i class="material-icons" style="cursor:pointer; color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
                    </div>`
            list_node.innerHTML = str + list_node.innerHTML;
        }else if(i.checked==false){
            str = `<div style="width:80%; height:20px; padding:10px 0; margin:1% 0">
                        <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden">${i.item}</li>
                        <i class="material-icons" style="cursor:pointer; color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
                        <i class="material-icons" style="cursor:pointer; color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
                    </div>`
            list_node.innerHTML = str + list_node.innerHTML;
        }
    });
}

//clear the list 
document.getElementById('clear-btn').addEventListener('click', (e) => {
    document.getElementById('item_list').innerHTML = '';
    console.log(deleted_list);
});

//fetch session data on page reload
function fetch_data(){
    console.log("check");
    const arr_checked = new Array();
    const arr_unchecked = new Array();
    var list_items = document.getElementById("item_list");
    let list = JSON.parse(sessionStorage.getItem("list"));
    if(list!=null){
        list.forEach((i) => {
            if(i.checked==true){
                arr_checked.push(i);
            }else{
                arr_unchecked.push(i);
            }
        });
        const data = [...arr_unchecked.reverse(), ...arr_checked.reverse()];
        if(data!=null){
            data.forEach((i) => {
                if(i.checked==false){
                    str = `<div style="width:80%; height:20px; padding:10px 0; margin:1% 0">
                            <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden">${i.item}</li>
                            <i class="material-icons" style="cursor:pointer; color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
                            <i class="material-icons" style="cursor:pointer; color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
                        </div>`
                    list_items.innerHTML += str;
                }else{
                    str = `<div style="width:80%; height:20px; padding:10px 0; margin:1% 0">
                            <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden"><strike>${i.item}</strike></li>
                            <i class="material-icons" style="cursor:pointer; color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
                            <i class="material-icons" style="cursor:pointer;color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
                        </div>`
                    list_items.innerHTML += str;
                }
            });
        }
    }
    sessionStorage.setItem("list",JSON.stringify(list));
}

function disp_del_list(e){
    disp_del_list_check++;
    e = e || window.event;
    let d_list = JSON.parse(sessionStorage.getItem("deleted"));
    let ul = document.getElementById('deleted-list');
    ul.innerHTML = '';
    if(disp_del_list_check%2!=0){
        d_list.forEach((i) => {
            str = `<div style="width:80%; height:20px; padding:10px 0; margin:1% 0">
                        <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden">${i[0].item}</li>
                        <i onclick="undo_del(event)" class="material-icons" style="cursor:pointer; color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">undo</i>
                    </div>`
            ul.innerHTML += str;
        });
    }else{
        ul.innerHTML = '';
    }
}

function undo_del(e){
    e = e || window.event;
    deleted_element = e.target.parentElement.firstElementChild.innerHTML;
    node = document.getElementById("item_list");
    node.innerHTML = '';
    del_list = JSON.parse(sessionStorage.getItem("deleted"));
    grocery_list = JSON.parse(sessionStorage.getItem("list"));
    del_list.forEach((i)=> {
        if(i[0].item==deleted_element){
            if(i[0].checked==false){
                grocery_list.push(i[0]);
                del_list.splice(del_list.indexOf(i),1);
            }
            else if(i[0].checked==true){
                console.log('inside else');
                let l = new Array(i[0]);
                grocery_list = [...l, ...grocery_list];
                console.log(grocery_list);
                del_list.splice(del_list.indexOf(i),1);
            }
        }
    });
    e.target.parentElement.remove();
    console.log(del_list);
    grocery_list.forEach((i) => {
        if(i.checked==true){
            str = `<div style="width:80%; height:20px; padding:10px 0; margin:1% 0">
                        <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden"><strike>${i.item}</strike></li>
                        <i class="material-icons" style="cursor:pointer; color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
                        <i class="material-icons" style="cursor:pointer; color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
                    </div>`
            node.innerHTML = str + node.innerHTML;
        }else if(i.checked==false){
            str = `<div style="width:80%; height:20px; padding:10px 0; margin:1% 0">
                        <li style="width:40%; list-style:none; display:inline-block; font-size:1.5em; font-family:monospace,sans-serif; font-weight:600; font-size:1.3em; letter-spacing:2px; overflow:hidden">${i.item}</li>
                        <i class="material-icons" style="cursor:pointer; color:rgb(212, 46, 46); float:right; font-size:20px; margin:0 1%" onclick="del(event)">delete</i>
                        <i class="material-icons" style="cursor:pointer; color:green; float:right; font-size:20px; margin:0 1%" onclick="check(event)">check_circle_outline</i>
                    </div>`
            node.innerHTML = str + node.innerHTML;
        }
    });
    sessionStorage.setItem("deleted",JSON.stringify(del_list));
    sessionStorage.setItem("list",JSON.stringify(grocery_list));
}