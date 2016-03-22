/**
 * Created by 安超 on 2016/3/23.
 */
(function(){
    "use strict";

    var inputZone = document.getElementById("inputZone");
    var leftOut = document.getElementById("leftOut");
    var rightOut = document.getElementById("rightOut");
    var leftIn = document.getElementById("leftIn");
    var rightIn = document.getElementById("rightIn");
    var container = document.getElementById("display").firstElementChild;
    var inputSearch = document.getElementById("input-search");
    var search = document.getElementById("search");

    function addEvent(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }

   //取出内容的函数
    function getContent(){
        var value = inputZone.value;
        var array = value.split(/[,，、 \n\t\r]+/);
        var finalArray = [];

        for(var i= 0, len=array.length; i<len; i++){
            if(array[i].trim() !== ""){
                finalArray.push(array[i]);
            }
        }

        if(finalArray.length){
            return finalArray;
        }else {
            alert("您的输入里没有可提取的内容！");
            return false;
        }
    }

    //点击哪个哪个就消失
    function hide(ev){
        var event = ev || window.event;
        var obj = event.srcElement ? event.srcElement:event.target;

        if(obj.nodeName.toLowerCase() === "li"){
            container.removeChild(obj);
        }
    }

    //左出
    function leftPop(){
            if(container.childElementCount !== 0){
                alert(container.firstElementChild.innerText);
                container.removeChild(container.firstElementChild);
            }else {
                alert("队列都空了！");
            }
        }
    //右出
    function rightPop(){
            if(container.childElementCount !== 0){
                alert(container.lastElementChild.innerText);
                container.removeChild(container.lastElementChild);
            }else {
                alert("队列都空了！");
            }
        }
    //左入
    function leftPush(){
        var value = getContent();
        if (value.length){
            var fragment = document.createDocumentFragment();

            for (var i= 0, len=value.length; i<len; i++){
                var li = document.createElement("li");
                li.innerHTML = value[i];
                fragment.appendChild(li);
            }

            container.insertBefore(fragment, container.firstElementChild);
        }else {
            return false;
        }
    }
    //右入
    function rightPush(){
        var value = getContent();
        if (value.length){
            var fragment = document.createDocumentFragment();

            for (var i= 0, len=value.length; i<len; i++){
                var li = document.createElement("li");
                li.innerHTML = value[i];
                fragment.appendChild(li);
            }

            container.appendChild(fragment);
        }else {
            return false;
        }
    }

    //查询函数
    function searchFn(){
        var inputSearchContent = inputSearch.value;
        if (inputSearchContent === ""){
            alert("您还尚未输入！");
        }else {
            var liList = container.getElementsByTagName("li");
            for(var i= 0, len=liList.length; i<len; i++){
                if(inputSearchContent.indexOf(liList[i].innerText) > -1){
                    liList[i].style.backgroundColor = "#aaaaaa";
                }else {
                    liList[i].style.backgroundColor = "gold";
                }
            }
        }
    }

    addEvent(leftIn, "click", leftPush);
    addEvent(leftOut, "click", leftPop);
    addEvent(rightIn, "click", rightPush);
    addEvent(rightOut, "click", rightPop);
    addEvent(container, "click", function(){hide()});
    addEvent(search, "click", searchFn);
})();

