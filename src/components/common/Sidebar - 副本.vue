<template>
    <div class="sidebar">
        <happy-scroll color="rgba(255,255,255,.5)" resize>
            <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.ModuleArddress" :key="item.ModuleArddress">
                            <template slot="title">
                                <i :class="item.ModuleIcon"></i><span slot="title">{{ item.ModuleName }}</span>
                            </template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.ModuleArddress">
                                {{ subItem.ModuleName }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.ModuleArddress" :key="item.ModuleArddress">
                            <i :class="item.ModuleIcon"></i><span slot="title">{{ item.ModuleName }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </happy-scroll>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    ModuleIcon: 'glyphicon glyphicon-th-list',
                    ModuleArddress: 'userModule',
                    ModuleName: '用户管理'
                },
                {
                    icon: 'glyphicon glyphicon-th-list',
                    index: 'roleModule',
                    title: '角色管理'
                },
                {
                    icon: 'glyphicon glyphicon-th-list',
                    index: 'authorModule',
                    title: '权限管理'
                },
                {
                    icon: 'glyphicon glyphicon-user',
                    index: 'personalModule',
                    title: '个人信息'
                },
                {
                    ModuleIcon: 'glyphicon glyphicon-list',
                    index: 'iconlist',
                    title: '图标列表'
                },{
                    icon: 'el-icon-menu',
                    index: 'index',
                    title: '组件例子',
                    subs: [{
                            icon: 'el-icon-setting',
                            index: 'dashboard',
                            title: '系统首页'
                        }, {
                            icon: 'el-icon-tickets',
                            index: 'table',
                            title: '基础表格'
                        },
                        {
                            icon: 'el-icon-message',
                            index: 'tabs',
                            title: 'tab选项卡'
                        },
                        {
                            icon: 'el-icon-star-on',
                            index: 'charts',
                            title: 'schart图表'
                        },
                        {
                            icon: 'el-icon-rank',
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            icon: 'el-icon-warning',
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            icon: 'el-icon-error',
                            index: '404',
                            title: '404页面'
                        },{
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: 'editor',
                            title: '富文本编辑器'
                        },
                        {
                            index: 'markdown',
                            title: 'markdown编辑器'
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                }

            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.meta.module.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
        });
        this.MyTools.$ajax.get.call(this, "/Personal/GetPersonalModules", res => {
                if (res.data.code == 0) {
                    this.form = res.data.datas;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
    }
}

</script>
<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow: hidden;
    background-color: rgb(50, 65, 87);
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 220px;
}

.sidebar ul {
    height: 100%;
}

.sidebar .happy-scroll {
    width: 220px !important;
}

.sidebar .el-menu {
    border-right-color: rgb(50, 65, 87);
}

</style>
