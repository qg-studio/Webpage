var serverUrl = "http://www.cxkball.club:2333";
var judeg = /[\w_]{6,20}$/;
var storage = window.localStorage;

$(function() {
     var storage = window.localStorage;
     if("yes" == storage["isstorename"]){
         $("#remembrMe").attr("checked", true);
         $("#username").val(storage["username"]);
     }
    $("#username").focus(function() {
        $("#username").val("");
        $(".judge")[0].innerHTML = "请输入6-20位字母或数字";
    })
    $("#password").focus(function() {
        $("#password").val("");
        $(".judge")[1].innerHTML = "请输入6-20位字母或数字";
    })
    $("#username").blur(function() {
        $(".judge")[0].innerHTML = "";
    })
    $("#password").blur(function() {
        $(".judge")[1].innerHTML = "";
    })  
    $("#button").click(function() {
        var data = {
        	username: $("#username").val(),
        	password: $("#password").val()
        };
        if (!isNotNullTrim(data.username)) {
            $(".judge")[0].innerHTML = "<font>输入不能为空</font>";
            return;
        }
        if (!isNotNullTrim(data.password)) {
            $(".judge")[1].innerHTML = "<font>输入不能为空</font>";
            return;
        }
        if (!judeg.test($("input:eq(0)").val())) {
            $(".judge")[0].innerHTML = "<font>用户名格式不正确</font>";
            return ;
        }
        if (!judeg.test($("input:eq(1)").val())) {
            $(".judge")[1].innerHTML = "<font>密码格式不正确</font>";
            return ;
        }
        if($("#remembrMe").is(':checked')){
            storage["username"] = $("#username").val();
            storage["isstorename"] =  "yes"; 
        }else{
            storage["username"] = "";
            storage["isstorename"] =  "no"; 
        }
        $.ajax({
      	     type: "POST",
      	     url:  serverUrl + "/user/login",
      	     dataType: "json",
      	     contentType: "application/json",
      	     data: JSON.stringify(data),
      	     success: function(data) {
                console.log(data);
                if (data.status == 200) {
                    window.location.href = serverUrl + "/about-qg.html";
      	         } else {
                    alert(data.message);
                    $("input").val("");
                }
      	    } 
        })   
    });
    $("body").bind("keydown",function(e){
　　var theEvent = e || window.event;
    　　var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    　　 if (code == 13) {
    　　$("button:eq(0)").click();
    　　}
    });
});
function isNotNullTrim(source){
    if(source != null && source != undefined && source != 'undefined' && $.trim(source) != "")
        return true;
        return false;
}


