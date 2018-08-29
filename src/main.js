import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import MyTools from "../static/js/MyTools.js";
//滚动条插件
import { HappyScroll } from 'vue-happy-scroll';

import BreadCrumb from './components/common/BreadCrumbNav';

import 'vue-happy-scroll/docs/happy-scroll.css';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

import '../static/css/glyphicons-halflings-fonts.css';

import "babel-polyfill";


Vue.use(ElementUI, { size: 'small' });
axios.defaults.withCredentials = true;
Vue.prototype.HostUrl = axios.defaults.baseURL = '';
Vue.prototype.$axios = axios;
Vue.prototype.MyTools = MyTools;

//全局注册
Vue.component('happy-scroll', HappyScroll);
Vue.component('bread-crumb', BreadCrumb);

//设置路由默认地址
/*Vue.prototype.$axios.get("/User/GetUserModules").then(res =>{
    router.options.routes[0].redirect
},error =>{

})*/

//router.options.routes[0].redirect="/Test";
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    let token = MyTools.Cookie.getCookie("token");
    if (!token && to.path !== '/login' && to.path !== '/register') {
        next('/login');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})


new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});
