<template>
    <div>
        <bread-crumb></bread-crumb>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px" align="left">
                    <el-form-item label="角色名称">
                        <el-input v-model="form.RoleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色优先权">
                        <el-input v-model="form.Sort"></el-input>
                    </el-form-item>
                    <el-form-item label="角色模块" >
                        <template>
                             <el-checkbox label="selectAll" name="selectAll" v-model="selectAll">全选</el-checkbox>
                            <br/>
                            <el-checkbox-group v-model="form.moduleIds">
                            <el-checkbox v-for="item in modulesList" :label="item.Id" :name="''+item.Id">{{item.ModuleName}}</el-checkbox>
                        </el-checkbox-group>
                        </template>
                        
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitSave">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            form: {
                Id: "",
                RoleName: "",
                Sort: "",
                moduleIds:[]
            },
            modulesList: []
        }
    },
    computed: {
        selectAll:{
            get:function() {
                return this.form.moduleIds.length === this.modulesList.length ? true : false;
            },
            set:function(newValue) {
                if (newValue) {
                    this.form.moduleIds = this.modulesList.map(function(item) {
                        return item.Id;
                    });
                } else {
                    this.form.moduleIds = [];
                }
            }
        }
    },
    methods: {
        formateDatas(data) {
            this.form.moduleIds = data.roleModules.map(function(item){
               return item.Id;
            });
            for (var item in data.role) {
                if(this.form.hasOwnProperty(item)){
                    this.form[item] = data.role[item];
                }
            }
        },
        getModules() {
            this.MyTools.$ajax.get.call(this, "/Module/GetModules", res => {
                if (res.data.code == 0) {
                    this.modulesList = res.data.datas;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        submitSave() {
            this.MyTools.$ajax.post.call(this, "/Role/Edit", this.form, res => {
                if (res.data.code == 0) {
                    this.$message.success(res.data.msg);
                    this.$router.push("/roleModule")
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        }
    },
    created() {
        this.MyTools.$ajax.get.call(this, "/role/Edit?id=" + this.$route.params.id, res => {
            if (res.data.code == 0) {
                this.modulesList = res.data.datas.moduleList;
                this.formateDatas(res.data.datas.role);
            }
        });
    }
};

</script>
<style type="text/css">
    .form-box .el-checkbox+.el-checkbox{
        margin-left:0;
    }
    .form-box .el-checkbox{
        margin-right:30px;
    }
</style>
