webpackJsonp([8],{Hbnr:function(e,r){},bRYc:function(e,r){},i16U:function(e,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t={render:function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",[a("bread-crumb"),e._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"form-box"},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"姓名",prop:"Name"}},[a("el-input",{model:{value:e.form.Name,callback:function(r){e.$set(e.form,"Name",r)},expression:"form.Name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"学号",prop:"Number"}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.Number,callback:function(r){e.$set(e.form,"Number",r)},expression:"form.Number"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码",prop:"Password"}},[a("el-input",{attrs:{type:"password"},model:{value:e.form.Password,callback:function(r){e.$set(e.form,"Password",r)},expression:"form.Password"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别",prop:"Gender"}},[a("el-radio-group",{model:{value:e.form.Gender,callback:function(r){e.$set(e.form,"Gender",r)},expression:"form.Gender"}},[a("el-radio",{attrs:{label:!0}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:!1}},[e._v("女")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱",prop:"Email"}},[a("el-input",{attrs:{type:"email"},model:{value:e.form.Email,callback:function(r){e.$set(e.form,"Email",r)},expression:"form.Email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"头像",prop:"ImgUrl"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.form.ImgUrl?a("img",{staticClass:"avatar",attrs:{src:e.HostUrl+e.form.ImgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"角色",prop:"userRoleId"}},[a("el-select",{attrs:{placeholder:"请选择用户角色"},model:{value:e.form.userRoleId,callback:function(r){e.$set(e.form,"userRoleId",r)},expression:"form.userRoleId"}},e._l(e.roleList,function(e){return a("el-option",{key:e.Id,attrs:{label:e.RoleName,value:e.Id}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(r){e.submitAdd("form")}}},[e._v("创建")])],1)],1)],1)])],1)},staticRenderFns:[]};var s=a("VU/8")({data:function(){return{form:{Id:"",Name:"",Number:"",Password:"",Email:"",ImgUrl:"",Gender:!0,userRoleId:""},roleList:[],uploadUrl:this.HostUrl+"user/imgUpload/",rules:{Name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:50,message:"姓名长度不能小于2位",trigger:"blur"}],Number:[{required:!0,message:"请输入学号",trigger:"blur"}],Password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:25,message:"密码长度不能小于6位",trigger:"blur"}],Gender:[{required:!0,message:"请输入性别",trigger:"blur"}],ImgUrl:[{required:!0,message:"请输选择头像",trigger:"change"}],userRoleId:[{required:!0,message:"角色不能为空",trigger:"change"}]}}},methods:{getRoles:function(){var e=this;this.MyTools.$ajax.get.call(this,"/Role/GetRoles?order=0",function(r){0==r.data.code?e.roleList=r.data.datas:e.$message.error(r.data.msg)})},submitAdd:function(e){var r=this;this.$refs[e].validate(function(e){e&&r.MyTools.$ajax.post.call(r,"/user/Create",r.form,function(e){0==e.data.code?(r.$message.success(e.data.msg),r.$router.push("/userModule")):r.$message.error(e.data.msg)})})},handleAvatarSuccess:function(e){0==e.code&&(this.form.ImgUrl=e.path)},beforeAvatarUpload:function(e){var r=e.size/1024/1024<1;return r||this.$message.error("上传头像图片大小不能超过 1MB!"),r}},created:function(){this.getRoles()}},t,!1,function(e){a("Hbnr"),a("bRYc")},"data-v-3691e484",null);r.default=s.exports}});