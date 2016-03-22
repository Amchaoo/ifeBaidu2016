/**
 * Created by 安超 on 2016/3/23.
 */
(function(){
    "use strict";

    var tagContainer = document.getElementById("tagContainer");
    var inputTag = document.getElementById("inputTag");
    var inputInterest = document.getElementById("inputInterest");
    var confirmInterest = document.getElementById("confirmInterest");
    var interestContainer = document.getElementById("interestContainer");

    //判断标签中是否已经含有
    function hasLabel(label, container){
        var liList = container.getElementsByTagName("li");
        for(var i= 0, len=liList.length; i<len; i++){
            if(liList[i].innerHTML === label){
                return true;
            }
        }
        return false;
    }

    //事件的兼容函数
    function addEvent(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }

    //数组去重
    Array.prototype.unique = function(){
        var json = {};
        var uniqueArray = [];
        for(var i= 0, len1=this.length; i<len1; i++){
            if(json[this[i]] !== 1){
                uniqueArray.push(this[i]);
                json[this[i]] = 1;
            }
        }

        var len2=uniqueArray.length;
        this.length = len2;
        for(var j= 0; j<len2; j++){
            this[j] = uniqueArray[j];
        }
    };

   //取出内容的函数
    function getContent(inputZone){
        var value = inputZone.value;
        var array = value.split(/[,，、 \n\t\r]+/);
        var finalArray = [];

        for(var i= 0, len=array.length; i<len; i++){
            if(array[i].trim() !== ""){
                finalArray.push(array[i]);
            }
        }

        if(finalArray.length){
            finalArray.unique();
            return finalArray;
        }else {
            alert("您的输入里没有可提取的内容！");
            return false;
        }
    }

    //点击哪个哪个就消失
    function hover(ev){
        var event = ev || window.event;
        var obj = event.srcElement ? event.srcElement:event.target;

        if(obj.nodeName.toLowerCase() === "li"){
            var inner = obj.innerHTML;
            obj.innerHTML = "删除" +inner;
            obj.style.backgroundColor = "red";

            addEvent(obj, "mouseout", function(){
                obj.innerHTML = inner;
                obj.style.backgroundColor = "gold";
            });
            addEvent(obj, "click", function(){
                tagContainer.removeChild(obj);
            });
        }
    }

    //插入标签
    function push(container, inputZone){
        var value = getContent(inputZone);
        if (value.length){
            var fragment = document.createDocumentFragment();

            for (var i= 0, len=value.length; i<len; i++){
                if(!hasLabel(value[i], container)){
                    var li = document.createElement("li");
                    li.innerHTML = value[i];
                    fragment.appendChild(li);
                }
            }

            container.appendChild(fragment);

            var liList = container.getElementsByTagName("li");
            //保留后10个
            if(liList.length > 10){
                var diff = liList.length - 10;
                for(var j=0; j<diff; j++){
                    container.removeChild(container.firstElementChild);
                }
            }
            //清空输入框
            inputZone.value = "";
        }else {
            return false;
        }
    }

    //绑定事件
    addEvent(tagContainer, "mouseover", function(){hover(event);});

    addEvent(confirmInterest, "click", function(){
        push(interestContainer, inputInterest);
    });

    addEvent(inputTag, "keydown", function(){
        var ev = event || window.event;
        if(ev.keyCode === 13){
            push(tagContainer, inputTag);
        }
    });
})();
