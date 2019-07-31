/*修改文本框*/
var inputNum = document.getElementsByClassName("number");
var inputTitle = document.getElementsByClassName("text-title");
var textarea = document.getElementsByClassName("text-word");
var edit = document.getElementsByClassName("edit");
var sure = document.getElementsByClassName("sure");
/*删除*/
var deletePic = document.getElementsByClassName("delete");
var ulDiv = document.getElementsByClassName("ulAll");
/*增加*/
// var increase = document.getElementsByClassName("increase");
var increasePic = document.getElementsByClassName("addpic");



// increasePic[0].onclick = function() {
//     let picStr = `<div class="pic">
//                     <div class="border">
//                         <img class="delete" src="../image/×.png" alt="删除">
//                     </div>
//                 </div>`;
//     picStr = htmlEncode(picStr);
//     picStr = htmlDecode(picStr);
//     document.getElementsByClassName("picLi")[0].innerHTML += picStr;
//     editText();
// }


function ajax() {
    $.ajax({
        url: "http://www.cxkball.club:2333/intro/list?page=1&pageSize=3",
        type: "GET",
        dataType: "json",
        async: false,
        contentType: "application/x-www-form-urlencoded",
        success: function(data) {
            var urlFront = "http://www.cxkball.club:2333/upload/";
            console.log(data);
            for(var i = 0; i < data.data.length; i++) {
                add();
            }
            var description = data.data[0].description;
            // var img = data.data[1].images[0].filename;
    
            // var pic = document.getElementsByClassName("pic");
            var textarea = document.getElementsByClassName("text-word");
            
            for(var i = 0;i < data.data.length;i++) {
                // pic[i].innerHTML = "<img src="+urlFront + img+">";
                textarea[i].value = description;
            }
        },
        error: function() {
            alert("请求失败了哟！");
        }
    });
}
ajax();



/*增加块*/
// increase[0].onclick = function() {
//     add();
//     upLoad(textarea.length-1, textarea.length);
//     editText();
// }
function add() {
    let str = ` <div class="ulAll">
                    <ul>
                    <li>
                        <input class="number" value="01" disabled="disabled">
                        <input class="text-title" value="康乐活动" disabled="disabled">
                    </li>
                    <li class="text">
                        <textarea class="text-word" disabled="disabled">简介</textarea>
                    </li>
                    <li>
                        <div class="pic">
                        <div class="border">
                            <img class="delete" src="../image/×.png" alt="删除">
                        </div>
                        </div>
                        <div class="pic">
                        <div class="border">
                            <img class="delete" src="../image/×.png" alt="删除">
                        </div>
                        </div>
                        <div class="pic">
                        <div class="border">
                            <img class="delete" src="../image/×.png" alt="删除">
                        </div>
                        </div>
                        <div class="pic">
                        <div class="border">
                            <img class="delete" src="../image/×.png" alt="删除">
                        </div>
                        </div>
                        <img class="addpic" src="../image/图片添加.png" alt="图片增加">
                    </li>
                    </ul>
                    <img class="edit" src="../image/修改.png" alt="修改">
                    <img class="sure" src="../image/确定.png" alt="保存">
                </div>`;
    str = htmlEncode(str);
    str = htmlDecode(str);
    document.getElementsByClassName("container")[0].innerHTML += str;
    editText();
}

//转义  元素的innerHTML内容即为转义后的字符
function htmlEncode ( str ) {
    var ele = document.createElement('span');
    ele.appendChild( document.createTextNode( str ) );
    return ele.innerHTML;
    }
//解析 
function htmlDecode ( str ) {
var ele = document.createElement('span');
ele.innerHTML = str;
return ele.textContent;
}

function editText() {
    for(var i = 0; i < textarea.length; i++) {
        edit[i].onclick = function(num) {
            return function() {
            inputNum[num].removeAttribute("disabled");
            inputTitle[num].removeAttribute("disabled");
            inputNum[num].style.borderBottom = "1px solid black";
            inputTitle[num].style.borderBottom = "1px solid black";
            // textarea[0].removeAttribute("readonly");
            textarea[num].removeAttribute("disabled");
            textarea[num].style.border = "1px solid black";
            textarea[num].style.background = "white";
            edit[num].style.display = "none";
            sure[num].style.display = "inline";
            }
        }(i);
        sure[i].onclick = function(num) {
            return function() {
            inputNum[num].setAttribute("disabled","disabled");
            inputTitle[num].setAttribute("disabled","disabled");
            inputNum[num].style.border = "1px solid transparent";
            inputTitle[num].style.border = "none";
            // textarea[0].setAttribute("readonly","readonly");
            textarea[num].setAttribute("disabled","disabled");
            textarea[num].style.border = "1px solid transparent";
            textarea[num].style.background = "none";
            textareaValue = textarea[num].value;
            sure[num].style.display = "none";
            edit[num].style.display = "inline";
            }
        }(i);
        deletePic[i].onclick = function(num) {
            return function() {
                if(confirm("你真的要把我删除嘛？(；´д｀)ゞ")) {
                    ulDiv[num].parentNode.removeChild(ulDiv[num]);
                } else {
                    return false;
                }  
            }
        }(i);
    }
}
editText();

// function upLoad(count,len) {
//     var up = document.getElementsByClassName("pic-text");
//     var pic = document.getElementsByClassName("pic");
//     var input = document.getElementsByName("file");

//     for(var i = count; i < len; i++) {
//         pic[i].onmouseover = function(num) {
//             return function() {
//                 up[num].innerHTML = "点击"+"<br>"+"上传";
//                 pic[num].style.background = "rgba(0, 0, 0, 0.10)";
//             }
//         }(i)
//         pic[i].onmouseleave = function(num) {
//             return function() {
//                 up[num].innerHTML = "+<br>添加图片";
//                 pic[num].style.background = "white";
//             }
//         }(i)
//         pic[i].onclick = function(num) {
//             return function() {
//                 input[num].click();
//             }
//         }(i)
//     }
// }
var formData = new FormData();