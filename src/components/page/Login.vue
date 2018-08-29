<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px"  class="demo-ruleForm">
                <el-form-item prop="Name" label="姓名">
                    <el-input v-model="ruleForm.Name" placeholder="请输入姓名/邮箱/学号"></el-input>
                </el-form-item>
                <el-form-item prop="Password" label="密码">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.Password"></el-input>
                </el-form-item>
                <el-form-item prop="vcode" label="验证码">
                    <el-input style="width:160px" placeholder="请输入验证码" v-model="ruleForm.vcode" ></el-input><img style="float: right" onclick="this.src+='?'" :src="HostUrl+'user/GetVerifyCodeImg'"/>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="success" @click="submitLogin('ruleForm')">登录</el-button>
                </div>
                <div class="register-btn">
                    <el-button type="primary" @click="gotoRegister">没有账号？去注册</el-button>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    Name: '',
                    Password: '',
                    vcode:''
                },
                rules: {
                    Name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    Password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    vcode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/user/Login",this.ruleForm).then(res=>{
                            if(res.data.code==0){
                                this.$message.success(res.data.msg);
                                this.$router.push("/");
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        });
                    }
                });
            },
            gotoRegister:function(){
                this.$router.push("/register");
            }
        }
    };
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:0;
        right:0;
        top:50%;
        width:360px;
        margin:-120px auto -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn,.register-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        font-size: 20px;
        font-weight: bold;
    }
    .register-btn{
        margin-top:10px;
    }
    .register-btn button{
        width:100%;
        height:36px;
        font-size: 20px;
        font-weight: bold;
    }
</style>