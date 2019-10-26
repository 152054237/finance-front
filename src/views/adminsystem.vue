<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-image style="width: 210px; height: 54px" :src="url"></el-image>
                </el-col>
                <el-col :span="8" class="systemword">
                    <h1 >未来酒店财务系统后台</h1>
                </el-col>
                <el-col class="logout" :span="8">
                    <template>
                        <div class="navOperater">
                            <el-link type="info" @click="quit" icon="el-icon-loading">退出系统</el-link>
                        </div>
                        <div class="navOperater">
                            <el-avatar
                                    class="avatar"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            ></el-avatar>
                        </div>
                    </template>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside>
                <Aside/>
            </el-aside>
            <!-- 内容区 -->
            <el-main>
                <template>
                    <router-view/>
                </template>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    // 导入组件
    import Aside from "@/components/aside/adminindex.vue";

    export default {
        name: "adminsystem",
        components: {
            Aside
        },
        data() {
            return {
                url: require("@/logo.png"),
                fits: ["fill", "contain", "cover", "none", "scale-down"]
            };
        },
        methods: {
            quit() {
                this.$router.push("/");
            }
        }
    };
</script>
<style lang="scss" scoped>
    body > .el-container {
        margin-bottom: 40px;
    }

    .container {
        height: 780px;
    }

    .el-header {
        text-align: left;
        background-color: white;

        .logout {
            text-align: right;

            .navOperater {
                width: 80px;
                height: 80px;
                float: right;
                line-height: 50px;
            }
        }
    }

    .el-main {
        background-color: #e9eef3;
        text-align: center;
    }

    .systemword {
        text-align: center;
    }
</style>
