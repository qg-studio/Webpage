var feature = document.getElementsByClassName("feature");
var histories = document.getElementsByClassName("histories");
var featurecon = document.getElementsByClassName("container");
var historycon = document.getElementsByClassName("containerT");

/*静态分页*/
feature[0].onclick = function () {
    featurecon[0].style.display = "block";
    historycon[0].style.display = "none";
    feature[0].style.backgroundColor = "#fff";
    histories[0].style.backgroundColor = "#f6f6f6";
    feature[0].style.color = "black";
    histories[0].style.color = "#626262";
};
histories[0].onclick = function () {
    featurecon[0].style.display = "none";
    historycon[0].style.display = "block";
    feature[0].style.backgroundColor = "#f6f6f6";
    histories[0].style.backgroundColor = "#fff";
    feature[0].style.color = "#626262";
    histories[0].style.color = "black";
};


/*********************************
************QG特色**************
*********************************/

/*修改文本框*/
var inputNum = document.getElementsByClassName("number");
var inputTitle = document.getElementsByClassName("text-title");
var inputPic = document.getElementsByClassName("picInput");
var textarea = document.getElementsByClassName("text-word");
/*编辑*/
var edit = document.getElementsByClassName("edit");
/*标题描述确定*/
var sure = document.getElementsByClassName("sure");
/*删除*/
var deletePic = document.getElementsByClassName("delete");
var deleteUl = document.getElementsByClassName("deleteBig");
/*修改*/
var revise = document.getElementsByClassName("revise");
/*图片确定*/
var picSure = document.getElementsByClassName("pic-sure");
/*增加*/
var increase = document.getElementsByClassName("increase");
var increasePic = document.getElementsByClassName("addpic");
/*板块小图*/
var imageS = document.getElementsByClassName("image-small");
/*上传图片按钮*/
var upInput = document.getElementsByClassName("upLoad");
/*板块*/
var ulDiv = document.getElementsByClassName("ulAll");
var picDiv = document.getElementsByClassName("picDiv");

/*请求数据*/
function ajax() {
    var data = {
        "page": "1",
        "pageSize": "100"
    }
    $.ajax({
        url: "http://www.cxkball.club:2333/feature/list",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        contentType: "application/x-www-form-urlencoded",
        success: function (data) {
            var urlFront = "http://www.cxkball.club:2333/upload/";
            console.log(data);
            window.divData = data.data.data;
            for (var i = 0; i < divData.length; i++) {
                add(divData[i].id);
                for (var j = 0; j < divData[i].images.length; j++) {
                    picAdd(i, 'q', divData[i].images[j].id);
                }
                increaseAdd(i);
            }
            for (var i = 0; i < divData.length; i++) {
                var description = divData[i].description;
                var title = divData[i].title;
                inputTitle[i].value = title;
                textarea[i].value = description;
                for (var j = 0; j < divData[i].images.length; j++) {
                    var img = (divData[i].images[j]) ? divData[i].images[j].filename : null;
                    var picDescription = divData[i].images[j].description;
                    if (img) {
                        document.getElementsByClassName("ulAll")[i].getElementsByClassName("pic")[j].getElementsByClassName("image-small")[0].src = urlFront + img;
                        document.getElementsByClassName("ulAll")[i].getElementsByClassName("picInput")[j].value = picDescription;
                    }
                }
            }
        },
        error: function () {
            alert(data.message);
        }
    });
}
ajax();

/*增加添加图片符号*/
function increaseAdd(i) {
    let incStr = `<img class="addpic" src="image/图片添加.png" alt="图片增加">`;
    document.getElementsByClassName("picLi")[i].insertAdjacentHTML('beforeend', incStr);
}
/*添加图片*/
function picAdd(j, i, picId) {
    let picStr = `<div class="picDiv">
                    <div class="pic">
                        <form name="form1" id="form1" enctype="multipart/form-data">
                            <input type="file" multiple="multiple" id="picture" name="coverUrl" class="upLoad" accept="image/gif, image/jpeg, image/png" disabled="disabled" onchange="showPic()">
                        </form>
                        <img class="image-small" src="" alt="" title="${picId}">
                        <div class="border">
                            <img class="revise" src="image/revise.png" alt="修改">
                            <img class="pic-sure" src="image/ok.png" alt="确定图片">
                            <img class="delete" src="image/×.png" alt="删除">
                        </div>
                    </div>
                    <input class="picInput" disabled="disabled" value="图片简介">
                    </div>`;
    if (i >= 0) {
        document.getElementsByClassName("addpic")[i].insertAdjacentHTML('beforebegin', picStr);
    }
    if (j >= 0) {
        document.getElementsByClassName("picLi")[j].insertAdjacentHTML('beforeend', picStr);
    }
    editText();
}
/*增加板块*/
function add(ulId) {
    let str = ` <div class="ulAll" title="${ulId}">
                    <ul>
                    <li>
                        <input class="number" value="01" disabled="disabled">
                        <input class="text-title" value="康乐活动" disabled="disabled">
                    </li>
                    <li class="text">
                        <textarea class="text-word" disabled="disabled">简介</textarea>
                    </li>
                    <li class="picLi">

                    </li>
                    <li>
                        <img class="edit" src="image/修改.png" alt="修改">
                        <img class="sure" src="image/确定.png" alt="保存">
                        <div class="borderTwo">
                        <img class="deleteBig" src="image/×.png" alt="删除">
                        </div>
                    <li>
                    </ul>
                </div>`;
    str = htmlEncode(str);
    str = htmlDecode(str);
    document.getElementsByClassName("content")[0].insertAdjacentHTML('beforeend', str);
    editText();
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

function sureChange(num) {
    inputTitle[num].setAttribute("disabled", "disabled");
    inputTitle[num].style.border = "1px solid transparent";
    textarea[num].setAttribute("disabled", "disabled");
    textarea[num].style.border = "1px solid transparent";
    textarea[num].style.background = "none";
    textareaValue = textarea[num].value;
    sure[num].style.display = "none";
    edit[num].style.display = "inline";
}
function editChange(num) {
    inputTitle[num].removeAttribute("disabled");
    inputTitle[num].style.borderBottom = "1px solid black";
    textarea[num].removeAttribute("disabled");
    textarea[num].style.border = "1px solid black";
    textarea[num].style.background = "white";
    edit[num].style.display = "none";
    sure[num].style.display = "inline";
}

/*编辑*/
function editText() {
    for (let i = 0; i < textarea.length; i++) {
        edit[i].onclick = function (num) {
            return function () {
                editChange(num);
            }
        }(i);
        sure[i].onclick = function (num) {
            return function () {
                if (textarea[num].value && inputTitle[num].value) {
                    sureChange(num);
                    /*控制标题字数*/
                    for (var j = 0; j < textarea.length; j++) {
                        if (inputTitle[j].value.length > 20) {
                            inputTitle[j].value = inputTitle[j].value.substring(0, 20);
                        }
                    }
                    if (inputTitle[num].value.length < 20 && inputTitle[num].value.length > 0) {
                        changeAjax(ulDiv[num].title, textarea[num].value, inputTitle[num].value);
                    } else {
                        alert("标题字数为0-20哦~");
                    }
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
        for (let j = 0; j < inputPic.length; j++) {
            deletePic[j].onclick = function (i, num) {
                return function () {
                    if (confirm("你真的要把我删除嘛？(；´д｀)ゞ")) {
                        picDiv[num].parentNode.removeChild(picDiv[num]);
                        deletePicAjax();
                    } else {
                        return false;
                    }
                }
            }(0, j);
        }
        for (let j = 0; j < inputPic.length; j++) {
            revise[j].onclick = function () {
                inputPic[j].removeAttribute("disabled");
                inputPic[j].style.borderBottom = "1px solid black";
                revise[j].style.display = "none";
                picSure[j].style.display = "inline";
                upInput[j].removeAttribute("disabled");
                upInput[j].style.cursor = "pointer";
            }
        }
        for (let j = 0; j < inputPic.length; j++) {
            picSure[j].onclick = function () {
                This = event.target;
                inputPic[j].setAttribute("disabled", "disabled");
                inputPic[j].style.border = "1px solid transparent";
                picSure[j].style.display = "none";
                revise[j].style.display = "inline";
                upInput[j].setAttribute("disabled", "disabled");
                upInput[j].style.cursor = "auto";
                if(This.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.title != 'h') {
                    changePicDesAjax();
                    changePicAjax();
                } 
                upLoadpicAjax();
            }
        }
    }
}
editText();

/*显示图片*/
function showPic() {
    var This = event.target;
    var img = This.parentNode.parentNode.getElementsByClassName("image-small")[0];
    var reader = new FileReader();
    window.file = This.files[0];

    if (file.size > 5 * 1024 * 1024) {
        alert("图片文件过大");
        return;
    }
    reader.readAsDataURL(file);
    reader.onload = function () {
        img.src = this.result;
    }
}

/*增加图片*/
for (var i = 0; i < textarea.length; i++) {
    increasePic[i].onclick = function (num) {
        return function () {
            picAdd(-1, num, 'h');
            editText();
            for (var j = 0; j < inputPic.length; j++) {
                console.log(num, j);
                showPic();
            }
        }
    }(i)
}

/*删除图片*/
function deletePicAjax() {
    var This = event.target;
    console.log(This.parentNode.parentNode.parentNode)
    var data = {
        "imageId": This.parentNode.parentNode.parentNode.getElementsByClassName("image-small")[0].title
    }

    $.ajax({
        "url": "http://www.cxkball.club:2333/image/remove",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": data,
        "crossDomain": true
    })
        .done(function (response) {
            response = JSON.parse(response);
            alert(response.message);
        })
        .fail(function (jqXHR) {
            alert(jqXHR.message);
        })
}

/*删除板块ajax*/
function deleteDiv(number) {
    var data = {
        "featureId": divData[number].id
    };

    $.ajax({
        "url": "http://www.cxkball.club:2333/feature/remove",
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
            response = JSON.parse(response);
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
    inputNum[len - 1].value = "0" + len;

    sure[len - 1].onclick = function () {
        if (textarea[len - 1].value && inputTitle[len - 1].value) {
            sureChange(len - 1);
            if (inputTitle[len - 1].value.length < 30 && inputTitle[len - 1].value.length > 0) {
                increaseDiv();
            } else {
                alert("标题字数为0-30哦~");
                limit();
            }
            console.log(ulDiv[textarea.length - 1].title);
        } else {
            alert("请把信息填写完整哦~")
        }
    }
    increaseAdd(len - 1);
}

/*增加板块ajax*/
function increaseDiv() {
    var newTitle = inputTitle[textarea.length - 1].value;
    var newDescription = textarea[textarea.length - 1].value;
    var data = {
        title: newTitle,
        description: newDescription
    }
    data = JSON.stringify(data);
    console.log(data);

    $.ajax({
        "url": "http://www.cxkball.club:2333/feature/insert",
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
function upLoadpicAjax() {
    var formData = new FormData();
    var This = event.target;
    var img = This.parentNode.parentNode.getElementsByClassName("image-small")[0];
    
    formData.append('uploads', file);
    formData.append('featureId', This.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.title);
    formData.append('description', This.parentNode.parentNode.parentNode.getElementsByClassName("picInput")[0].value);

    $.ajax({
        url: "http://www.cxkball.club:2333/feature/upload",
        type: "POST",
        dataType: "json",
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data)
            img.title = data.data.images[data.data.images.length-1].id;
            alert(data.message);
        },
        error: function () {
            alert(data.message);
        }
    });
}

/*更改标题和描述ajax*/
function changeAjax(id, description, title) {
    var data = {
        id: id,
        description: description,
        title: title
    }
    data = JSON.stringify(data);

    $.ajax({
        "url": "http://www.cxkball.club:2333/feature/update",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": data,
        "async": false,
        "crossDomain": true
    })
        .done(function (response) {
            response = JSON.parse(response);
            alert(response.message);
        })
        .fail(function (jqXHR) {
            alert(jqXHR.message);
        })
}

/*修改单张图片*/
function changePicAjax() {
    var formData = new FormData();
    var This = event.target;
    var img = This.parentNode.parentNode.getElementsByClassName("image-small")[0];

    formData.append('uploads', file);
    formData.append('imageId', img.title);
    console.log(formData);

    $.ajax({
        url: "http://www.cxkball.club:2333/image/replace",
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

/*修改单张图片描述*/
function changePicDesAjax() {
    var This = event.target;
    var data = {
        id: This.parentNode.parentNode.getElementsByClassName("image-small")[0].title,
        description: This.parentNode.parentNode.parentNode.getElementsByClassName("picInput")[0].value
    }
    data = JSON.stringify(data);

    $.ajax({
        url: "http://www.cxkball.club:2333/image/update",
        type: "POST",
        dataType: "json",
        data: data,
        async: false,
        contentType: "application/json",
        success: function (data) {
            alert(data.message);
        },
        error: function () {
            alert(data.message);
        }
    });
}

/*序号*/
for (var i = 0; i < textarea.length; i++) {
    inputNum[i].value = "0" + (i + 1);
}


/*********************************
************QG大事记**************
*********************************/

/*修改文本框*/
var inputT = document.getElementsByClassName("pro-titleT");
var textareaT = document.getElementsByClassName("textareaT");
var editT = document.getElementsByClassName("editT");
var sureT = document.getElementsByClassName("sureT");
/*删除*/
var deleteUlT = document.getElementsByClassName("deleteT");
/*增加*/
var increaseT = document.getElementsByClassName("increaseT");

var ulDivT = document.getElementsByClassName("ulAllT");
var upInputT = document.getElementsByClassName("upLoadT");
var picT = document.getElementsByClassName("picT");
var imageT = document.getElementsByClassName("imageT");


function ajaxT() {
    var data = {
        "page": "1",
        "pageSize": "100"
    }
    $.ajax({
        url: "http://www.cxkball.club:2333/history/list",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        contentType: "application/x-www-form-urlencoded",
        success: function (data) {
            var urlFront = "http://www.cxkball.club:2333/upload/";
            console.log(data);
            console.log(data.data.length);
            window.divDataT = data.data;
            for (var i = 0; i < data.data.length; i++) {
                addT(divDataT[i].id);
            }
            for (var i = 0; i < data.data.length; i++) {
                console.log(imageT);
                var descriptionT = divDataT[i].description;
                var titleT = divDataT[i].title;
                var imgT = (divDataT[i].images[0]) ? divDataT[i].images[0].filename : null;
                if (imgT) {
                    imageT[i].src = urlFront + imgT;
                }
                inputT[i].value = titleT;

                textareaT[i].value = descriptionT;
            }
        },
        error: function () {
            alert(data.message);
        }
    });
}
ajaxT();

/*增加新节点*/
function addT(ulId) {
    let strT = `<div class="ulAllT" title="${ulId}">
                    <ul>
                    <li>
                        <div class="picT">
                            <form name="form1" id="form1" enctype="multipart/form-data">
                                <input type="file" multiple="multiple" id="picture" name="coverUrl" class="upLoadT" accept="image/gif, image/jpeg, image/png" disabled="disabled">
                            </form>
                            <img class="imageT" class="image${ulId}" src="" alt="">
                        </div>
                    </li>
                    <li class="textT">
                        <input class="pro-titleT" type="text" disabled="disabled" placeholder="请在此输入标题(字数在20以内)">
                    </li>
                    <li class="textT">
                        <textarea class="textareaT" disabled="disabled">请在此输入项目介绍</textarea>
                    </li>
                    <li>
                        <img class="editT" src="image/修改.png" alt="修改">
                        <img class="sureT" src="image/确定.png" alt="保存">
                    </li>
                    </ul>
                    <div class="borderT">
                    <img class="deleteT" src="image/×.png" alt="删除">
                    </div>
                </div>`;
    // console.log(document.getElementsByClassName("content")[0].innerHTML)
    document.getElementsByClassName("contentT")[0].insertAdjacentHTML('beforeend', strT);
}

/*编辑*/
function editTextT() {
    for (var i = 0; i < textareaT.length; i++) {
        editT[i].onclick = function (num) {
            return function () {
                editChangeT(num);
            }
        }(i);
        sureT[i].onclick = function (num) {
            return function () {
                if (textareaT[num].value && inputT[num].value) {
                    sureChangeT(num);
                    console.log(inputT[num].value.length);
                    /*控制标题字数*/
                    for (var j = 0; j < textareaT.length; j++) {
                        if (inputT[j].value.length > 20) {
                            inputT[j].value = inputT[j].value.substring(0, 20);
                        }
                    }
                    if (inputT[num].value.length < 20 && inputT[num].value.length > 0) {
                        changeAjaxT(ulDivT[num].title, textareaT[num].value, inputT[num].value);
                    } else {
                        alert("标题字数为0-20哦~");
                    }
                    upLoadT(num);
                } else {
                    alert("请把信息填写完整哦~")
                }
            }
        }(i);
        deleteUlT[i].onclick = function (num) {
            return function () {
                if (confirm("你真的要把我删除嘛？(；´д｀)ゞ")) {
                    ulDivT[num].parentNode.removeChild(ulDivT[num]);
                    deleteDivT(num);
                } else {
                    return false;
                }
            }
        }(i);
    }
}
editTextT();

/*删除ajax*/
function deleteDivT(number) {
    var data = {
        "historyId": divDataT[number].id
    };

    $.ajax({
        "url": "http://www.cxkball.club:2333/history/remove",
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
increaseT[0].onclick = function () {
    addT('');
    var len = textareaT.length;
    editChangeT(len - 1);
    showPicT();

    sureT[len - 1].onclick = function () {
        if (textareaT[len - 1].value && inputT[len - 1].value) {
            sureChangeT(len - 1);
            if (inputT[len - 1].value.length < 30 && inputT[len - 1].value.length > 0) {
                changeAjaxT(ulDivT[len - 1].title, textareaT[len - 1].value, inputT[len - 1].value);
            } else {
                alert("标题字数为0-30哦~");
                limit();
            }
            increaseDivT();
        } else {
            alert("请把信息填写完整哦~")
        }
        upLoadT(len - 1);
    }
}

/*增加ajax*/
function increaseDivT() {
    var newTitleT = inputT[textareaT.length - 1].value;
    var newDescriptionT = textareaT[textareaT.length - 1].value;
    var data = {
        title: newTitleT,
        description: newDescriptionT
    }
    data = JSON.stringify(data);
    console.log(data);

    $.ajax({
        "url": "http://www.cxkball.club:2333/history/insert",
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
            ulDivT[textareaT.length - 1].title = data.data.id;
            editText();
            alert(data.message);
        },
        error: function () {
            alert(data.message);
        }
    })
}

/*上传图片*/
function upLoadT(number) {
    /*数据上传*/
    var upUrl = "http://www.cxkball.club:2333/history/upload";
    var formData = new FormData();

    if (filedataT) {
        formData.append('uploads', filedataT);
        formData.append('historyId', ulDivT[number].title);
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
function changeAjaxT(id, description, title) {

    var data = {
        id: id,
        title: title,
        description: description
    }
    data = JSON.stringify(data);
    console.log(data);

    console.log(data);
    $.ajax({
        "url": "http://www.cxkball.club:2333/history/update",
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

function showPicT() {
    var readerT = new FileReader();
    for (var i = 0; i < textareaT.length; i++) {
        upInputT[i].onchange = function (num) {
            return function () {
                /*把图片地址存起来*/
                var pictureT = document.getElementsByClassName("upLoadT");
                //将文件以Data URL形式读入页面 
                readerT.readAsDataURL(pictureT[num].files[0]);
                console.log(pictureT[num].files);
                window.filedataT = pictureT[num].files[0] ? pictureT[num].files[0] : 0;
                readerT.onload = function () {
                    console.log(readerT.result);
                    imageT[num].src = this.result;
                }
            }
        }(i);
    }
}
showPicT();

function sureChangeT(num) {
    inputT[num].setAttribute("disabled", "disabled");
    inputT[num].style.border = "none";
    textareaT[num].setAttribute("disabled", "disabled");
    textareaT[num].style.border = "none";
    textareaT[num].style.background = "none";
    textareaValue = textareaT[num].value;
    sureT[num].style.display = "none";
    editT[num].style.display = "inline";
    upInputT[num].setAttribute("disabled", "disabled");
    upInputT[num].style.cursor = "auto";
}

function editChangeT(num) {
    inputT[num].removeAttribute("disabled");
    inputT[num].style.borderBottom = "1px solid black";
    textareaT[num].removeAttribute("disabled");
    textareaT[num].style.border = "1px solid black";
    textareaT[num].style.background = "white";
    editT[num].style.display = "none";
    sureT[num].style.display = "inline";
    upInputT[num].removeAttribute("disabled");
    upInputT[num].style.cursor = "pointer";
}






