var serverUrl = "http://www.cxkball.club:2333",
    momentData = [],
    featureData = [],
    fieldData = [],
    honorData = [];
var momentList = document.getElementsByClassName('moment')[0];
var leaderList = document.getElementsByClassName('leader')[0];
var fieldList = document.getElementsByClassName('field')[0];
var honorList = document.getElementsByClassName('honor-main')[0];

// 重要时刻
function getMoment() {
  var data = {
    "page": "1",
    "pageSize": "7"
  }
  $.ajax({
    "url": serverUrl + "/moment/list",
    "method": "POST",
    "headers": {
    "Content-Type":"application/x-www-form-urlencoded"
    },
    "data": data,
    "dataType": "json",
    "crossDomain": true
    })
  .done(function(response){
    console.log("重要时刻",response);
    if (response.status == 200) {
      momentData = response.data;
      momentList.innerHTML = `
      <div class="subtitle">重要时刻</div>
      <img class="rule" src="image/分割线.png" style="display:block; margin:0 auto; margin-bottom:2%; width:20%;">
      `;
      for (var i = 0; i < momentData.length; i++) { 
        momentList.innerHTML += momentNode(i);
      }
    } else {
      alert(response.message);
    }
  })
  .fail(function(jqXHR){
    alert("【请求数据】服务器请求数据失败");
  })
}
function updateMoment() {
  var list = event.target.parentNode,
      id = list.title,
      title = list.getElementsByClassName('title')[0].value,
      image = list.getElementsByClassName('img-file')[0].files[0] || null;
  
  if (!isNotNullTrim(title)) {
    alert("输入不能为空");
    return;
  }

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("title", title);
  formdata.append("image", image);

  if (confirm("你确定要修改这些数据吗？")) {
    $.ajax({
      url: serverUrl + "/moment/update",
      method: "POST",
      data: formdata,
      contentType: false,
      processData: false,
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.status == 200) {
          alert ("修改成功");
        } else {
          alert(data.message);
        }
      }
    })
  } else {
    alert("取消成功");
  }
  getMoment();
  judgeTextarea(list);
}
function momentNode(i) {
  var model = `<div class="list" title="${momentData[i].id}">
                <div class="img" style="background-image:url(${serverUrl}/upload/${momentData[i].images[0].filename})"></div>
                <input class="img-file" type="file" disabled="disabled" onchange="upFiles()">
                <textarea class="title" placeholder="标题" disabled="disabled" maxlength="50">${momentData[i].title}</textarea>
                <img class="edit" src="image/修改.png" onclick="editable()">
                <img class="commit" src="image/确定.png" style="display: none;" onclick="updateMoment()">
              </div>`
  return model;
}

// 指导老师
function getLeader() {
  var data = {
    "page": "1",
    "pageSize": "2"
  }

  $.ajax({
    "url": serverUrl + "/leader/list",
    "method": "POST",
    "headers": {
    "Content-Type":"application/x-www-form-urlencoded"
    },
    "data": data,
    "dataType": "json",
    "crossDomain": true
    })
  .done(function(response){
    console.log("指导老师",response);
    if (response.status == 200) {
      leaderData = response.data;
      leaderList.innerHTML = `
      <div class="subtitle">指导老师</div>
      <img class="rule" src="image/分割线.png" style="display:block; margin:0 auto; margin-bottom:2%; width:20%;">
      `;
      for (var i = 0; i < leaderData.length; i++) { 
        leaderList.innerHTML += leaderNode(i);
      }
    } else {
      alert(response.message);
    }
  })
  .fail(function(jqXHR){
    alert("【请求数据】服务器请求数据失败");
  })
}
function updateLeader() {
  var list = event.target.parentNode,
      id = list.title,
      name = list.getElementsByClassName('name')[0].value,
      description = list.getElementsByClassName('description')[0].value,
      position = list.getElementsByClassName('position')[0].value,
      image = list.getElementsByClassName('img-file')[0].files[0] || null;
  
  if (!isNotNullTrim(name) || !isNotNullTrim(description) || !isNotNullTrim(position)) {
    alert("输入不能为空");
    return;
  }

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("name", name);
  formdata.append("description", description);
  formdata.append("position", position);
  formdata.append("image", image);
  
  if (confirm("你确定要修改这些数据吗？")) {
    $.ajax({
      url: serverUrl + "/leader/update",
      method: "POST",
      data: formdata,
      contentType: false,
      processData: false,
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.status == 200) {
          alert ("修改成功");
        } else {
          alert(data.message);
        }
      }
    })
  } else {
    alert("取消成功");
  }
  getLeader();
  judgeTextarea(list);
}
function leaderNode(i) {
  var model = `<div class="list" title="${leaderData[i].id}">
                <div class="img" style="background-image:url(${serverUrl}/upload/${leaderData[i].images[0].filename})"></div>
                <input class="img-file" type="file" disabled="disabled" onchange="upFiles()">
                <textarea class="name" placeholder="姓名" disabled="disabled" maxlength="20">${leaderData[i].name}</textarea>
                <textarea class="position" placeholder="职位" disabled="disabled" maxlength="50">${leaderData[i].position}</textarea>
                <textarea class="description" placeholder="介绍" disabled="disabled" maxlength="200">${leaderData[i].description}</textarea>
                <img class="edit" src="image/修改.png" onclick="editable()">
                <img class="commit" src="image/确定.png" style="display: none;" onclick="updateLeader()">
              </div>`
  return model;
}

// 研究方向
function getField() {
  var data = {
    "page": "1",
    "pageSize": "2"
  }

  $.ajax({
    "url": serverUrl + "/field/list",
    "method": "POST",
    "headers": {
    "Content-Type":"application/x-www-form-urlencoded"
    },
    "data": data,
    "dataType": "json",
    "crossDomain": true
    })
  .done(function(response){
    console.log("研究方向",response);
    if (response.status == 200) {
      fieldData = response.data;
      fieldList.innerHTML = `
      <div class="subtitle">研究方向</div>
      <img class="rule" src="image/分割线.png" style="display:block; margin:0 auto; margin-bottom:2%; width:20%;">
      `;
      for (var i = 0; i < fieldData.length; i++) { 
        fieldList.innerHTML += fieldNode(i);
      }
    } else {
      alert(response.message);
    }
  })
  .fail(function(jqXHR){
    alert("【请求数据】服务器请求数据失败");
  })
}
function updateField() {
  var list = event.target.parentNode,
      id = list.title,
      name = list.getElementsByClassName('name')[0].value,
      description = list.getElementsByClassName('description')[0].value,
      front = list.getElementsByClassName('img-file')[0].files[0] || null;
      end = list.getElementsByClassName('img-file')[1].files[0] || null;
  

  console.log(front, end);
  if (!isNotNullTrim(name) || !isNotNullTrim(description)) {
    alert("输入不能为空");
    return;
  }

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("name", name);
  formdata.append("description", description);
  formdata.append("front", front);
  formdata.append("end", end);
  
  if (confirm("你确定要修改这些数据吗？")) {
    $.ajax({
      url: serverUrl + "/field/update",
      method: "POST",
      data: formdata,
      contentType: false,
      processData: false,
      dataType: "json",
      async: false,
      success: function (data) {

        if (data.status == 200) {
          alert ("修改成功");
        } else {
          alert(data.message);
        }
      }
    })
  } else {
    alert("取消成功");
  }
  getField();
  judgeTextarea(list);
}
function fieldNode(i) {
  var model = `<div class="list" title="${fieldData[i].id}">
                 <div class="img" style="background-image:url(${serverUrl}/upload/${fieldData[i].front})" title="前图">
                   <input class="img-file" type="file" disabled="disabled" onchange="upFiles()">
                 </div>
                 <div class="img" style="background-image:url(${serverUrl}/upload/${fieldData[i].end})" title="后图">
                   <input class="img-file" type="file" disabled="disabled" onchange="upFiles()">
                 </div> 
                 <textarea class="name" placeholder="名称" disabled="disabled" maxlength="30">${fieldData[i].name}</textarea>
                 <textarea class="description" placeholder="描述" disabled="disabled" maxlength="200">${fieldData[i].description}</textarea>
                 <img class="edit" src="image/修改.png" onclick="editable()">
                <img class="commit" src="image/确定.png" style="display: none;" onclick="updateField()">
               </div> `
  return model;
}

// 最近的荣誉
function getHonor() {
  var data = {
      "page": "1",
      "pageSize": 10
  }  

  $.ajax({
    "url": serverUrl + "/honor/list",
    "method": "POST",
    "headers": {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    "data": data,
    "dataType": "json",
    "crossDomain": true
  })
  .done(function(response){
    console.log("最近的荣誉",response);
    if (response.status == 200) {
      honorData = response.data;
      honorData.push({
        images: [""]
      });
      honorList.innerHTML = ``;
      for (var i = 0; i < honorData.length - 1; i++) { 
        // 插入文本数据
        honorList.innerHTML += honorNode(i);
        // 判断是否有图片，有则插入图片
        var honorImgList = honorList.getElementsByClassName('list')[i].getElementsByClassName('imgArr')[0];
        
        honorData[i].images.push("");
        if (honorData[i].images.length != 0) {
          for (var j = 0; j < honorData[i].images.length - 1; j++) {
            honorImgList.innerHTML += honorImgArr(i,j);
          }
        }
      }
    } else {
      alert(response.message);
    }
  })
  .fail(function(jqXHR){
    alert("【请求数据】服务器请求数据失败");
  })
}
function honorNode(i) {
  var model =  `<div id="${i}" class="list" title="${honorData[i].id || '*'}">
                 <img class="delete" src="image/×.png" style="top: 0.5rem" onclick="honorDelete()">
                 <textarea class="title" placeholder="标题" disabled="disabled" maxlength="50">${honorData[i].title || ""}</textarea>
                 <textarea class="date" placeholder="时间" disabled="disabled" maxlength="15">${honorData[i].date || ""}</textarea>
                 <textarea class="description" placeholder="描述" disabled="disabled" maxlength="200">${honorData[i].description || ""}</textarea>       
                 <div class="imgArr"></div>
                 <img class="add2" src="image/图片添加.png">
                 <img class="edit" src="image/修改.png" onclick="editable()">
                 <img class="commit" src="image/确定.png" style="display: none;" onclick="updateHonor()">
               </div>`
  return model;
}
function honorImgArr(i, j) {
  if (honorData[i].images[j] != "") {
    return `<div class="img" style="background-image:url(${serverUrl}/upload/${honorData[i].images[j].filename}">
                  <img class="imgDelete" src="image/×.png" title="删除" style="display:none" onclick="removeHonorImgClick()">
                  <input class="img-file" type="file" disabled="disabled" onchange="upFiles()" title="${honorData[i].images[j].id}">
                </div>`
  } else {
    return `<div class="img">
                  <img class="imgDelete" src="image/×.png" title="删除" onclick="removeHonorImgClick()">
                  <input class="img-file" type="file" onchange="upFiles()" title="*">
                </div>`
  }
}
// 删除
function honorDelete() {
  var list = event.target.parentNode;
  var data = {
      "honorId": list.title
  }
  if (list.title == -1) {
    honorList.removeChild(list);
    return;
  }  

  if(confirm("你确定要删除这个数据吗?")) {
    $.ajax({
     "url": serverUrl + "/honor/remove",
     "method": "POST",
     "headers": {
       "Content-Type":"application/x-www-form-urlencoded"
     },
     "data": data,
     "dataType": "json",
     "async": false,
     "crossDomain": true
     })
    .done(function(response){
      console.log("【删除】最近的荣誉",response);
      if(response.status == 200) {
        alert("删除成功");
      } else {
        alert(response.message);
      }
    })
    .fail(function(jqXHR){
      alert("服务器请求失败")
    })
  } else {
    alert("取消成功");
  }
  getHonor();
}
// 添加节点 
function addHonor() {
  honorList.insertAdjacentHTML("afterbegin", honorNode(honorData.length - 1));
  honorList.children[0].getElementsByClassName('commit')[0].setAttribute("onclick","addCommit()");
}
// 提交添加
function addCommit() {
  var list  = event.target.parentNode,
      title = list.getElementsByClassName('title')[0].value,
      description = list.getElementsByClassName('description')[0].value,
      date = list.getElementsByClassName('date')[0].value,
      fileNode = list.getElementsByClassName('img-file');

  var data = {
    title: title,
    date: date,
    description: description
  }
  
  var judge = false;
  for (var p in data) {
    if (isNotNullTrim(data[p])) {
      judge = true;
    }
  }
  if (!judge) {
    alert("输入不能全部为空。");
    return;
  }

  if (confirm("你确定添加这个数据吗？")) {
     $.ajax({
      "url": serverUrl + "/honor/insert",
      "method": "POST",
      "headers": {
        "Content-Type":"application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
      })
     .done(function(response){
        console.log("【最近的荣誉】文本添加",response);
        if (response.status == 200) {
          for(var j = 0; j < fileNode.length; j++) {
            if (fileNode[j].files[0]) {
              addHonorImg(response.data.id, fileNode[j].files[0]);
            }
          }
          alert("添加完成");
        } else {
          alert(response.message);
        }
      })
     .fail(function(jqXHR){
        alert("【最近的荣誉添加】服务器请求失败");
     })  
   } else {
    alert("取消成功");
   }
  getHonor();
  judgeTextarea(list);
}
// 修改
function updateHonor() {
  var list = event.target.parentNode,
      title = list.getElementsByClassName('title')[0].value,
      description = list.getElementsByClassName('description')[0].value,
      date = list.getElementsByClassName('date')[0].value,
      id = list.title,
      fileNode = list.getElementsByClassName('img-file');

  var data = {
    id: id,
    title: title,
    date: date,
    description: description
  }

  var judge = false;
  for (var p in data) {
    if (isNotNullTrim(data[p])) {
      judge = true;
    }
  }
  if (!judge) {
    alert("输入不能全部为空。");
    return;
  }

  if (confirm("你确定要修改这些数据吗？")) {
    $.ajax({
      "url": serverUrl + "/honor/update",
      "method": "POST",
      "headers": {
        "Content-Type":"application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
      })
     .done(function(response){
        console.log("【最近的荣誉】文本修改",response);
        if (response.status == 200) {
          // 删除图片
          for (var i = 0; i < removeHonorImgIdArr.length; i++) {
            console.log("要删除的图片id",removeHonorImgIdArr);
           removeHonorImg(removeHonorImgIdArr[i]);
          }
          removeHonorImgIdArr = [];
          // 替换和添加图片
          for(var j = 0; j < fileNode.length; j++) {
            if (fileNode[j].files[0]) {
              if (fileNode[j].title == "*") {
                addHonorImg(id, fileNode[j].files[0]);
              } else {
                replaceHonorImg(fileNode[j].title, fileNode[j].files[0]);
              }
            }
          }
          alert("修改完成");
        } else {
          alert(response.message);
        }
      })
     .fail(function(jqXHR){
        alert("【最近的荣誉修改】服务器请求失败");
     })
  } else {
    alert("取消成功");
  } 
  getHonor();
  judgeTextarea(list);
}
// 删除图片
    //删除图片按钮
var removeHonorImgIdArr = []; // 数组记录删除的id
function removeHonorImgClick() { 
  var imgDiv = event.target.parentNode;
  var imgId = imgDiv.getElementsByClassName('img-file')[0].title;
  
  imgDiv.parentNode.removeChild(imgDiv);
  if (imgId != "*") {
    removeHonorImgIdArr.push(imgId);
  }
}
    //提交删除图片
function removeHonorImg(imgId) {   
  var data = {
    "imageId": imgId
  }
 console.log("删除这张图片",imgId);
 $.ajax({
   "url": serverUrl + "/image/remove",
   "method": "POST",
   "headers": {
     "Content-Type":"application/x-www-form-urlencoded"
   },
   "data": data,
   "async": false,
   "dataType": "json",
   "crossDomain": true
   })
  .done(function(response){
    console.log("【最近的荣誉】删除图片",response);
  })
  .fail(function(jqXHR){})
}
// 添加图片
   // 添加图片按钮
function addHonorImgClick() {
  var list = event.target.parentNode;
  var i = list.id;
  var imgArr = list.getElementsByClassName('imgArr')[0];
  imgArr.insertAdjacentHTML('beforeend', honorImgArr(i, honorData[i].images.length - 1));
}  // 提及添加图片
function addHonorImg(id, file) {
  var formdata = new FormData();
  formdata.append("uploads", file);
  formdata.append("honorId", id);

 $.ajax({
    url: serverUrl + "/honor/upload",
    method: "POST",
    data: formdata,
    contentType: false,
    processData: false,
    dataType: "json",
    async: false,
    success: function (data) {
      console.log("【最近的荣誉】添加图片",data);
    }
  })
}
// 替换图片
    // 提交替换图片
function replaceHonorImg(imgId, file) {
  var formdata = new FormData();
  formdata.append("imageId", imgId);
  formdata.append("uploads", file);

 $.ajax({
    url: serverUrl + "/image/replace",
    method: "POST",
    data: formdata,
    contentType: false,
    processData: false,
    dataType: "json",
    async: false,
    success: function (data) {
      console.log("【最近的荣誉】替换图片",data);
    }
  })
}

// 文本域可编辑
function editable() {
  var list = event.target.parentNode;
  judgeTextarea(list);
}
function judgeTextarea(list) {
  var textareas = list.getElementsByTagName('textarea');
  var inputs = list.getElementsByTagName('input');
  var imgDeletes = list.getElementsByClassName('imgDelete');
  var imgAdd = list.getElementsByClassName('add2');

  if(textareas[0].getAttribute("disabled") == "disabled") {
    for (var i = 0; i < textareas.length; i++) {
      textareas[i].removeAttribute("disabled");
    }
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute("disabled");
    }
    if (imgDeletes.length != 0) {
      for (var i = 0; i < imgDeletes.length; i++) {
        imgDeletes[i].style.display = "block";
      }
    }
    if (imgAdd.length != 0) {
      imgAdd[0].setAttribute('onclick', 'addHonorImgClick()');
    }
    list.getElementsByClassName('commit')[0].style.display = "block";
    list.getElementsByClassName('edit')[0].style.display = "none"; 
  } else {
    for (var i = 0; i < textareas.length; i++) {
      textareas[i].setAttribute("disabled","disabled");
    }
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute("disabled","disabled");
    }
    if (imgDeletes.length != 0) {
      for (var i = 0; i < imgDeletes.length; i++) {
        imgDeletes[i].style.display = "none";
      }
    }
    if (imgAdd.length != 0) {
      imgAdd[0].removeAttribute('onclick');
    }
    list.getElementsByClassName('commit')[0].style.display = "none";
    list.getElementsByClassName('edit')[0].style.display = "block";  
  }
}
// 从本地选择图片
function upFiles() {
  var self = event.target;
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
  if (self.parentNode.getAttribute("class") == "img") {
    var img = self.parentNode;
  } else {
    var img = self.parentNode.getElementsByClassName("img")[0];
  }
  var fileRead = new FileReader();
  fileRead.readAsDataURL(file);
  fileRead.onload = function() {
    img.style.backgroundImage = "url(" + this.result + ")";
  }
}
// 非空验证
function isNotNullTrim(source){
  if(source != null && source != undefined && source != 'undefined' && $.trim(source) != "")
    return true;
    return false;
}

// 页面初始化
(function() {

  getMoment();
  getLeader();
  getField();
  getHonor();

  var imgDelete = document.getElementsByClassName('imgDelete');
  for (var i = 0; i < imgDelete.length; i++) {
    imgDelete[i].style.display = "none";
  }

})();

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








