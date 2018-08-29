<template>
    <div>
        <bread-crumb></bread-crumb>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="form.Name"></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input v-model="form.Number"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.Password"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.Gender">
                            <el-radio :label="true">男</el-radio>
                            <el-radio :label="false">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input type="email" v-model="form.Email"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="form.ImgUrl" :src="HostUrl+form.ImgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-select v-model="form.userRoleId" placeholder="请选择用户角色">
                            <el-option v-for="item in roleList" :key="item.Id" :label="item.RoleName" :value="item.Id"></el-option>
                        </el-select>
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
    name: 'baseform',
    data: function() {
        return {
            form: {
                Id: "",
                Name: "",
                Number: "",
                Password: "",
                Email: "",
                ImgUrl: "",
                Gender: "",
                CreateDate: "",
                userRoleId: "",
            },
            roleList: [],
            uploadUrl: this.HostUrl + "user/imgUpload/"

        }
    },
    methods: {
        formateDatas(data) {
            this.form.userRoleId = data.userRoleId;
            for (var item in data.user) {
                if(this.form.hasOwnProperty(item)){
                    this.form[item] = data.user[item];
                }
            }
        },
        submitSave() {
            this.MyTools.$ajax.post.call(this, "/user/Edit", this.form, res => {
                if (res.data.code == 0) {
                    this.$message.success(res.data.msg);
                    this.$router.push("/userModule")
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        handleAvatarSuccess(res) {
            if (res.code == 0) {
                this.form.ImgUrl = res.path;
            }
        },
        beforeAvatarUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isLt1M;
        }
    },
    created: function() {
        this.MyTools.$ajax.get.call(this, "/user/Edit?id=" + this.$route.params.id, res => {
            if (res.data.code == 0) {
                this.roleList = res.data.datas.roleList;
                this.formateDatas(res.data.datas.userInfor);
            }
        });
    }
};

</script>
<style>
    .avatar-uploader .el-upload--text{
    width:80px;
    height:80px;
}
</style>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}

.avatar {
    width: 80px;
    height: 80px;
    display: block;
}

</style>
