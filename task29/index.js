/**
 * Created by 安超 on 2016/3/26.
 */
(function(){
    var inputBox = document.getElementById("input-text");
    var checkBtn = document.getElementById("btn");
    var tip = document.getElementById("tip");

    var chineseReg = /[\u4e00-\u9fa5]/g;

    checkBtn.onclick = function(){
        var inputText = inputBox.value.trim();
        var increase = inputText.match(chineseReg);
        var len = increase.length + increase.length;

        if(inputText === ""){
            tip.style.color = "red";
            tip.innerHTML = "输入不能为空!";
            inputBox.borderColor = "red";
        }else if(len >= 4 && len <= 16){
            tip.style.color = "green";
            tip.innerHTML = "输入名字合法！";
        }else{
            tip.style.color = "red";
            inputBox.borderColor = "red";
            tip.innerHTML = "输入名字不合法";
        }
    }
})();