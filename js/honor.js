var serverUrl = "http://www.cxkball.club:2333",
  awardData = [],
  awardPage = 1,
  newsData = [],
  newsPage = 1,
  patentData = [],
  patentPage = 1,
  copyrightData = [],
  copyrightPage = 1,
  PageSize = 3;


//奖项
// 请求数据
function getAward() {
  var data = {
    "page": awardPage,
    "pageSize": PageSize
  }
  $.ajax({
    "url": serverUrl + "/award/list",
    "method": "POST",
    "dataType": "json",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": data,
    "crossDomain": true
  })
    .done(function (response) {
      if (response.status == 200) {
        console.log("奖项", response);
        awardData = response.data.data;
        awardData.push({});
        updataAward();
        creatPage(response.data.page, "award");
      } else {
        alert(response.message);
      }
    })
    .fail(function (jqXHR) {
      alert(jqXHR.message);
    })
}

// 插入数据
function updataAward() {
  var awardMain = document.getElementsByClassName("award-main")[0];
  awardMain.innerHTML = "";
  for (var i = 0; i < awardData.length - 1; i++) {
    awardMain.innerHTML += awardNode(i);
  }
}
// 节点结构 
function awardNode(j) {
  var model = `<div class="award-list list" title="${awardData[j].id || ""}">
                 <textarea style="width: 3rem" disabled="disabled">${(awardPage - 1) * PageSize + j + 1}</textarea>
                 <textarea style="width: 4rem" disabled="disabled">${awardData[j].project || ""}</textarea>
                 <textarea style="width: 4rem" disabled="disabled">${awardData[j].game || ""}</textarea>
                 <textarea style="width: 5rem" disabled="disabled">${awardData[j].date || ""}</textarea>
                 <textarea style="width: 4rem" disabled="disabled">${awardData[j].level || ""}</textarea>
                 <textarea style="width: 3rem" disabled="disabled">${awardData[j].prize || ""}</textarea>
                 <textarea style="width: 8rem" disabled="disabled">${awardData[j].institution || ""}</textarea>
                 <textarea style="width: 6rem" disabled="disabled">${awardData[j].winner || ""}</textarea>
                 <textarea style="width: 4rem" disabled="disabled">${awardData[j].leader || ""}</textarea>
                 <img src="image/修改.png" style="right: 2rem" onclick="editable()">
                 <img src="image/确定.png" style="display: none; right:2rem" onclick="awardModify(getAward)">
                 <img src="image/删除.png" style="right: 0rem" onclick="awardDelete()">
               </div>`
  return model;
}
// 修改
function awardModify(getFun) {
  var list = event.target.parentNode;
  var textareas = list.getElementsByTagName('textarea');
  var data = {
    project: textareas[1].value,
    game: textareas[2].value,
    date: textareas[3].value,
    level: textareas[4].value,
    prize: textareas[5].value,
    institution: textareas[6].value,
    winner: textareas[7].value,
    leader: textareas[8].value,
    id: list.title,
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
  if (confirm("你确定修改这些数据吗?")) {

    $.ajax({
      "url": serverUrl + "/award/update",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        if (response.status == 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getFun();
  judgeTextarea(list);
  event.target.style.display = "none";
  list.getElementsByTagName('img')[0].style.display = "block";
}
// 删除
function awardDelete() {
  var list = event.target.parentNode;
  var data = {
    "awardId": list.title
  }
  if (list.title == "") {
    getAward();
    return;
  }
  if (confirm("你确定删除这些数据吗?")) {


    $.ajax({
      "url": serverUrl + "/award/remove",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": data,
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        console.log("删除", response);
        if (response.status == 200) {
          if (awardData.length == 2) {
            awardPage--;
          }
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getAward();
}
// 添加
function awardAdd() {
  var awardMain = event.target.parentNode.getElementsByClassName("award-main")[0];
  if (awardMain.children.length == awardData.length) {
    return;
  }
  awardMain.innerHTML += awardNode(awardData.length - 1);
  awardMain.lastElementChild.getElementsByTagName('img')[1].setAttribute("onclick", "awardAddCommit()");
}
function awardAddCommit() {
  var list = event.target.parentNode;
  var textareas = list.getElementsByTagName('textarea');
  var data = {
    project: textareas[1].value,
    game: textareas[2].value,
    date: textareas[3].value,
    level: textareas[4].value,
    prize: textareas[5].value,
    institution: textareas[6].value,
    winner: textareas[7].value,
    leader: textareas[8].value,
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
  if (confirm("你确定添加这个数据吗?")) {
    $.ajax({
      "url": serverUrl + "/award/insert",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        console.log("添加", response)
        if (response.status == 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getAward();
}

//——————————————————————————————————————————————————————————————————————————————————————————————————————————————//
//——————————————————————————————————————————————————————————————————————————————————————————————————————————————//
//——————————————————————————————————————————————————————————————————————————————————————————————————————————————//

//新闻
// 请求数据
function getNews() {
  var data = {
    "page": newsPage,
    "pageSize": PageSize
  }
  $.ajax({
    "url": serverUrl + "/news/list",
    "method": "POST",
    "dataType": "json",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": data,
    "crossDomain": true
  })
    .done(function (response) {
      if (response.status == 200) {
        console.log("新闻链接", response);
        newsData = response.data.data;
        newsData.push({});
        updataNews();
        creatPage(response.data.page, "news");
      } else {
        alert(response.message);
      }
    })
    .fail(function (jqXHR) {
      alert(jqXHR.message);
    })
}
// 插入数据
function updataNews() {
  var newsMain = document.getElementsByClassName("news-main")[0];
  newsMain.innerHTML = "";
  for (var i = 0; i < newsData.length - 1; i++) {
    newsMain.innerHTML += newsNode(i);
  }
}
// 节点结构 
function newsNode(j) {
  var model = `<div class="news-list list" title="${newsData[j].id || ""}">
                <textarea style="width: 3rem" disabled="disabled">${(newsPage - 1) * PageSize + j + 1}</textarea>
                <textarea style="width: 20rem" disabled="disabled">${newsData[j].title || ""}</textarea>
                <textarea style="width: 24rem" disabled="disabled">${newsData[j].url || ""}</textarea>
                <img src="image/修改.png" style="right: 2rem" onclick="editable()">
                <img src="image/确定.png" style="display: none; right:2rem" onclick="newsModify(getNews)">
                <img src="image/删除.png" style="right: 0rem" onclick="newsDelete()">
              </div> `
  return model;
}
// 修改
function newsModify(getFun) {
  var list = event.target.parentNode;
  var textareas = list.getElementsByTagName('textarea');
  var data = {
    title: textareas[1].value,
    url: textareas[2].value,
    id: list.title,
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
  if (confirm("你确定修改这些数据吗?")) {

    $.ajax({
      "url": serverUrl + "/news/update",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        if (response.status == 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getFun();
  judgeTextarea(list);
  event.target.style.display = "none";
  list.getElementsByTagName('img')[0].style.display = "block";
}
// 删除
function newsDelete() {
  var list = event.target.parentNode;
  var data = {
    "newsId": list.title
  }
  if (list.title == "") {
    getNews();
    return;
  }
  if (confirm("你确定删除这些数据吗?")) {


    $.ajax({
      "url": serverUrl + "/news/remove",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": data,
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        console.log("删除", response);
        if (response.status == 200) {
          if (newsData.length == 2) {
            newsPage--;
          }
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getNews();
}
// 添加
function newsAdd() {
  var main = event.target.parentNode.getElementsByClassName("news-main")[0];
  if (main.children.length == newsData.length) {
    return;
  }
  main.innerHTML += newsNode(newsData.length - 1);
  main.lastElementChild.getElementsByTagName('img')[1].setAttribute("onclick", "newsAddCommit()");
}
function newsAddCommit() {
  var list = event.target.parentNode;
  var textareas = list.getElementsByTagName('textarea');
  var data = {
    title: textareas[1].value,
    url: textareas[2].value,
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
  if (confirm("你确定添加这个数据吗?")) {
    $.ajax({
      "url": serverUrl + "/news/insert",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        console.log("添加", response)
        if (response.status == 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getNews();
}





// 专利
// 请求数据
function getPatent() {
  var data = {
    "page": patentPage,
    "pageSize": PageSize
  }
  $.ajax({
    "url": serverUrl + "/patent/list",
    "method": "POST",
    "dataType": "json",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": data,
    "crossDomain": true
  })
    .done(function (response) {
      if (response.status == 200) {
        console.log("专利", response);
        patentData = response.data.data;
        patentData.push({});
        updataPatent();
        creatPage(response.data.page, "patent");
      } else {
        alert(response.message);
      }
    })
    .fail(function (jqXHR) {
      alert(jqXHR.message);
    })
}
// 插入数据
function updataPatent() {
  var main = document.getElementsByClassName("patent-main")[0];
  main.innerHTML = "";
  for (var i = 0; i < patentData.length - 1; i++) {
    main.innerHTML += patentNode(i);
  }
}
// 节点结构 
function patentNode(j) {
  var model = `<div class="patent-list list" title="${patentData[j].id || ""}">
                <textarea style="width: 3rem" disabled="disabled">${(patentPage - 1) * PageSize + j + 1}</textarea>
                <textarea style="width: 8rem" disabled="disabled">${patentData[j].type || ""}</textarea>
                <textarea style="width: 11rem" disabled="disabled">${patentData[j].name || ""}</textarea>
                <textarea style="width: 10rem" disabled="disabled">${patentData[j].zl || ""}</textarea>
                <textarea style="width: 13rem" disabled="disabled">${patentData[j].inventor || ""}</textarea>
                <img src="image/修改.png" style="right: 2rem" onclick="editable()">
                <img src="image/确定.png" style="display: none; right:2rem" onclick="patentModify(getPatent)">
                <img src="image/删除.png" style="right: 0rem" onclick="patentDelete()">
              </div>`
  return model;
}
// 修改
function patentModify(getFun) {
  var list = event.target.parentNode;
  var textareas = list.getElementsByTagName('textarea');
  var data = {
    name: textareas[1].value,
    type: textareas[2].value,
    zl: textareas[3].value,
    inventor: textareas[4].value,
    id: list.title,
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
  if (confirm("你确定修改这些数据吗?")) {

    $.ajax({
      "url": serverUrl + "/patent/update",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        if (response.status == 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getFun();
  judgeTextarea(list);
  event.target.style.display = "none";
  list.getElementsByTagName('img')[0].style.display = "block";
}
// 删除
function patentDelete() {
  var list = event.target.parentNode;
  var data = {
    "patentId": list.title
  }
  if (list.title == "") {
    getPatent();
    return;
  }

  if (confirm("你确定删除这些数据吗?")) {


    $.ajax({
      "url": serverUrl + "/patent/remove",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": data,
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {

        console.log("删除", response);
        if (response.status == 200) {
          if (patentData.length == 2) {
            patentPage--;
          }
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getPatent();
}
// 添加
function patentAdd() {
  var main = event.target.parentNode.getElementsByClassName("patent-main")[0];
  if (main.children.length == patentData.length) {
    return;
  }
  main.innerHTML += patentNode(patentData.length - 1);
  main.lastElementChild.getElementsByTagName('img')[1].setAttribute("onclick", "patentAddCommit()");
}
function patentAddCommit() {
  var list = event.target.parentNode;
  var textareas = list.getElementsByTagName('textarea');
  var data = {
    type: textareas[1].value,
    name: textareas[2].value,
    zl: textareas[3].value,
    inventor: textareas[4].value,
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
  if (confirm("你确定添加这个数据吗?")) {
    $.ajax({
      "url": serverUrl + "/patent/insert",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        console.log("添加", response)
        if (response.status == 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getPatent();
}





// 软著
// 请求数据
function getCopyright() {
  var data = {
    "page": copyrightPage,
    "pageSize": PageSize
  }
  $.ajax({
    "url": serverUrl + "/copyright/list",
    "method": "POST",
    "dataType": "json",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": data,
    "crossDomain": true
  })
    .done(function (response) {
      if (response.status == 200) {
        console.log("软著", response);
        copyrightData = response.data.data;
        copyrightData.push({});
        updataCopyright();
        creatPage(response.data.page, "copyright");
      } else {
        alert(response.message);
      }
    })
    .fail(function (jqXHR) {
      alert(jqXHR.message);
    })
}
// 插入数据
function updataCopyright() {
  var main = document.getElementsByClassName("copyright-main")[0];
  main.innerHTML = "";
  for (var i = 0; i < copyrightData.length - 1; i++) {
    main.innerHTML += copyrightNode(i);
  }
}
// 节点结构 
function copyrightNode(j) {
  var model = `<div class="copyright-list list" title="${copyrightData[j].id || ""}">
                <textarea style="width: 4rem" disabled="disabled">${(copyrightPage - 1) * PageSize + j + 1}</textarea>
                <textarea style="width: 16rem" disabled="disabled">${copyrightData[j].name || ""}</textarea>
                <textarea style="width: 10rem" disabled="disabled">${copyrightData[j].rn || ""}</textarea>
                <textarea style="width: 16rem" disabled="disabled">${copyrightData[j].date || ""}</textarea>
                <img src="image/修改.png" style="right: 2rem" onclick="editable()">
                <img src="image/确定.png" style="display: none; right:2rem" onclick="copyrightModify(getCopyright)">
                <img src="image/删除.png" style="right: 0rem" onclick="copyrightDelete()">
              </div>`
  return model;
}
// 修改
function copyrightModify(getFun) {
  var list = event.target.parentNode;
  var textareas = list.getElementsByTagName('textarea');
  var data = {
    name: textareas[1].value,
    rn: textareas[2].value,
    date: textareas[3].value,
    id: list.title,
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
  if (confirm("你确定修改这些数据吗?")) {

    $.ajax({
      "url": serverUrl + "/copyright/update",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        if (response.status == 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getFun();
  judgeTextarea(list);
  event.target.style.display = "none";
  list.getElementsByTagName('img')[0].style.display = "block";
}
// 删除
function copyrightDelete() {
  var list = event.target.parentNode;
  var data = {
    "copyrightId": list.title
  }
  if (list.title == "") {
    getCopyright();
    return;
  }

  if (confirm("你确定删除这些数据吗?")) {


    $.ajax({
      "url": serverUrl + "/copyright/remove",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": data,
      "dataType": "json",
      "async": false,

      "crossDomain": true
    })
      .done(function (response) {
        console.log("删除", response);
        if (response.status == 200) {
          if (copyrightData.length == 2) {
            copyrightPage--;
          }
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getCopyright();
}
// 添加
function copyrightAdd() {
  var main = event.target.parentNode.getElementsByClassName("copyright-main")[0];
  if (main.children.length == copyrightData.length) {
    return;
  }
  main.innerHTML += copyrightNode(copyrightData.length - 1);
  main.lastElementChild.getElementsByTagName('img')[1].setAttribute("onclick", "copyrightAddCommit()");
}
function copyrightAddCommit() {
  var list = event.target.parentNode;
  var textareas = list.getElementsByTagName('textarea');
  var data = {
    name: textareas[1].value,
    rn: textareas[2].value,
    date: textareas[3].value,
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
  if (confirm("你确定添加这个数据吗?")) {
    $.ajax({
      "url": serverUrl + "/copyright/insert",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
      "dataType": "json",
      "async": false,
      "crossDomain": true
    })
      .done(function (response) {
        console.log("添加", response)
        if (response.status == 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .fail(function (jqXHR) {
        alert(jqXHR.message);
      })
  } else {
    alert("取消成功");
  }
  getCopyright();
}






// 非空验证
function isNotNullTrim(source) {
  if (source != null && source != undefined && source != 'undefined' && $.trim(source) != "")
    return true;
  return false;
}
// 可编辑
function editable() {
  var list = event.target.parentNode;
  event.target.style.display = "none";
  list.getElementsByTagName('img')[1].style.display = "block";
  judgeTextarea(list);
}
// 文本域是否可输入
function judgeTextarea(list) {
  var textareas = list.getElementsByTagName('textarea');
  if (textareas[0].getAttribute("disabled") == "disabled") {
    for (var i = 1; i < textareas.length; i++) {
      textareas[i].removeAttribute("disabled");
    }
  } else {
    for (var i = 1; i < textareas.length; i++) {
      textareas[i].setAttribute("disabled", "disabled");
    }
  }
}
// 生成页数
function creatPage(pageLength, str) {
  var pageList = document.getElementsByClassName(str)[0].getElementsByClassName('page')[0];
  pageList.innerHTML = "";
  for (var i = 0; i < pageLength; i++) {
    pageList.innerHTML += `<li onclick="pageClick('${str}')">${i + 1}</li>`;
  }
}
// 页数点击
function pageClick(str) {
  if (str == "award") {
    awardPage = event.target.innerText;
    getAward();
  } else if (str == "news") {
    newsPage = event.target.innerText;
    getNews();
  } else if (str == "patent") {
    patentPage = event.target.innerText;
    getPatent();
  } else if (str == "copyright") {
    copyrightPage = event.target.innerText;
    getCopyright();
  }
}
getAward();
getNews();
getPatent();
getCopyright();