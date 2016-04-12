/**
 * Created by 安超 on 2016/4/12.
 */
(function(){
    function Pop(parent, config){
        this.title =  config.title || "提示";
        this.content = config.content || "暂时无内容";
        this.hasOkayBtn = config.okay;
        this.hasCancelBtn = config.cancel;
        this.id = config.id;
        this.okayEvent = config.okayEvent;
        this.cancelEvent = config.cancelEvent;
        this.parent = parent;
    }

    //初始化
    Pop.prototype.init = function(){

        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        var mask = document.createElement("mask");

        div.className = "ac-pop";
        div.id = this.id;

        h3.className = "ac-title";
        h3.innerHTML = this.title;
        div.appendChild(h3);

        p.className = "ac-content";
        p.innerHTML = this.content;
        div.appendChild(p);

        mask.className = "ac-mask";
        mask.id = "acMask";
        document.body.appendChild(mask);

        if(this.hasOkayBtn){
            var okayBtn = document.createElement("button");
            okayBtn.innerHTML = "确定";
            okayBtn.id = "acOkay";
            okayBtn.className = "ac-okay";
            div.appendChild(okayBtn);
        }

        if(this.hasCancelBtn){
            var cancelBtn = document.createElement("button");
            cancelBtn.innerHTML = "取消";
            cancelBtn.id = "acCancel";
            cancelBtn.className = "ac-cancel";
            div.appendChild(cancelBtn);
        }

        this.parent.appendChild(div);
    };

    //js设置样式
    Pop.prototype.setStyle = function() {
        this.ele = document.getElementById(this.id);
        this.mask = document.getElementById("acMask");

        var height = this.ele.offsetHeight;
        this.ele.style.marginTop = - parseInt(height / 2) -20 + "px";

        this.mask.style.width = document.body.scrollWidth + "px";
        this.mask.style.height = document.body.scrollHeight + "px";
    };

    //隐藏弹窗
    Pop.prototype.hide = function(){
        this.parent.removeChild(this.ele);
        document.body.removeChild(this.mask);
    };

    //事件
    Pop.prototype.event = function(){
        var _this = this;

        if(document.getElementById("acOkay")){
            var okayBtn = document.getElementById("acOkay");

            okayBtn.onclick = function(){
                var event = this.okayEvent;
                event instanceof Function ? event() : _this.hide();
            };
        }

        if(document.getElementById("acCancel")){
            var cancelBtn = document.getElementById("acCancel");

            cancelBtn.onclick = function(){
                var event = this.cancelEvent;
                event instanceof Function ? event() : _this.hide();
            };
        }
    };


    var popUp = {
        popObj: null,

        alert: function(parent, config){
            this.parent = parent;
            this.config = config;
            this.popObj = new Pop(this.parent,  this.config);
            this.popObj.init();
            this.popObj.setStyle();
            this.popObj.event();
        }
    };

    var btn = document.getElementById("btn");
    btn.onclick = function(){console.log(1)
        var config = {
            id: "pop",
            title: "这是一个弹窗",
            content: "我是弹窗的内容",
            okay: true,
            cancel: true
        };
        popUp.alert(document.body, config);
    }
})();
