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
            <el-table-column align="center" prop="userid" label="编号" width="60"></el-table-column>
            <el-table-column align="center" prop="time" label="入住时间" width="120"></el-table-column>
            <el-table-column align="center" prop="platform" label="平台" width="80"></el-table-column>
            <el-table-column align="center" prop="romno" label="房间号" width="90"></el-table-column>
            <el-table-column align="center" prop="name" label="入住人" width="80"></el-table-column>
            <el-table-column align="center" prop="romtype" label="房型" width="60"></el-table-column>
            <el-table-column align="center" prop="paymoney" label="实付金额" width="80"></el-table-column>
            <el-table-column align="center" prop="money" label="到账金额" width="80"></el-table-column>
            <el-table-column align="center" prop="brokerage" label="备注" width="180"></el-table-column>
            <el-table-column align="center" prop="day" label="入住时长" width="80"></el-table-column>
            <el-table-column align="center" prop="classes" label="班次" width="80"></el-table-column>
            <el-table-column align="center" prop="person" label="值班人" width="80"></el-table-column>
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
            <el-form ref="addform" :model="addform" label-width="80px">

                <el-form-item label="入住时间">
                    <el-input v-model="addform.time"
                              align="right"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions1"></el-input>
                </el-form-item>
                <el-form-item label="平台">
                    <el-select v-model="addform.platform" placeholder="选择平台">
                        <el-option label="散客" value="散客"></el-option>
                        <el-option label="美团" value="美团"></el-option>
                        <el-option label="携程" value="携程"></el-option>
                        <el-option label="协议单位" value="协议单位"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间号">
                    <el-input v-model="addform.romno"></el-input>
                </el-form-item>
                <el-form-item label="入住人">
                    <el-input v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="房型">
                    <el-select v-model="addform.romtype" placeholder="选择房型">
                        <el-option label="精致" value="精致"></el-option>
                        <el-option label="简约" value="简约"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实付金额">
                    <el-input v-model="addform.paymoney"></el-input>
                </el-form-item>
                <el-form-item label="到账金额">
                    <el-input v-model="addform.money"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addform.brokerage"></el-input>
                </el-form-item>
                <el-form-item label="入住天数">
                    <el-input v-model="addform.day"></el-input>
                </el-form-item>
                <el-form-item label="班次">
                    <el-select v-model="addform.classes" placeholder="选择班次">
                        <el-option label="全天" value="全天"></el-option>
                        <el-option label="白班" value="白班"></el-option>
                        <el-option label="夜班" value="夜班"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="当班人">
                    <el-input v-model="addform.person" placeholder="当班人"></el-input>
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
    import {addAdmin, getList, updateAdmin, deleteAdmin} from "@/api/hotel/hotel.js";

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
                    userid: "",
                    time: "",
                    platform: "",
                    romno: "",
                    name: "",
                    romtype: "",
                    paymoney: "",
                    money: "",
                    brokerage: "",
                    day: "",
                    classes: "",
                    person: ""
                },
                title: "",
                userData: [],

                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            };
        },
        created() {
            this.getList();
        },
        methods: {

            handleChange(value) {
                console.log(value);
            },

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
                if (this.title == '添加客人信息') {
                    var _this = this;
                    let user = {
                        time: "",
                        platform: "",
                        romno: "",
                        name: "",
                        romtype: "",
                        paymoney: "",
                        money: "",
                        brokerage: "",
                        day: "",
                        classes: "",
                        person: ""
                    };
                    user.time = _this.addform.time;
                    user.platform = _this.addform.platform;
                    user.romno = _this.addform.romno;
                    user.name = _this.addform.name;
                    user.romtype = _this.addform.romtype;
                    user.paymoney = _this.addform.paymoney;
                    user.money = _this.addform.money;
                    user.brokerage = _this.addform.brokerage;
                    user.day = _this.addform.day;
                    user.classes = _this.addform.classes;
                    user.person = _this.addform.person;
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
                        time: "",
                        platform: "",
                        romno: "",
                        name: "",
                        romtype: "",
                        paymoney: "",
                        money: "",
                        brokerage: "",
                        day: "",
                        classes: "",
                        person: ""
                    };
                    user.userid = _this.addform.userid;
                    user.time = _this.addform.time;
                    user.platform = _this.addform.platform;
                    user.romno = _this.addform.romno;
                    user.name = _this.addform.name;
                    user.romtype = _this.addform.romtype;
                    user.paymoney = _this.addform.paymoney;
                    user.money = _this.addform.money;
                    user.brokerage = _this.addform.brokerage;
                    user.day = _this.addform.day;
                    user.classes = _this.addform.classes;
                    user.person = _this.addform.person;
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
                this.title = "添加客人信息";
                this.addform.userid = "";
                this.addform.time = "";
                this.addform.platform = "";
                this.addform.romno = "";
                this.addform.name = "";
                this.addform.romtype = "";
                this.addform.paymoney = "";
                this.addform.money = "";
                this.addform.brokerage = "";
                this.addform.day = "";
                this.addform.classes = "";
                this.addform.person = "";
                this.dialogVisible = true;
            },
            handleEdit(index, rows) {
                this.title = "修改信息";
                this.addform.userid = rows.userid;
                this.addform.time = rows.time;
                this.addform.platform = rows.platform;
                this.addform.romno = rows.romno;
                this.addform.name = rows.name;
                this.addform.romtype = rows.romtype;
                this.addform.paymoney = rows.paymoney;
                this.addform.money = rows.money;
                this.addform.brokerage = rows.brokerage;
                this.addform.day = rows.day;
                this.addform.classes = rows.classes;
                this.addform.person = rows.person;
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
