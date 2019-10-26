<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" class="login-page" :rules="rules">
      <h2>未来酒店管理系统</h2>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="form.username" type="username" placeholder="请输入用户名">
          <el-button slot="prepend" icon="el-icon-user"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="密  码:" prop="username">
        <el-input v-model="form.password" type="password" placeholder="请输入密码">
          <el-button slot="prepend" icon="el-icon-key"></el-button>
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="login" >用户登陆</el-button>
    </el-form>
  </div>
</template>


<script>
import { userlogin } from "@/api/user/userlogin.js";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            username: this.form.username,
            password: this.form.password
          };
           // if (this.form.username=='123',this.form.password=='123'){
           //   this.$router.push("/system");
           // }
          userlogin(data).then(response => {
            console.log(response);
            if (response.data.status == 0) {
              this.$router.push("/system");
            }
            else {
              alert(response.data.msg);
            }
          });
        }
      });
    }
  }
};
</script>


<style scoped>
.container {
  margin-top: 200px;
  width: 100%;
  height: 100%;
}
.login-page {
  border-radius: 20px;
  margin: auto;
  width: 350px;
  padding: 35px 55px 15px;
  background: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 25px;
}
</style>
