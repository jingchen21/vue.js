import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    /*mode: 'history',*/
    routes: [{
            path: '/',
            redirect: "/personalModule"
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: 'Home' },
            children: [
                //个人信息模块
                {
                    path: '/personalModule',
                    component: resolve => require(['../components/modules/personal/PersonalInfor.vue'], resolve),
                    meta: { title: '个人信息', module: 'personalModule' }
                },
                //抽点模块
                {
                    path: '/randomModule',
                    component: resolve => require(['../components/modules/users/RandomUser.vue'], resolve),
                    meta: { title: '抽点模块', module: 'randomModule'}
                },
                //用户模块
                {
                    path: '/userModule',
                    component: resolve => require(['../components/modules/users/UserList.vue'], resolve),
                    meta: { title: '用户管理', module: 'userModule', isParent: true }
                },
                {
                    path: '/useradd',
                    component: resolve => require(['../components/modules/users/UserAdd.vue'], resolve),
                    meta: { title: '新增用户', module: 'userModule' }
                },
                {
                    path: '/useredit/:id',
                    component: resolve => require(['../components/modules/users/UserEdit.vue'], resolve),
                    meta: { title: '编辑用户', module: 'userModule' }
                },
                //角色管理模块
                {
                    path: '/roleModule',
                    component: resolve => require(['../components/modules/roles/RoleList.vue'], resolve),
                    meta: { title: '角色管理', module: 'roleModule', isParent: true }
                },
                {
                    path: '/roleadd',
                    component: resolve => require(['../components/modules/roles/RoleAdd.vue'], resolve),
                    meta: { title: '新增角色', module: 'roleModule' }
                },
                {
                    path: '/roleedit/:id',
                    component: resolve => require(['../components/modules/roles/RoleEdit.vue'], resolve),
                    meta: { title: '编辑角色', module: 'roleModule' }
                },
                //权限管理模块
                {
                    path: '/authorModule',
                    component: resolve => require(['../components/modules/modules/ModuleList.vue'], resolve),
                    meta: { title: '权限管理', module: 'authorModule', isParent: true }
                },
                {
                    path: '/authoradd',
                    component: resolve => require(['../components/modules/modules/ModuleAdd.vue'], resolve),
                    meta: { title: '新增权限', module: 'authorModule' }
                },
                {
                    path: '/authoredit/:id',
                    component: resolve => require(['../components/modules/modules/ModuleEdit.vue'], resolve),
                    meta: { title: '编辑权限', module: 'authorModule' }
                },
                //图标列表
                {
                    path: '/iconlist',
                    component: resolve => require(['../components/page/IconList.vue'], resolve),
                    meta: { title: '图标列表', module: 'iconlist' }
                },
                //其他例子组件
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页', module: 'dashboard' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格', module: 'table' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡', module: 'tabs' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单', module: 'form' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器', module: 'editor' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器', module: 'markdown' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传', module: 'upload' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表', module: 'charts' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表', module: 'drag' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true, module: 'permission' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
