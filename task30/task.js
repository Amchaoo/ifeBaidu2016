/**
 * Created by 安超 on 2016/3/27.
 */
(function(){
    var username = document.getElementById("username");
    var psd = document.getElementById("psd");
    var ensurePsd = document.getElementById("ensurePsd");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var button = document.getElementById("button");
    var flag = 0;//用于记录几个输入框正确了
    var padFlag = false;//表征原始密输入情况

    var defaultValue = {
        "username": username.nextElementSibling.innerText,
        "psd": psd.nextElementSibling.innerText,
        "ensurePsd": ensurePsd.nextElementSibling.innerText,
        "email": email.nextElementSibling.innerText,
        "phone": phone.nextElementSibling.innerText,
    };

    //名称
    username.onfocus = function(){
        var tipBox = this.nextElementSibling;
        tipBox.style.color = "#555555";
        tipBox.innerHTML = defaultValue.username;

        this.onblur = function(){
            var inputText = this.value.trim();
            var chinese = inputText.match(/[\u4e00-\u9fa5]/g);
            var len = (chinese === null) ? (inputText.length) : (inputText.length + chinese.length);

            if(len >= 4 && len <= 16){
                tipBox.innerHTML = "输入正确";
                tipBox.style.color = "green";
                flag++;
            }else {
                tipBox.innerHTML = "输入错误";
                tipBox.style.color = "red";
                flag--;
            }
        };
    };

    //密码
    psd.onfocus = function(){
        var tipBox = this.nextElementSibling;
        tipBox.style.color = "#555555";
        tipBox.innerHTML = defaultValue.psd;

        this.onblur = function(){
            var inputText = this.value.trim();;
            if(/^[0-9A-Za-z]{6,16}$/.test(inputText)){
                tipBox.innerHTML = "输入正确";
                tipBox.style.color = "green";
                padFlag = true;
                flag++
            }else {
                tipBox.innerHTML = "输入错误";
                tipBox.style.color = "red";
                padFlag = false;
                flag--;
            }
        }
    };

    //确认密码
    ensurePsd.onfocus = function(){
        var tipBox = this.nextElementSibling;console.log(tipBox);
        if(!padFlag){
            tipBox.innerHTML = "请先在上面输入框正确输入密码";
            tipBox.style.color = "red";
            return 0;
        }

        tipBox.innerHTML = defaultValue.ensurePsd;
        tipBox.style.color = "#555555";
        var psd1 = psd.value;

        ensurePsd.onblur = function(){
            var psd2 = this.value.trim();
            if(psd1 === psd2){
                tipBox.innerHTML = "输入正确";
                tipBox.style.color = "green";
                flag++;
            }else {
                tipBox.innerHTML = "输入错误";
                tipBox.style.color = "red";
                flag--;
            }
        }
    }

    //邮箱
    email.onfocus = function(){
        var tipBox = this.nextElementSibling;
        tipBox.style.color = "#555555";
        tipBox.innerHTML = defaultValue.email;

        email.onblur = function(){
            var emailText = email.value;
            if(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(emailText)){
                tipBox.innerHTML = "输入正确";
                tipBox.style.color = "green";
                flag++;
            }else {
                tipBox.innerHTML = "输入错误";
                tipBox.style.color = "red";
                flag--;
            }
        }
    };

    //手机号
    phone.onfocus = function(){
        var tipBox = this.nextElementSibling;
        tipBox.style.color = "#555555";
        tipBox.innerHTML = defaultValue.phone;

        this.onblur = function(){
            var phoneText = phone.value;
            if(/(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/.test(phoneText)){
                tipBox.innerHTML = "输入正确";
                tipBox.style.color = "green";
                flag++;
            }else {
                tipBox.innerHTML = "输入错误";
                tipBox.style.color = "red";
                flag--;
            }
        }
    }

    //确认按钮
    button.onclick = function(){
        if(flag !== 5){
            alert("填写有误");
        }else {
            alert("填写正确");
        }
    }
})();
