<template>
  <h1>邮箱配置</h1>
  <el-container>
    <el-header style="display:flex">
      <el-button @click="doSubmit">save</el-button>
    </el-header>
    <el-main>
      <el-form label-width="60px" label-position="left" :model="r.letterConfig">
        <el-form-item label="SMTP地址">
          <el-input style="width:80%" v-model="r.letterConfig.mailSendHost"></el-input>
        </el-form-item>
        <el-form-item label="pop3地址">
          <el-input style="width:80%" v-model="r.letterConfig.POPmailReceiveHost"></el-input>
        </el-form-item>
        <el-form-item label="imap地址">
          <el-input style="width:80%" v-model="r.letterConfig.IMAPmailReceiveHost"></el-input>
        </el-form-item>
        <el-form-item label="邮箱账户">
          <el-input style="width:80%" type="email" v-model="r.letterConfig.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input style="width:80%" type="password" :rows="30" v-model="r.letterConfig.password"></el-input>
        </el-form-item>
        <el-form-item label="读取协议">
          <el-input style="width:80%" :rows="30" v-model="r.letterConfig.nowProtocal"></el-input>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive } from 'vue';

    var r = reactive({
      letterConfig:{
        mailSendHost:localStorage.getItem("mailSendHost"),
        userName:localStorage.getItem("userName"),
        password:localStorage.getItem("password"),
        POPmailReceiveHost:localStorage.getItem("POPmailReceiveHost"),
        IMAPmailReceiveHost:localStorage.getItem("IMAPmailReceiveHost"),
        nowProtocal:localStorage.getItem("nowProtocal")
      }
    })

  function doSubmit() {
      localStorage.setItem("mailSendHost",r.letterConfig.mailSendHost)
      localStorage.setItem("userName",r.letterConfig.userName)
      localStorage.setItem("password",r.letterConfig.password)
      localStorage.setItem("POPmailReceiveHost",r.letterConfig.POPmailReceiveHost)
      localStorage.setItem("IMAPmailReceiveHost",r.letterConfig.IMAPmailReceiveHost)
      localStorage.setItem("nowProtocal",r.letterConfig.nowProtocal)
      alert("保存成功")
    }

</script>

<style scoped>

</style>
