<template>
    <div class="table">
        <bread-crumb></bread-crumb>
        <div class="container">
                <section class="main">
                    <div class="user_infor">
                        <div class="user_img"><img v-if="currentUser
            !=null" :src="HostUrl+currentUser.ImgUrl" /></div>
                        <div class="user_name">{{currentUser?currentUser.Name:"XXX"}}</div>
                        <div class="user_number">{{currentUser?currentUser.Number:"000"}}</div>
                    </div>
                    <div class="handle">
                        <el-button type="primary" :disabled="start?true:false" style="margin-right:50px;" @click="startRandom">开始抽点</el-button>
                        <el-button type="danger" :disabled="start?false:true" @click="stopRandom">停止</el-button>
                    </div>
                </section>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userList: [],
            start: false,
            currentUser: null,
            cycleHandle: null
        }
    },
    computed: {
        data() {
            let tArray = [];
            if (this.tableData) {
                this.tableData.data.forEach((item, index) => {
                    tArray.push({ Id: item.Id, RoleName: item.RoleName, Sort: item.Sort, Modules: this.tableData.modules[index] });
                });
            }
            return tArray;
        }
    },
    methods: {
        startRandom() {
            this.start = true;
            this.cycleHandle = setInterval(() => {
                let random = Math.floor(this.userList.length * Math.random());
                console.log(random)
                this.currentUser = this.userList[random];
            }, 50);
        },
        stopRandom() {
            this.start = false;
            clearInterval(this.cycleHandle);
            this.cycleHandle = null;
        }
    },
    created() {
        this.MyTools.$ajax.get.call(this, "/user/GetALLUsers", res => {
            if (res.data.code == 0) {
                this.userList = res.data.datas;
            } else {
                this.$message.error(res.data.msg);
            }
        });
    },
};

</script>
<style scoped>
.main {
    width: 50%;
    margin: 50px auto;
}

.main .user_infor>div {
    text-align: center;
    margin: 20px auto;
    font-size: 16px;
    font-weight: bold;
}

.main .user_img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 1px solid #dcdfe6;
}

.main .user_img img {
    width: 100%;
    border-radius: 100%;
}

.main .user_name {
    color: #f56c6c;
}

.main .handle {
    text-align: center;
    padding-top: 20px;
}

</style>
