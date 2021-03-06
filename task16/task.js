/**
 * Created by 安超 on 2016/3/22.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var aqi = document.getElementById("aqi-value-input").value.trim();

    if(!city.match(/^[\u4e00-\u9fa5a-zA-Z]+$/)){
        alert("城市名必须为中英文字符");
        return 0;
    }else if(!aqi.match(/^[0-9]+$/)){
        alert("空气质量指数必须为整数");
        return 0;
    }
    if(!aqiData.hasOwnProperty(city)){
        aqiData[city] = aqi;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table");
    var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";

    for (var city in aqiData){
        item += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>";
    }

    aqiTable.innerHTML = city ? item : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = function(){
        addBtnHandle();
    };

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

    var aqiTable = document.getElementById("aqi-table");
    aqiTable.onclick = function(event){
        var ev = event || window.event;
        if(ev.target.nodeName.toLowerCase() === "button"){
            var city = ev.target.parentNode.previousSibling.previousSibling.innerHTML;
            delBtnHandle(city);
        }
    }
}

init();
