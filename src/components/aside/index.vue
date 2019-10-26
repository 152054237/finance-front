<template>
    <!--菜单组件-->
    <div class="aside">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :unique-opened='true'
                @open="handleOpen"
                @close="handleClose"
        >
            <!--子菜单：xx管理-->
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-date"></i>
                    <span>酒店管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="checkin" class="el-icon-document">客人入住管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="1-2" @click="counit" class="el-icon-edit-outline">协议单位</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <!--子菜单：xx管理-->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>xx管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">xxxx</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="2-2">xxxx</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <!--子菜单：xx管理-->
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>xx管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">xxxx</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="3-2">xxxx</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <!--子菜单：xx管理-->
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>xx管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">xxxx</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="1-2">xxxx</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>


<script>

    export default {
        data() {
            return {};
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            checkin() {
                this.$router.push("/system/hotel");
            },
            counit(){
                this.$router.push("/system/unit");
            }
        }
    };
</script>

<style scoped>
</style>
