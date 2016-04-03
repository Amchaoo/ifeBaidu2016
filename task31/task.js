/**
 * Created by 安超 on 2016/4/3.
 */
(function(){
    "use strict";

    var main = document.getElementById("main");
    var schoolContainer = main.getElementsByClassName("container")[0];
    var companyContainer = main.getElementsByClassName("container")[1];
    var schoolWrap = main.getElementsByClassName("school")[0];
    var companyWrap = main.getElementsByClassName("company")[0];
    var student = document.getElementById("student");
    var notStudent = document.getElementById("notStudent");
    var school = document.getElementById("school");
    var unis = document.getElementById("unis");

    var data = [{
            city: "北京",
            school: ["北京大学", "清华大学","中国人民大学","北京交通大学","北京邮电大学"]},
        {
            city: "西安",
            school: ["西安交通大学", "西安工业大学","西安电子科技大学","西安邮电大学","西北大学"]},
        {
            city: "上海",
            school: ["复旦大学", "同济大学","上海交通大学","上海大学"]},
        {
            city: "南京",
            school: ["南京大学", "南京理工大学","南京航空大学","南京邮电大学","江苏大学"]}
    ];

    //添加类
    function addClass(ele, newClass){
        if(ele.className === ""){
            ele.className = newClass;
        }else {
            ele.className += " " + newClass;
        }
    }

    //移除类
    function removeClass(ele, name){
        var className = ele.className.split(" ");

        for(var i= 0, len=className.length; i<len; i++){
            if(className[i] === name){
                className.splice(i, 1);
                ele.className = className.join(" ");
                return;
            }
        }
    }

    //渲染城市名
    function renderCity(data){
        for(var i= 0, len=data.length; i<len; i++){
            var city = "<option value="+ "'" + i + "'" + ">" + data[i].city + "</option>";
            school.innerHTML += city;
        }
    }

    //根据城市渲染学校 //传入城市的序数
    function renderSchool(index){
        var n = Number(index);
        var allUni = data[n].school;
        unis.innerHTML = "";

        for(var i= 0, len=allUni.length; i<len; i++){
            var uni = "<option value="+ "'" + allUni[i] + "'" + ">" + allUni[i] + "</option>";
            unis.innerHTML += uni;
        }
    }

    //初始进入界面渲染状况
    renderCity(data);
    renderSchool(0);

    //在校生个非在校生选项切换
    schoolContainer.onclick = function(){
        removeClass(companyContainer, "active");
        addClass(schoolContainer, "active");

        companyWrap.style.display = "none";
        schoolWrap.style.display = "block";
    };
    companyContainer.onclick = function(){
        removeClass(schoolContainer, "active");
        addClass(companyContainer, "active");

        schoolWrap.style.display = "none";
        companyWrap.style.display = "block";
    };

    //改变城市，改变学校
    school.onchange = function(){
        var options = school.getElementsByTagName("option");
        for (var i= 0, len=options.length; i<len; i++){
            if(options[i].selected === true){
                renderSchool(options[i].getAttribute("value"));
            }
        }
    }
})();