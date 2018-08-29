<template>
    <div class="table">
        <bread-crumb></bread-crumb>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addHandle">添加</el-button>
                <el-button type="danger" icon="el-icon-delete" class="handle-del mr10" @click="delMultiple">批量删除</el-button>
                <el-input v-model="select_word" placeholder="搜索权限名字关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table class="table_center" :data="tableData" border style="width: 100%;text-align:center;font-size: 14px;" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="ModuleName" label="权限名称">
                </el-table-column>
                <el-table-column prop="ModuleLink" label="权限链接">
                </el-table-column>
                <el-table-column prop="ModuleAddress" label="权限后台地址">
                </el-table-column>
                <el-table-column label="权限图标">
                    <template slot-scope="scope">
                        <i :class="scope.row.ModuleIcon" style="font-size:24px"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="Sort" label="权限排序">
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
            tableData: [],
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
        //获取模块数据
        getData() {
            this.MyTools.$ajax.get.call(this, "/Module/ModuleList?name=" + this.select_word + "&page=" + this.cur_page + "&pageSize=" + this.cur_pageSize, res => {
                if (res.data.code == 0) {
                    this.totalSize = res.data.total;
                    this.tableData = res.data.datas;
                    console.log(this.tableData)
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        //搜索模块
        search() {
            this.getData();
        },
        //添加模块
        addHandle() {
            this.$router.push("/authoradd");
        },
        //编辑模块
        editHandle(index, row) {
            this.$router.push("/authoredit/" + row.Id);
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
            this.MyTools.$ajax.get.call(this, "/module/DeleteItem?ids=" + this.deleteIds, res => {
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
