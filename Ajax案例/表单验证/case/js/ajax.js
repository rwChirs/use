
// 方案一
// 采用下述方式进行封装可行，但是不灵活
// 如果某个参数不是必须的，也得占一个参数位置
// function ajax(url, type, data, callback) {

// }

// 方案二
// 以对象方式传递参数不受顺序影响会更灵活
// 此方案可以会引也变量冲突（变量污染）
// function ajax(obj) {
//     var url = obj.url;
//     var type = obj.type;
//     var data = obj.data;
//     var callback = obj.callback;
// }

// function ajax() {

// }

// 方案三
// 通过 命名空间 来解决变量污染
// 所谓命名空间就是找个“父亲”

// var str = 'hello';

// var obj = {
//     str: 'hello'
// }

// var o = {
//     str: 'hello2'
// }

// obj.str;

// o.str;

var $ = {
    ajax: function (obj) {
        // 如果用户没有传请求地址，设当前页面为请求地址
        var url = obj.url || location.pathname;
        // 如果用户没有传递请求方式，设 get 为默认值
        var type = obj.type || 'get';
        // 如果用户没有传参数，默认没有参数
        var data = obj.data || {};
        // 如果用户没有回调函数，默认为一个“空”函数
        var success = obj.success || function () {};

        function params(obj) {
            var s = '';
            for(var key in obj) {
                s += key + '=' + obj[key] + '&';
            }

            return s.slice(0, -1);
        }

        data = params(data);

        // 实例化
        var xhr = new XMLHttpRequest;

        // 当请求方式为get时参数放到请求地址后面
        // 格式为 url?key=val&key1=val1...
        if(type == 'get') {
            // 将参数设置在地址后面
            url = url + '?' + data;
            // 上述已将参数拼接，data 设为 null
            // 这样 send 时，传递的就为 null 了
            data = null;
        }

        // 请求行
        xhr.open(type, url);

        // 当 post 方式需要设置 Content-Type 这个请求头
        if(type == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        
        // 发送请求主体
        // 当请求方式为 get 时 data 为 null
        // 当请求方式为 post 时 data 格式为 key=val&key1=val1...
        xhr.send(data);

        xhr.addEventListener('readystatechange', function () {
            if(xhr.readyState == 4 && xhr.status == 200) {
                // console.log(xhr.responseText);

                // 假定服务端返回的数据为 JSON 格式字符串
                var result = JSON.parse(xhr.responseText);
                // 执行回调函数
                success(result);
            }
        })
    }
};
