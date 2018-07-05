// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import mintUi from 'mint-ui'
import "./assets/css/common.css"
import 'mint-ui/lib/style.css';
import './assets/css/mintcssdef.scss';//全局修改mint-UI样式  
import wcView from 'wc-view';
import 'wc-view/style.css';
import store from './store';
import md5 from 'md5'
import { Toast } from 'mint-ui'
Vue.use(wcView);
Vue.config.productionTip = false
Vue.use(mintUi)
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
/* eslint-disable no-new */
let appid = 1002;

var _timestamp = Math.round(new Date().getTime()/1000).toString();

function api(data,method) {
    _timestamp = Math.round(new Date().getTime()/1000).toString();
	var request_data = [];
	request_data['v'] = '1.0';
	request_data['appid'] = appid;
	request_data['method'] = method;
	request_data['uuid'] = "phone";
	request_data['platform'] = "phone";
	request_data['_timestamp'] = _timestamp
	for(var d in data) {
		request_data[d] = data[d];
	}

	return signature(request_data);
}

function objKeySort(obj) {//排序的函数
    var newkey = Object.keys(obj).sort();
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}
function signature(data) {
	var client_secret = '7cc696319dbf41a8d6dcb83380c8fc8b';
	var ret = [];
	ret = objKeySort(data)
	var sign_str = "";
	for(var d in ret) {
		var k = d;
		var v = ret[d];
		sign_str += k+v
	}
	sign_str += client_secret
	return md5(sign_str)
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.baseURL = 'http://tvue.gtdysd.com/api/';// 请求前缀 http://tvue.gtdysd.com
axios.interceptors.request.use(
    config => {
        if (config.method == "get"){
            return config;
        }
    	let data = config.data;
    	let api_url = config.url;
        let methods = data.method
        delete data.methods
    	let sign = api(data,methods);
    	let keyname ='';
        data.v = '1.0'
        data.appid = appid
        data.uuid = 'phone'
        data.platform = 'phone'
        data._timestamp = _timestamp
        data.sign = sign
    	Object.keys(data).forEach(function(key){
    		keyname += key+'='+data[key]+ '&';
    	});
        config.data =  keyname;       
    	if(methods != 'note.uploadimg.uploadBase64'){
           config.url += 'Rest/business/';
        } else {
            config.url += 'Rest/thirdup/';
        }
        if (localStorage.getItem("to_ken")) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.post['user-token'] = localStorage.getItem("to_ken");
        }
        return config;
    },
    err => {
        alert('err')
        return Promise.reject(err);
    });

  router.beforeEach((to, from, next) => {
     window.onscroll = null
     if(to.meta.requireAuth){
        if(localStorage.getItem("to_ken")){
            next()
        }else{
            Toast('这不是你的地盘~')
            setTimeout(() => {
                next({
                    path: '/logo',
                    query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }, 500);
            
        }
    }else{
        next();
    }
  })
Vue.prototype.$axios = axios //axios 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})