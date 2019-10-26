<template>
    <div>
        <el-row class="topRow">
            <el-button type="primary" @click="addUser" icon="el-icon-edit">客人登记</el-button>
            <!--            <el-button type="success" @click="batchdel" icon="el-icon-delete">批量删除</el-button>-->
        </el-row>
        <el-table ref="multipleTable" :data="userData" tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange">
            <!-- 复选接钮 -->
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="id" label="编号" width="90"></el-table-column>
            <el-table-column align="center" prop="counit" label="协议单位" width="140"></el-table-column>
            <el-table-column align="center" prop="unitphone" label="电话" width="140"></el-table-column>
            <el-table-column align="center" prop="resmoney" label="剩余金额" width="140"></el-table-column>
            <el-table-column align="center" prop="bigbed" label="大床剩余时长" width="140"></el-table-column>
            <el-table-column align="center" prop="twobed" label="双床剩余时长" width="140"></el-table-column>
            <el-table-column align="center" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <!--                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
        ></el-pagination>


        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="addform" :model="addform" label-width="100px">

                <el-form-item label="协议单位">
                    <el-input v-model="addform.counit"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="addform.unitphone"></el-input>
                </el-form-item>
                <el-form-item label="剩余金额">
                    <el-input v-model="addform.resmoney"></el-input>
                </el-form-item>
                <el-form-item label="大床剩余时长">
                    <el-input v-model="addform.bigbed"></el-input>
                </el-form-item>
                <el-form-item label="双床剩余时长">
                    <el-input v-model="addform.twobed"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
        </el-dialog>

    </div>
</template>

<script>
    import {addAdmin, getList, updateAdmin, deleteAdmin} from "@/api/hotel/unit.js";

    export default {
        inject: ['reload'],
        data() {
            return {
                total: 40,
                currentPage: 1,
                pageSize: 10,
                dialogVisible: false,
                isUpload: false,
                addform: {
                    id: "",
                    counit: "",
                    unitphone: "",
                    resmoney: "",
                    bigbed: "",
                    twobed: ""
                },
                title: "",
                multipleSelection: [],
                userData: [],

            };
        },
        created() {
            this.getList();
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // handleDelete(index, rows) {
            //
            //     deleteAdmin(rows.userid).then(res => {
            //         if (res.data.status == 0) {
            //             this.userData.splice(index, 1)
            //         }
            //         alert(res.data.msg);
            //     })
            //
            //
            // },


            // batchdel() {
            //     this.multipleSelection.forEach(element => {
            //         this.userData.forEach((item, index) => {
            //             if (item.userid == element.userid) {
            //                 this.userData.splice(index, 1);
            //             }
            //         })
            //     });
            // },
            save() {
                if (this.title == '添加信息') {
                    var _this = this;
                    let user = {
                        counit: "",
                        unitphone: "",
                        resmoney: "",
                        bigbed: "",
                        twobed: ""
                    };
                    user.counit = _this.addform.counit;
                    user.unitphone = _this.addform.unitphone;
                    user.resmoney = _this.addform.resmoney;
                    user.bigbed = _this.addform.bigbed;
                    user.twobed = _this.addform.twobed;
                    addAdmin(user).then(response => {
                        alert(response.data.msg);
                        // this.userData=response.data.data;》
                        _this.userData.push(user);
                        this.dialogVisible = false;
                        this.reload();
                    });
                } else if (this.title == '修改信息') {
                    var _this = this;
                    let user = {
                        counit: "",
                        unitphone: "",
                        resmoney: "",
                        bigbed: "",
                        twobed: ""
                    };
                    user.id = _this.addform.id;
                    user.counit = _this.addform.counit;
                    user.unitphone = _this.addform.unitphone;
                    user.resmoney = _this.addform.resmoney;
                    user.bigbed = _this.addform.bigbed;
                    user.twobed = _this.addform.twobed;
                    updateAdmin(user).then(response => {
                        alert(response.data.msg);
                        this.dialogVisible = false;
                        this.reload();
                    })
                }
                ;
            },
            getList() {
                var _this = this;
                getList().then(res => {
                    // console.log("this is res:"+res);

                    //  console.log("this is res.data:"+res.data.data);
                    this.userData = res.data.data;
                })
            },
            addUser() {
                this.title = "添加信息";
                this.addform.id = "";
                this.addform.counit = "";
                this.addform.unitphone = "";
                this.addform.resmoney = "";
                this.addform.bigbed = "";
                this.addform.twobed = "";
                this.dialogVisible = true;
            },
            handleEdit(index, rows) {
                this.title = "修改信息";
                this.addform.id = rows.id;
                this.addform.counit = rows.counit;
                this.addform.unitphone = rows.unitphone;
                this.addform.resmoney = rows.resmoney;
                this.addform.bigbed = rows.bigbed;
                this.addform.twobed = rows.twobed;
                this.dialogVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                console.log(`每页 ${val} 条`);
                this.getList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
                this.getList();
            },
        }
    };

</script>

<style scoped>
    .topRow {
        margin-bottom: 10px;
        float: left;
    }
</style>

