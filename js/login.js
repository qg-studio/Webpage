$(function() {
    $("button:eq(0)").click(function() {
       $.post("LoginServlet", {
            name: $("input:eq(0)").val(),
            pass: $("input:eq(1)").val()
       }, function(data, textStatus) {
            alert(data);
       })
    });
});