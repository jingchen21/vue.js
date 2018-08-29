<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in crumbsData" v-if="item.isLink">
                <router-link :to="item.route.path" style="color:#409EFF">
                    <i v-if="index===0" class="el-icon-tickets"></i>&nbsp;{{item.route.meta.title}}
                </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else><i v-if="index===0" class="el-icon-tickets"></i> {{item.route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    data() {
        return {
            crumbsData: []
        }
    },
    created() {
        let obj = this.$router.options.routes.find(function(item) {
            return item.children && item.children.length > 0;
        });
        let parent = obj.children.find((item) => {
            return item.path !== this.$route.path && item.meta.module === this.$route.meta.module && item.meta.isParent;
        });
        if (parent) {
            this.crumbsData.push({ route: parent, isLink: true });
        }
        this.crumbsData.push({ route: this.$route, isLink: false });
    }
};

</script>
