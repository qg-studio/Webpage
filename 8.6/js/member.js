var serverUrl = "http://www.cxkball.club:2333";
var data = {};
var grade = "";
var field = "";
var page = 1;
var form = document.getElementsByClassName('form')[0];
var groupList = document.getElementsByClassName('group')[0].children;
var yearList = document.getElementsByClassName('year')[0];

//页面初始化
(function () {
    var date = new Date();

    // 生成年份
    for (var i = date.getFullYear(); i > 2004; i--) {
        yearList.innerHTML += "<li>" + i.toString() + "</li>";
    }
    yearList = yearList.children;

    // 组别绑定点击事件
    for (i = 0; i < groupList.length; i++) {
        // groupList[i].onclick = classClick.bind(groupList[i], "field");
        groupList[i].onclick = function () {
            if (this.innerText == "全部") {
                field = "";
            } else {
                field = this.innerText;
            }
            for (var i = 0; i < groupList.length; i++) {
                if (groupList[i].getAttribute("class") == "onGroup") {
                    groupList[i].removeAttribute("class");
                    break;
                }
            }
            this.setAttribute("class", "onGroup");
            page = 1;
            upDate();
        }
    }

    // 年份绑定点击事件
    for (i = 0; i < yearList.length; i++) {
        // yearList[i].onclick = classClick.bind(yearList[i], "grade");
        yearList[i].onclick = function () {
            if (this.innerText == "全部") {
                grade = "";
            } else {
                grade = this.innerText;
            }
            for (var i = 0; i < yearList.length; i++) {
                if (yearList[i].getAttribute("class") == "onYear") {
                    yearList[i].removeAttribute("class");
                    break;
                }
            }
            this.setAttribute("class", "onYear");
            page = 1;
            upDate();
        }
    }

    // 显示全部
    groupList[0].onclick();

})();

// 获取数据和节点插入
function upDate() {
    getDate();
    form.innerHTML = modelStr(data.data.length - 1); // 首节点是添加
    form.children[0].children[0].style.display = "none"; // 去掉首节点的删除按钮
    form.children[0].getElementsByClassName("click")[1].setAttribute("onclick", "addCommit()");
    for (var j = data.data.length - 2; j >= 0; j--) {
        let model = modelStr(j);
        form.innerHTML += model;
    }
}

// 拉去第page页的10个数据
function getDate() {
    var formData = {
        "grade": grade,
        "field": field,
        "page": page,
        "pageSize": 1
    }
    $.ajax({
        "url": serverUrl + "/member/list",
        "method": "POST",
        "dataType": "json",
        "async": false,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": formData,
        "crossDomain": true
    })
        .done(function (response) {
            data = response.data;
            updataPage();
            console.log(data);
        })
        .fail(function (jqXHR) {
            alert(jqXHR.message);
        })
}

// 生成页数
function updataPage() {
    var pageList = document.getElementsByClassName('page')[0];
    pageList.innerHTML = "";

    if (data.page <= 9) {
    for (var i = 1; i <= data.page; i++) {
      creatOnePage(i);
    }
  } else if (page <= 5) {
    for (var i = 1; i <= 7; i++) {
      creatOnePage(i);
    }
    creatOnePage("…");
    creatOnePage(data.page);
  } else if (page >= data.page - 4) {
    creatOnePage(1);
    creatOnePage("…");
    for (var i = data.page - 6;  i <= data.page; i++) {
      creatOnePage(i);
    }
  } else {
    creatOnePage(1);
    creatOnePage("…");
    for (var i = parseInt(page) - 2; i <= parseInt(page)  + 2; i++) {
      creatOnePage(i);
    }
    creatOnePage("…");
    creatOnePage(data.page);
  }
}
// 创建一页
function creatOnePage(i) {
  var pageList = document.getElementsByClassName('page')[0];
  if (i == page) {
    pageList.innerHTML += `<li onclick="pageClick()" class="onPage">${i}</li>`;
  } else if (i == "…"){
    pageList.innerHTML += `<li>${i}</li>`;
  } else {
    pageList.innerHTML += `<li onclick="pageClick()">${i}</li>`;
  }
}
// 页数点击
function pageClick() {
    page = event.target.innerText;
    upDate();
}

// document.getElementsByClassName('page')[0].children[0].onclick

// 删除
function deleteFun() {
    var li = event.target.parentNode;
    if (confirm("你确定删除此数据吗？")) {
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].id == parseInt(li.title)) {
                var jsonData = {
                    "memberId": data.data[i].id
                };
                $.ajax({  // Ajax删除后台数据
                    "url": serverUrl + "/member/remove",
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    "dataType": "json",
                    "data": jsonData,
                    "crossDomain": true
                })
                    .done(function (response) {
                        if (response.status == 200) {
                            li.style.height = 0; // 删除样式
                            setTimeout(function () {
                                if (data.data.length == 2) {
                                    page --;
                                }
                                upDate();
                                alert("删除成功。");
                            }, 520);
                        } else if (response.status == 401) {
                            alert("删除失败。");
                        }
                    })
                    .fail(function (jqXHR) {
                        alert(jqXHR.message);
                    })
                break;
            }
        }
    } else {
        alert("取消成功。");
    }
}

// 可修改
function ableChange() {
    inputChange(event.target.parentNode);
};

// 修改
function changeCommit() {
    var self = event.target.parentNode;
    var id = self.title,
        name = self.children[3].value,
        field = self.children[4].value,
        grade = self.children[5].value,
        jsonData = {
            id: id,
            name: name,
            field: field,
            grade: grade
        };

    var img = self.getElementsByClassName("upFile")[0].files[0] || null;

    if (!judegInput(jsonData)) {
        inputChange(self);
        upDate();
        return;
    }
    if (confirm("你确定修改这些数据吗?")) {
        $.ajax({
            "url": serverUrl + "/member/update",
            "method": "POST",
            "dataType": "json",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(jsonData),
            "crossDomain": true
        })
            .done(function (response) {
                if (response.status == 200) {
                    if (img != null) {
                        // console.log("头像被修改了！");
                        if (updateImg(img, id)) {
                            alert("修改成功");
                        } else {
                            alert("图片上传失败。")
                        }
                    } else {
                        console.log("头像没有修改");
                        alert("修改成功");
                    }
                } else {
                    alert(response.message);
                }
                inputChange(self);
                upDate();
            })
            .fail(function (jqXHR) {
                alert(jqXHR.message);
                inputChange(self);
                upDate();
            })
    } else {
        alert("取消成功。");
        inputChange(self);
        upDate();
    }
};

// 添加
function addCommit() {
    var self = event.target.parentNode;
    console.log(event.target);
    var name = self.children[3].value,
        field = self.children[4].value,
        grade = self.children[5].value,
        jsonData = {
            name: name,
            field: field,
            grade: grade
        };
    var img = self.getElementsByClassName("upFile")[0].files[0];

    if (!judegInput(jsonData)) {
        inputChange(self);
        upDate();
        return;
    }
    if (!img) {
        alert("头像图片有误。");
        inputChange(self);
        upDate();
        return;
    }


    $.ajax({
        "url": "http://www.cxkball.club:2333/member/insert",
        "method": "POST",
        "dataType": "json",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(jsonData),
        "crossDomain": true
    })
        .done(function (response) {
            if (response.status == 200) {
                if (updateImg(img, response.data.id)) {
                    alert("添加成功");
                } else {
                    alert("图片上传失败");
                }
            } else {
                alert("添加失败");
            }
            upDate();
            inputChange(self);
        })
        .fail(function (jqXHR) {
            alert(jqXHR.message);
            upDate();
            inputChange(self);
        })
}

// 上传头像
function updateImg(uploads, memberId) {
    var formData = new FormData();
    formData.append("uploads", uploads);
    formData.append("memberId", memberId);
    var juede = false;

    $.ajax({
        url: serverUrl + "/member/upload",
        method: "POST",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        async: false,
        success: function (data) {
            judeg = true;
        }
    })
    return judeg;
}

// 换头像
function upFiles() {
    var self = event.target;
    var photo = self.parentNode.getElementsByClassName("photo")[0];
    var file = self.files[0];
    var fileValue = self.value;
    var extName = fileValue.substring(fileValue.lastIndexOf(".")).toLowerCase();//（把路径中的所有字母全部转换为小写）         
    var AllImgExt=".jpg|.jpeg|.gif|.bmp|.png|"; 
    if(AllImgExt.indexOf(extName+"|") == -1) { 
        ErrMsg="该文件类型不允许上传。请上传 "+AllImgExt+" 类型的文件，当前文件类型为"+extName; 
        alert(ErrMsg); 
        return; 
    } 
    if (file.size > 5 * 1024 * 1024) {
        alert("图片文件过大");
        return;
    }
    var fileRead = new FileReader();
    fileRead.readAsDataURL(file);

    fileRead.onload = function () {
        console.log(this);
        photo.style.backgroundImage = "url(" + this.result + ")";
    }
    console.log(fileRead);
}

// 单个节点字符串
function modelStr(j) {
    let model = `<li title="${data.data[j].id}">
                 <img class="delete" src="image/×.png" onclick="deleteFun()">
                 <div class="photo" style="background-image:url(${serverUrl}/upload/${data.data[j].images[0].filename})"></div>
                 <input class="upFile inputBan" type="file" name="" disabled="disabled" onchange="upFiles()">
                 <input type="text" placeholder="姓名" value="${data.data[j].name}" disabled="disabled" class="inputBan">
                 <input type="text" placeholder="组别" value="${data.data[j].field}" disabled="disabled" class="inputBan">
                 <input type="texe" placeholder="年份" value="${data.data[j].grade}" disabled="disabled" class="inputBan">
                 <img class="click" src="image/修改.png" title="修改" onclick="ableChange()"></img>
                 <img class="click" src="image/确定.png" title="确定" style="display:none" onclick="changeCommit()"></img>
               </li>`;
    return model;
}

// input输入改变
function inputChange(parentNode) {
    var inputList = parentNode.getElementsByTagName("input");
    var click = parentNode.getElementsByClassName('click');

    if (inputList[0].getAttribute("disabled") == "disabled") {
        click[0].style.display = "none";
        click[1].style.display = "block";
        inputList[0].removeAttribute("disabled");
        inputList[0].setAttribute("class", "upFile");
        for (var i = 1; i < inputList.length; i++) {
            inputList[i].removeAttribute("disabled");
            inputList[i].removeAttribute("class");
        }
    } else {
        click[0].style.display = "block";
        click[1].style.display = "none";
        inputList[0].setAttribute("disabled", "disabled");
        inputList[0].setAttribute("class", "upFile inputBan");
        for (var i = 1; i < inputList.length; i++) {
            inputList[i].setAttribute("disabled", "disabled");
            inputList[i].setAttribute("class", "inputBan");
        }
    }
}

// 判断input输入是否正确
function judegInput(obj) {
    var date = new Date();
    var nowYear = date.getFullYear();

    console.log(obj.grade < 2005, obj.field);

    for (var i = 1; i < groupList.length; i++) {
        console.log(obj.field, groupList[i].innerText);
        if (obj.field == groupList[i].innerText) {
            break;
        }
    }
    if (i == groupList.length) {
        alert("组别输入错误。");
        return false;
    } else if (!isNotNullTrim(obj.field) || !isNotNullTrim(obj.grade)) {
        alert("输入为空");
        return false;
    } else if (obj.grade != parseInt(obj.grade)) {
        alert("您输入的年份格式不正确");
        return false;
    } else if (obj.grade < 2005 || obj.grade > nowYear) {
        alert("年份输入错误。");
        return false;
    } else {
        return true;
    }
}

// 非空验证
function isNotNullTrim(source) {
    if (source != null && source != undefined && source != 'undefined' && $.trim(source) != "")
        return true;
    return false;
}

/*退出登录*/
function loginOut() {
    if (confirm("您确定要退出吗？")) {

        var data = {};

        $.ajax({
            "url": "http://www.cxkball.club:2333/user/logout",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": data,
            "async": false,
            "crossDomain": true
        })
            .done(function (response) {
                response = JSON.parse(response);
                console.log(response);
                if (response.status == 200) {
                    window.location.href = "http://www.cxkball.club:2333/login.html";
                } else {
                    alert(response.message);
                }
            })
            .fail(function (jqXHR) { })
    } else {
        return false;
    }
}