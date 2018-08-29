<template>
    <div>
        <bread-crumb></bread-crumb>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px" align="left">
                    <el-form-item label="权限名称">
                        <el-input v-model="form.ModuleName"></el-input>
                    </el-form-item>
                    <el-form-item label="权限链接">
                        <el-input v-model="form.ModuleLink"></el-input>
                    </el-form-item>
                    <el-form-item label="权限后台地址">
                        <el-input v-model="form.ModuleArddress"></el-input>
                    </el-form-item>
                    <el-form-item label="权限图标">
                        <div @click="openIconsDialog" class="icon_frame" :class="form.ModuleIcon"><i class="line"></i><i class="vertical"></i></div>
                    </el-form-item>
                    <el-form-item label="权限排序">
                        <el-input v-model="form.Sort"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitSave">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 图标列表框 -->
        <el-dialog title="图标列表" :visible.sync="iconsVisible" width="60%" top="50px">
            <ul class="icon_list">
                <li @click="selectIcon(item)" :class="selectedIcon===item?'active':''" v-for="item in icons">
                    <i :class="item"></i>
                </li>
            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click="iconsVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmIcon">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import iconJson from "../../common/iconJson.js"
export default {
    data: function() {
        return {
            form: {
                Id: "",
                ModuleName: "",
                Sort: "",
                ModuleArddress: "",
                ModuleLink:"",
                ModuleIcon: ""
            },
            modulesList: [],
            iconsVisible: false,
            icons: iconJson,
            selectedIcon:""
        }
    },
    computed: {
        selectAll: {
            get: function() {
                return this.form.moduleIds.length === this.modulesList.length ? true : false;
            },
            set: function(newValue) {
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
        openIconsDialog(){
             this.selectedIcon=this.form.ModuleIcon;
             this.iconsVisible = true;
        },
        selectIcon(icon) {
           this.selectedIcon=icon;
        },
        confirmIcon() {
           this.form.ModuleIcon=this.selectedIcon;
           this.iconsVisible = false;
        },
        submitSave() {
            this.MyTools.$ajax.post.call(this, "/Module/Edit", this.form, res => {
                if (res.data.code == 0) {
                    this.$message.success(res.data.msg);
                    this.$router.push("/authorModule")
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        }
    },
    created() {
        this.MyTools.$ajax.get.call(this, "/Module/Edit?id="+ this.$route.params.id, res => {
                if (res.data.code == 0) {
                    this.form = res.data.datas;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
    }
};

</script>
<style type="text/css" scoped>
.icon_frame {
    border: 1px solid #dcdfe6;
    width: 60px;
    height: 60px;
    position: relative;
    cursor: pointer;
    font-size: 40px;
    line-height: 50px;
    color: #409EFF;
}

.icon_frame .line {
    position: absolute;
    width: 60%;
    margin: auto;
    left: 0;
    right: 0;
    background-color: #dcdfe6;
    height: 1px;
    top: 0;
    bottom: 0;
}

.icon_frame .vertical {
    position: absolute;
    height: 60%;
    width: 1px;
    margin: auto;
    left: 0;
    right: 0;
    background-color: #dcdfe6;
    top: 0;
    bottom: 0;
}

.icon_frame.glyphicon .line,
.icon_frame.glyphicon .vertical {
    display: none;
}

.icon_list{
    height:380px;
    overflow-y: auto;
}
.icon_list li {
    display: inline-block;
    vertical-align: middle;
    padding: 10px;
    text-align: center;
    border:1px solid #dcdfe6;
    cursor: pointer;
}

.icon_list li.active,.icon_list li:hover{
    color: #fff;
    background-color:#409EFF;
}
.icon_list li i {
    font-size: 30px;
}

</style>
