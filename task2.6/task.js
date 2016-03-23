/**
 * Created by 安超 on 2016/3/23.
 */
"use strict";
(function(){
    var figureContainer = document.getElementById("display").firstElementChild;
    var inputBox = document.getElementsByClassName("input-box")[0];
    var leftPush = document.getElementById("leftPush");
    var leftPop = document.getElementById("leftPop");
    var rightPush = document.getElementById("rightPush");
    var rightPop = document.getElementById("rightPop");

    //点击队列中任何一个元素，则该元素会被从队列中删除
    figureContainer.onclick = function(event){
        var ev = event || window.event;

        if(ev.target.nodeName.toLowerCase() === "li"){
            alert(ev.target.innerText);
            this.removeChild(ev.target);
        }
    }

    leftPop.onclick = function(){
        if(figureContainer.childElementCount !== 0){
            var firstEle = figureContainer.firstElementChild;
            alert(firstEle.innerText);
            figureContainer.removeChild(firstEle);
        }else {
            alert("没有可以出的数啦");
        }
    };

    leftPush.onclick = function(){
        var inputText = inputBox.value;
        if(/^\d+$/.test(inputText)){
            var li = document.createElement("li");
            li.innerHTML = inputText;
            figureContainer.insertBefore(li, figureContainer.firstElementChild);
        }else {
            alert("输入有误！")
        }
    };

    rightPop.onclick = function(){
        if(figureContainer.childElementCount !==0){
            var lastEle = figureContainer.lastElementChild;
            alert(lastEle.innerText);
            figureContainer.removeChild(lastEle);
        }else {
            alert("没有可出的数啦");
        }
    };

    rightPush.onclick = function(){
        var inputText = inputBox.value;
        if(/^\d+$/.test(inputText)){
            var li = document.createElement("li");
            li.innerHTML = inputText;
            figureContainer.appendChild(li);
        }else {
            alert("输入有误！")
        }
    };
})();
