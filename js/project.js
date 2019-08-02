/*修改文本框*/
var input = document.getElementsByClassName("pro-title");
var textarea = document.getElementsByClassName("textarea");
var edit = document.getElementsByClassName("edit");
var sure = document.getElementsByClassName("sure");
/*删除*/
var deleteUl = document.getElementsByClassName("delete");
/*增加*/
var increase = document.getElementsByClassName("increase");

var ulDiv = document.getElementsByClassName("ulAll");
var upInput = document.getElementsByClassName("upLoad");
var pic = document.getElementsByClassName("pic");
var image = document.getElementsByClassName("image");


function ajax() {
    var data = {
        "page": "1",
        "pageSize": "100"
    }
    $.ajax({
        url: "http://www.cxkball.club:2333/project/list",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        contentType: "application/x-www-form-urlencoded",
        success: function (data) {
            var urlFront = "http://www.cxkball.club:2333/upload/";
            console.log(data);
            console.log(data.data.length);
            window.divData = data.data;
            for (var i = 0; i < data.data.length; i++) {
                add(divData[i].id);
            }
            for (var i = 0; i < data.data.length; i++) {
                var description = divData[i].description;
                var title = divData[i].title;
                var img = (divData[i].images[0]) ? divData[i].images[0].filename : null;
                if (img) {
                    image[i].src = urlFront + img;
                }
                input[i].value = title;

                textarea[i].value = description;
            }
        },
        error: function () {
            alert(response.message);
        }
    });
}
ajax();

/*增加新节点*/
function add(ulId) {
    let str = `<div class="ulAll" title="${ulId}">
                    <ul>
                    <li>
                        <div class="pic">
                            <form name="form1" id="form1" enctype="multipart/form-data">
                                <input type="file" multiple="multiple" id="picture" name="coverUrl" class="upLoad" accept="image/gif, image/jpeg, image/png" disabled="disabled">
                            </form>
                            <img class="image" class="image${ulId}" src="" alt="">
                        </div>
                    </li>
                    <li class="text">
                        <input class="pro-title" type="text" disabled="disabled" placeholder="请在此输入标题(字数在20以内)">
                    </li>
                    <li class="text">
                        <textarea class="textarea" disabled="disabled">请在此输入项目介绍</textarea>
                    </li>
                    <li>
                        <img class="edit" src="image/修改.png" alt="修改">
                        <img class="sure" src="image/确定.png" alt="保存">
                    </li>
                    </ul>
                    <div class="border">
                    <img class="delete" src="image/×.png" alt="删除">
                    </div>
                </div>`;
    // console.log(document.getElementsByClassName("content")[0].innerHTML)
    document.getElementsByClassName("content")[0].insertAdjacentHTML('beforeend', str);
}

//转义  元素的innerHTML内容即为转义后的字符
function htmlEncode(str) {
    var ele = document.createElement('span');
    ele.appendChild(document.createTextNode(str));
    return ele.innerHTML;
}
//解析 
function htmlDecode(str) {
    var ele = document.createElement('span');
    ele.innerHTML = str;
    return ele.textContent;
}

/*编辑*/
function editText() {
    for (var i = 0; i < textarea.length; i++) {
        edit[i].onclick = function (num) {
            return function () {
                editChange(num);
            }
        }(i);
        sure[i].onclick = function (num) {
            return function () {
                if (textarea[num].value && input[num].value) {
                    sureChange(num);
                    console.log(input[num].value.length);
                    /*控制标题字数*/
                    for (var j = 0; j < textarea.length; j++) {
                        if (input[j].value.length > 20) {
                            input[j].value = input[j].value.substring(0, 20);
                        }
                    }
                    if (input[num].value.length < 20 && input[num].value.length > 0) {
                        changeAjax(ulDiv[num].title, textarea[num].value, input[num].value);
                    } else {
                        alert("标题字数为0-20哦~");
                    }
                    upLoad(num);
                } else {
                    alert("请把信息填写完整哦~")
                }
            }
        }(i);
        deleteUl[i].onclick = function (num) {
            return function () {
                if (confirm("你真的要把我删除嘛？(；´д｀)ゞ")) {
                    ulDiv[num].parentNode.removeChild(ulDiv[num]);
                    deleteDiv(num);
                } else {
                    return false;
                }
            }
        }(i);
    }
}
editText();

/*删除ajax*/
function deleteDiv(number) {
    var data = {
        "projectId": divData[number].id
    };

    $.ajax({
        "url": "http://www.cxkball.club:2333/project/remove",
        "method": "POST",
        "dataType": "json",
        "async": false,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": data,
        "crossDomain": true
    })
        .done(function (response) {
            alert(response.message);
        })
        .fail(function (jqXHR) {
            alert(jqXHR.message);
        })
}

/*增加块*/
increase[0].onclick = function () {
    add('');
    var len = textarea.length;
    window.count = len + 1;
    editChange(len - 1);
    showPic();

    sure[len - 1].onclick = function () {
        if (textarea[len - 1].value && input[len - 1].value) {
            sureChange(len - 1);
            if (input[len - 1].value.length < 30 && input[len - 1].value.length > 0) {
                changeAjax(ulDiv[len - 1].title, textarea[len - 1].value, input[len - 1].value);
            } else {
                alert("标题字数为0-30哦~");
                limit();
            }
            increaseDiv();
            console.log(ulDiv[textarea.length - 1].title);
        } else {
            alert("请把信息填写完整哦~")
        }
        upLoad(len - 1);
    }
}
/*增加ajax*/
function increaseDiv() {
    var newTitle = input[textarea.length - 1].value;
    var newDescription = textarea[textarea.length - 1].value;
    var data = {
        title: newTitle,
        description: newDescription
    }
    data = JSON.stringify(data);
    console.log(data);

    $.ajax({
        "url": "http://www.cxkball.club:2333/project/insert",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": data,
        "async": false,
        "crossDomain": true,
        success: function (data) {
            data = JSON.parse(data);
            console.log(data.data);
            ulDiv[textarea.length - 1].title = data.data.id;
            editText();
            alert(data.message);
        },
        error: function () {
            alert(data.message);
        }
    })
}

/*上传图片*/
function upLoad(number) {
    /*数据上传*/
    var upUrl = "http://www.cxkball.club:2333/project/upload";
    var formData = new FormData();

    if (filedata) {
        formData.append('uploads', filedata);
        formData.append('projectId', ulDiv[number].title);
    } else {
        return false;
    }
    console.log(formData);

    $.ajax({
        url: upUrl,
        type: "POST",
        dataType: "json",
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        success: function (data) {
            alert(data.message);
        },
        error: function () {
            alert(data.message);
        }
    });
}
/*更改ajax*/
function changeAjax(id, description, title) {

    var data = {
        id: id,
        title: title,
        description: description
    }
    data = JSON.stringify(data);
    console.log(data);

    console.log(data);
    $.ajax({
        "url": "http://www.cxkball.club:2333/project/update",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": data,
        "async": false,
        "crossDomain": true
    })
        .done(function (response) {
            alert(response.message);
        })
        .fail(function (jqXHR) {
            alert(jqXHR.message);
        })
}

function showPic() {
    var reader = new FileReader();
    for (var i = 0; i < textarea.length; i++) {
        upInput[i].onchange = function (num) {
            return function () {
                /*把图片地址存起来*/
                var picture = document.getElementsByClassName("upLoad");
                //将文件以Data URL形式读入页面 
                reader.readAsDataURL(picture[num].files[0]);
                console.log(picture[num].files);
                window.filedata = picture[num].files[0] ? picture[num].files[0] : 0;
                reader.onload = function () {
                    console.log(reader.result);
                    image[num].src = this.result;
                }
            }
        }(i);
    }
}
showPic();

function sureChange(num) {
    input[num].setAttribute("disabled", "disabled");
    input[num].style.border = "none";
    textarea[num].setAttribute("disabled", "disabled");
    textarea[num].style.border = "none";
    textarea[num].style.background = "none";
    textareaValue = textarea[num].value;
    sure[num].style.display = "none";
    edit[num].style.display = "inline";
    upInput[num].setAttribute("disabled", "disabled");
    upInput[num].style.cursor = "auto";
}
function editChange(num) {
    input[num].removeAttribute("disabled");
    input[num].style.borderBottom = "1px solid black";
    textarea[num].removeAttribute("disabled");
    textarea[num].style.border = "1px solid black";
    textarea[num].style.background = "white";
    edit[num].style.display = "none";
    sure[num].style.display = "inline";
    upInput[num].removeAttribute("disabled");
    upInput[num].style.cursor = "pointer";
}

