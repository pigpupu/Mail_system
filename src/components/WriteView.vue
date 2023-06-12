<template>
  <el-container>
    <el-header style="display:flex">
      <el-button @click="send">send</el-button>
      <el-button @click="timesend">time send</el-button>
      <el-button @click="save">save</el-button>
      <el-button @click="clear">clear</el-button>
    </el-header>
    <div class="demo-datetime-picker">
    <div class="block">
      <span class="demonstration">发送时间</span>
      <el-date-picker
        v-model="r.letterForm.sendDate"
        value-format="YYYY-MM-DD hh:mm:ss"
        type="datetime"
        placeholder="Select date and time"
      />
    </div>
  </div>
    <el-main>
      <el-form label-width="60px" label-position="left" :model="r.letterForm">
        <el-form-item label="收件人">
          <el-input style="width:80%" v-model="r.letterForm.tos"></el-input>
        </el-form-item>
        <el-form-item label="主题">
          <el-input style="width:80%" v-model="r.letterForm.subject"></el-input>
        </el-form-item>
        <el-form-item label="正文">
          <el-input style="width:80%" type="textarea" :rows="20" v-model="r.letterForm.textContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload v-model:file-list="fileList" action="#"
        multiple :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
        :on-exceed="handleExceed" :http-request="upload">
        <el-button type="primary">upload files</el-button>
      </el-upload>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>


</template>

<script setup>
import axios from 'axios'
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'


var r = reactive({
  letterForm: {
    tos: "",
    subject: "",
    textContent: "",
    file: "",
    sendDate:""
  },
  rules: {
    tos: [{ required: true, message: "请输入目的邮箱", trigger: 'blur' },
    { pattern: /^(1[3-9]{1}[0-9]{9})|(([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+)$/, message: "请正确输入邮箱号", trigger: 'blur' }],
    subject: [{ required: true, message: "请输入主题", trigger: 'blur' }],
    textContent: [{ required: true, message: "请输入正文", trigger: 'blur' }],
  }
})


const fileList = ref([])
const filedata = new FormData();
const defaultTime = new Date(2022, 11, 18, 12, 0, 0)

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

function upload() {
  if(fileList._rawValue.length > 0) {
    for(var i = 0;i < fileList._rawValue.length;i++) {
      filedata.append("files",fileList._rawValue[i].raw)
    }
    console.log("hihi");
    console.log(filedata.get("files"));
  }
}

function send() {
  axios({
    url: "http://localhost:8080/basicSend",
    method: 'post',
    data: {
      mailSendHost: localStorage.getItem("mailSendHost"),
      userName: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
      tos: r.letterForm.tos,
      subject: r.letterForm.subject,
      textContent: r.letterForm.textContent,
      attachContent:filedata.get("files"),
      multipartFile:filedata
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': localStorage.getItem("token")
    }
  }).then((Response) => {
    console.log(Response.data);
    console.log(Response.data.code)
    if (Response.data.code = 200) {
      alert("send success")
    } else {
      alert("send failed")
    }
  })
}

function timesend() {
  axios({
    url: "http://localhost:8080/timeSend",
    method: 'post',
    data: {
      mailSendHost: localStorage.getItem("mailSendHost"),
      userName: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
      tos: r.letterForm.tos,
      subject: r.letterForm.subject,
      textContent: r.letterForm.textContent,
      attachContent:filedata.get("files"),
      sendDate:r.letterForm.sendDate
      //multipartFile:filedata
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': localStorage.getItem("token")
    }
  }).then((Response) => {
    console.log(Response.data);
    console.log(Response.data.code)
    if (Response.data.code = 200) {
      alert("send success")
    } else {
      alert("send failed")
    }
  })
}

function save() {
  console.log(r.letterForm.sendDate)

}

function clear() {
  r.letterForm.tos = "";
  r.letterForm.subject = "";
  r.letterForm.textContent = "";
}

</script>

<style scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
