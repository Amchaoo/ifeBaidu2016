/**
 * Created by 安超 on 2016/3/22.
 */
"use strict";
(function(){
    var preBtn = document.getElementById("pre");
    var inBtn = document.getElementById("in");
    var postBtn = document.getElementById("post");
    var root = document.getElementById("root");
    var queue = [];
    var timer = null;//定时器
    var current = null; //现在正在变色的

    //前序函数
    function preOrder(node){
        queue.push(node);
        node.firstElementChild ? preOrder(node.firstElementChild) : null;
        node.lastElementChild ? preOrder(node.lastElementChild) : null;
    }

    //中序遍历
    function inOrder(node){
        node.firstElementChild ? inOrder(node.firstElementChild) : null;
        queue.push(node);
        node.lastElementChild ? inOrder(node.lastElementChild) : null;
    }

    //后序遍历
    function postOrder(node){
        node.firstElementChild ? postOrder(node.firstElementChild) : null;
        node.lastElementChild ? postOrder(node.lastElementChild) : null;
        queue.push(node);
    }

    //运动函数
    function move(){
        clearInterval(timer);
        var len = queue.length;
        var i = 0;

        queue[0].style.borderColor = "red";
        timer = setInterval(function(){
            if(i<len-1){
                queue[i].style.borderColor = "gold";
                queue[i+1].style.borderColor = "red";
                current = queue[i+1];
                i++;
            }else {
                queue[i].style.borderColor = "gold";
                clearInterval(timer);
            }
        }, 500);
    }

    preBtn.onclick = function(){
        current ? current.style.borderColor = "gold" : null;
        queue = [];
        preOrder(root);
        move();
    };
    inBtn.onclick = function(){
        current ? current.style.borderColor = "gold" : null;
        queue = [];
        inOrder(root);
        move();
    };
    postBtn.onclick = function(){
        current ? current.style.borderColor = "gold" : null;
        queue = [];
        postOrder(root);
        move();
    }
})();