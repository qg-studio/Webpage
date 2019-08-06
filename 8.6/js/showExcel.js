/*
FileReader共有4种读取方法：
1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
2.readAsBinaryString(file)：将文件读取为二进制字符串
3.readAsDataURL(file)：将文件读取为Data URL
4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
*/
var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串

function importf(obj) {//导入
if(!obj.files) {
return;
}
var f = obj.files[0];
var reader = new FileReader();
reader.onload = function(e) {
// console.log(e.target.result);
if(rABS) {
wb = XLSX.read(btoa(fixdata(e.target.result)), {//手动转化
type: 'base64'
});
} else {
wb = XLSX.read(e.target.result, {
type: 'binary'
});
}
//wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
//wb.Sheets[Sheet名]获取第一个Sheet的数据
var data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
console.log(data);
var keyAry = [];
// 遍历json对象，获取每一列的键名
for(var key in data[1]){
keyAry.push(key);
}
// 清除上次渲染的表格
$("#demo").empty();
// 设置表格头
$(`<thead><tr><th colspan=${keyAry.length}>${keyAry[0]}</th></tr></thead>`).appendTo($("#demo"));
for(var d of data){
// 通过循环,每有一条数据添加一行表格
var tr = $("<tr></tr>");
for(var n = 0;n< keyAry.length;n++){
// 根据keyAry数组的长度,创建每一行表格中的td
$("<td></td>").html(" ").addClass(keyAry[n]).appendTo(tr);
}
// 遍历对象,根据键名找到是哪一列的数据,给对应的td添加内容
for(k in d){
// (tr[0].children[keyAry.indexOf(k)])
$(tr[0].children[keyAry.indexOf(k)]).html(d[k]);
}
tr.appendTo($("#demo"));
}
}
if(rABS) {
reader.readAsArrayBuffer(f);
} else {
reader.readAsBinaryString(f);
}
}

function fixdata(data) { //文件流转BinaryStrings
var o = "",
l = 0,
w = 10240;
jsArry=[];
for(; l < data.byteLength / w; ++l) jsArry.push(String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w))));
return jsArry;
}
