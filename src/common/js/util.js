var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
var base = '';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

import axios from 'axios';
import { Toast } from 'mint-ui';

export default {
    install(Vue,options){

        /**弹出错误提示*/
        Vue.prototype.$toast = Toast;

        /*封装post*/
        Vue.prototype.systemPost = function(url,params,resolve,reject,fail){
            //mask loading
            if(url.substr(0,1) != '/'){
                url = '/' + url;
            }
            return axios.post(`${base}` + url, params).then(res => {
                //end loading
                let {code,msg,data} = res.data;
                if(code == '0000'){
                    if($.isFunction(resolve)) resolve(data,msg);
                }else{
                    this.alerrError(error);
                    if($.isFunction(reject)) reject(res.data);
                }
            }).catch(error => {
                //end loading
                this.alerrError(error);
                if($.isFunction(fail)) fail(error);
            });
        }

        /*封装get*/
        Vue.prototype.systemGet = function(url,params,resolve,reject,fail){
            //mask loading
            if(url.substr(0,1) != '/'){
                url = '/' + url;
            }
            return axios.get(`${base}` + url, params).then(res => {
                //end loading
                let {code,msg,data} = res.data;
                if(code == '0000'){
                    if($.isFunction(resolve)) resolve(data,msg);
                }else{
                    this.alerrError(msg);
                    if($.isFunction(reject)) reject(res.data);
                }
            }).catch(error => {
                //end loading
                this.alerrError(error);
                if($.isFunction(fail)) fail(error);
            });
        }
    },
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    // 处理mock的数据
    getMockList: (config, list) => {
        const {page, name, pageSize} = config;
        let mockList = list.filter(user => {
            if (name && user.name.indexOf(name) == -1) return false;
            return true;
        });
        let total = mockList.length;
        const size = pageSize ? pageSize : 20;
        mockList = mockList.filter((u, index) => index < size * page && index >= size * (page - 1));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, pageSize ?
                    {
                        total: total,
                        list:  mockList,
                    } : list]);
            }, 1000);
        });
    }
};
