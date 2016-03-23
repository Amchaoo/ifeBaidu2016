/**
 * Created by 安超 on 2016/3/23.
 */
"use strict";
(function() {
    var figureContainer = document.getElementById("display").firstElementChild;
    var inputBox = document.getElementsByClassName("input-box")[0];
    var leftPush = document.getElementById("leftPush");
    var leftPop = document.getElementById("leftPop");
    var rightPush = document.getElementById("rightPush");
    var rightPop = document.getElementById("rightPop");
    var random50 = document.getElementById("charge").getElementsByClassName("random-50")[0];
    var sort = document.getElementById("sort");
    var queue = [];
    var time = 100;
    var now;

    //检查输入
    function checkInput() {
        var value = inputBox.value;
        if (Number(value) >= 10 && Number(value) <= 100) {
            return Number(value);
        } else {
            alert("输入有误");
            return false;
        }
    }

    //检查数量限制
    function checkAmount() {
        if (figureContainer.childElementCount === 60) {
            alert("不能超过60个啊");
            return false;
        } else {
            return true;
        }
    }

    //从左侧出
    function leftOut() {
        if (figureContainer.childElementCount !== 0) {
            figureContainer.removeChild(figureContainer.firstElementChild);
            queue.shift();
        } else {
            alert("队列已空");
        }
    }

    //从右侧出
    function rightOut() {
        if (figureContainer.childElementCount !== 0) {
            figureContainer.removeChild(figureContainer.lastElementChild);
            queue.pop()
        } else {
            alert("队列已空");
        }
    }

    //从左侧入
    function leftIn() {
        var text = checkInput();
        if (text && checkAmount()) {
            var li = document.createElement("li");
            li.style.height = text * 5 + "px";
            figureContainer.insertBefore(li, figureContainer.firstElementChild);
            queue.unshift(text);
        }
    }

    //从右侧入
    function rightIn() {
        var text = checkInput();
        if (text && checkAmount()) {
            var li = document.createElement("li");
            li.style.height = text * 5 + "px";
            figureContainer.appendChild(li);
            queue.push(text);
        }
    }

    //随机生成50个li
    function randomLiList() {
        figureContainer.innerHTML = "";
        queue = [];
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < 50; i++) {
            var value = 10 + parseInt(90 * Math.random());
            var li = document.createElement("li");
            li.style.height = value * 5 + "px";
            fragment.appendChild(li);
            queue.push(value);
        }

        figureContainer.appendChild(fragment);
    }

    //快速排序
    function quickSort(arr, left, right) {
        var list = figureContainer.getElementsByTagName("li");

        if (right - left >= 1) {
            var
                i = left,
                j = right,
                k = arr[i],
                temp;
            while (i != j) {
                for (; j>i; j--){
                if (arr[j] < k) {
                    temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                    list[i].style.height = arr[i] * 5 + "px";
                    list[j].style.height = arr[j] * 5 + "px";
                    break;
                }
            }

            for (; j > i; i++) {
                if (arr[i] > k) {
                    temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;


                    list[i].style.height = arr[i] * 5 + "px";
                    list[j].style.height = arr[j] * 5 + "px";
                    break;
                }
            }
        }

        setTimeout(function(){
            arr = quickSort(arr, left, i - 1);
            arr = quickSort(arr, i + 1, right);
        }, 200);
    }

        return arr;
    }

    //对li元素排序
    function sortLi(){
        quickSort(queue, 0, queue.length);
    }

    //添加各种事件
    leftPush.addEventListener("click", leftIn);
    leftPop.addEventListener("click", leftOut);
    rightPush.addEventListener("click", rightIn);
    rightPop.addEventListener("click", rightOut);
    random50.addEventListener("click", randomLiList);
    sort.addEventListener("click", sortLi)
})();
