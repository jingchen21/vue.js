<template>
    <div class="register-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-register">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item prop="Name" label="姓名">
                    <el-input v-model="ruleForm.Name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item prop="Number" label="学号">
                    <el-input v-model="ruleForm.Number" type="number" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item prop="Password" label="密码">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.Password"></el-input>
                </el-form-item>
                <el-form-item prop="Email" label="邮箱">
                    <el-input type="email" v-model="ruleForm.Email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="Gender">
                    <el-radio-group v-model="ruleForm.Gender">
                        <el-radio :label="true">男</el-radio>
                        <el-radio :label="false">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="register-btn">
                    <el-button type="success" @click="submitRegister('ruleForm')">注册</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="goLogin">已有账号？去注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            ruleForm: {
                Name: '',
                Password: '',
                Email: '',
                Gender: true
            },
            rules: {
                Name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度不能小于2位', trigger: 'blur' }
                ],
                Number: [
                    { required: true, message: '请输入学号', trigger: 'blur' }
                ],
                Password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 25, message: '长度不能小于6位', trigger: 'blur' }
                ],
                /*                Email: [
                                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                                    { type: 'email', message: '邮箱格式不正确'}
                                ],*/
                Gender: [
                    { required: true, message: '请输入性别', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitRegister(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post("/user/Regist", this.ruleForm).then(res => {
                        if (res.data.code == 0) {
                            this.$message.success(res.data.msg);
                            this.goLogin();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },
        goLogin() {
            this.$router.push("/login");
        }
    }
};

</script>
<style scoped>
.register-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}

.ms-register {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    width: 360px;
    margin: -120px auto -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-btn,
.register-btn {
    text-align: center;
}

.login-btn button,
.register-btn button {
    width: 100%;
    height: 36px;
    font-size: 20px;
    font-weight: bold;
}

.login-btn {
    margin-top: 10px;
}

</style>
