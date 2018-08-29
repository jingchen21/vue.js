<template>
    <div class="table">
        <bread-crumb></bread-crumb>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addHandle">添加</el-button>
                <el-button type="danger" icon="el-icon-delete" class="handle-del mr10" @click="delMultiple">批量删除</el-button>
                <el-input v-model="select_word" placeholder="搜索角色名字关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table class="table_center" :data="data" border style="width: 100%;text-align:center;font-size: 14px;" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="RoleName" label="角色名称" width="150">
                </el-table-column>
                <el-table-column prop="Sort" label="角色优先级" width="150">
                </el-table-column>
                <el-table-column label="角色模块" align="left">
                    <template slot-scope="scope">
                        <el-tag style="margin:5px;" v-for="item in scope.row.Modules">{{item.ModuleName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click="editHandle(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" icon="el-icon-delete" @click="delRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 20, 30, 40,50]" :page-size="cur_pageSize" background layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </div>
        </div>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="480px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="delHandle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: null,
            cur_page: 1,
            cur_pageSize: 10,
            totalSize: 0,
            multipleSelection: [],
            select_word: '',
            del_list: [],
            delVisible: false,
            moduleList: [],
            deleteIds: ""
        }
    },
    created() {
        this.getData();
    },
    computed: {
        data() {
            let tArray = [];
            if (this.tableData) {
                this.tableData.data.forEach((item, index) => {
                    tArray.push({ Id:item.Id,RoleName: item.RoleName, Sort: item.Sort, Modules: this.tableData.modules[index] });
                });
            }
            return tArray;
        }
    },
    methods: {
        //分页页数变化
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        //分页数量变化
        handleSizeChange(val) {
            this.cur_pageSize = val;
            this.getData();
        },
        //获取角色数据
        getData() {
            this.MyTools.$ajax.get.call(this, "/Role/RoleList?name=" + this.select_word + "&page=" + this.cur_page + "&pageSize=" + this.cur_pageSize, res => {
                if (res.data.code == 0) {
                    this.totalSize = res.data.total;
                    this.tableData = res.data.datas;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        //搜索角色
        search() {
            this.getData();
        },
        //添加角色
        addHandle() {
            this.$router.push("/roleadd");
        },
        //编辑角色
        editHandle(index, row) {
            this.$router.push("/roleedit/" + row.Id);
        },
        //删除单个
        delRow(index, row) {
            this.deleteIds = row.Id;
            this.delVisible = true;
        },
        //批量删除
        delMultiple() {
            if (this.multipleSelection.length > 0) {
                this.delVisible = true;
                this.deleteIds = this.multipleSelection.map(item => item.Id).join(",");
            } else {
                this.$message.error("请选择要批量删除的项");
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //删除处理
        delHandle() {
            this.MyTools.$ajax.get.call(this, "/role/DeleteItem?ids=" + this.deleteIds, res => {
                this.delVisible = false;
                if (res.data.code == 0) {
                    this.$message.success(res.data.msg);
                    this.getData();
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        }
    }
};

</script>
<style>
.table_center .el-table__header th {
    text-align: center;
}

</style>
<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.del-dialog-cnt {
    font-size: 16px;
    text-align: center;
}

</style>
