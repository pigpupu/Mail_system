<template>
  <div style="height:100%;display:flex;background-color: #eff4f9;">
    <el-card style="width:40%;height:50%;margin:auto;display:flex;">
      <div style="margin:auto;display:flex;height:100%;">
        <el-form :model="r.loginform" style="margin:auto;width:100%;">
          <el-form-item>
            <h2 style="color:deepskyblue">电子邮件收发系统</h2>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input v-model="r.loginform.account" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="r.loginform.password" />
          </el-form-item>
          <el-form-item style="display:flex">
            <el-button type="primary" style="margin:auto;width:100%" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>

</template>

<script setup>
import { onMounted, reactive } from 'vue';
import {useRouter} from 'vue-router'
import axios from 'axios'

const router =useRouter();

var r = reactive({
  loginform: {
    account: "",
    password: ""
  }
})

//axios.defaults.headers.common["token"] = localStorage.getItem("token");

function login() {

  axios({
    url:"http://localhost:8080/login",
    data:{
      account:r.loginform.account,
      userPassword:r.loginform.password
      },
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      }
    })
    .then((Response)=>{
    if(Response.data.code == 200){
      //succese
      console.log(Response)
      localStorage.setItem("token",Response.data.result)
      console.log(localStorage.getItem("token"))
      router.push({path:"/home"})
    } else {
      alert("error")
      console.log(Response)
    }
  })
}

// onMounted(()=>{
//   console.log(r.loginform.account)
//   console.log(r.loginform.password)
// })

</script>

<style scoped>

.el-card {
  --el-card-border-radius: 16px;
}

:deep().el-card__body {
  display: flex;
  width: 100%;
  height: 100%;
}

</style>
