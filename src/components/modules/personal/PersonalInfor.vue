<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="个人信息" name="infor">
            <div class="container">
                <div class="form-box">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="姓名" prop="Name">
                            <el-input v-model="form.Name"></el-input>
                        </el-form-item>
                        <el-form-item prop="Gender" label="性别">
                            <el-radio-group v-model="form.Gender">
                                <el-radio :label="true">男</el-radio>
                                <el-radio :label="false">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="Email" label="邮箱">
                            <el-input type="email" v-model="form.Email"></el-input>
                        </el-form-item>
                        <el-form-item prop="ImgUrl" label="头像">
                            <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                <img v-if="form.ImgUrl" :src="HostUrl+form.ImgUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitSave('form')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="password">
            <div class="container">
                <div class="form-box">
                    <el-form ref="form1" :model="form1" :rules="rules1" label-width="80px">
                        <el-form-item label="旧密码" prop="OldPassword">
                            <el-input type="Password" v-model="form1.OldPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="NewPassword">
                            <el-input type="Password" v-model="form1.NewPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="ConfirmPassword">
                            <el-input type="Password" v-model="form1.ConfirmPassword"></el-input>
                        </el-form-item>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitSave1('form1')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if(value.length<6) {
           callback(new Error('新密码长度不能小于6'));
        }else{
            callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.form1.NewPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            activeName: 'infor',
            form: {
                Name: "",
                Email: "",
                ImgUrl: "",
                Gender: ""
            },
            form1: {
                OldPassword: "",
                NewPassword: "",
                ConfirmPassword: ""
            },
            uploadUrl: this.HostUrl + "user/imgUpload/",
            rules: {
                Name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度不能小于2位', trigger: 'blur' }
                ],
                Gender: [
                    { required: true, message: '请输入性别', trigger: 'blur' }
                ],
                ImgUrl: [
                    { required: true, message: '请输选择头像', trigger: 'change' }
                ]
            },
            rules1: {
                OldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    { min: 6, max: 25, message: '旧密码长度不能小于6位', trigger: 'blur' }
                ],
                NewPassword: [
                    { required: true,validator: validatePass, trigger: 'blur' }
                ],
                ConfirmPassword: [
                    { required: true,validator: validatePass1, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        formateFormDatas(data) {
            for (var item in data) {
                if (this.form.hasOwnProperty(item)) {
                    this.form[item] = data[item];
                }
            }
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
        },
        submitSave(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.MyTools.$ajax.post.call(this, "/Personal/PersonalInfor", this.form, res => {
                        if (res.data.code == 0) {
                            this.$message.success(res.data.msg);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },
        submitSave1(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.MyTools.$ajax.post.call(this, "/Personal/PersonalPassword", this.form1, res => {
                        if (res.data.code == 0) {
                            this.$message.success(res.data.msg);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            })
        }
    },
    created() {
        this.MyTools.$ajax.get.call(this, "/Personal/PersonalInfor", res => {
            if (res.data.code == 0) {
                this.formateFormDatas(res.data.datas);
            } else {
                this.$message.error(res.data.msg);
            }
        });
    }
};

</script>
<style>
.avatar-uploader .el-upload--text {
    width: 80px;
    height: 80px;
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
