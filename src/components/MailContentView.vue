<template>
    <div class="my-card" style="height: 400px;">
    <p></p>
    <h1>邮件内容</h1>
    <h1>{{nowSubject}}</h1>
    <el-input style="width:80%" v-model="x.bodynum"></el-input>
    <el-input style="width:80%" v-model="Content.TextContentList[0]"></el-input>
    <el-input style="width:80%" v-model="Content.AttachNameList"></el-input>
    </div>
    <div class="my-card" style="height: 200px;">
    <p></p>
    <h1>您想查看第几个附件: </h1>
    <b>{{ mailfnum }}</b>
    <p></p>
    <input v-model="mailfnum" placeholder="请输入附件序号：" />
    <p></p>
    <el-button @click="readMultipartFile(this.mailfnum)">确定</el-button>
    </div>
</template>

<script>
  import axios from 'axios'
  import { reactive, ref } from 'vue';
  //axios.defaults.headers.common["token"] = localStorage.getItem("token");

  const mailReceiveHost0=localStorage.getItem("nowProtocal")!=0?
      localStorage.getItem("IMAPmailReceiveHost"):localStorage.getItem("POPmailReceiveHost")

  var nowSubject=ref("")
  //var x=ref("");

  //console.log(x)
  export default{
    name:'getMailContent',
    data(){
      return{
        Content:{},
        ContentInfo:{},
        mailfnum: '',
        tt: '',
        x:""
      }
    },
    created(){
      nowSubject=localStorage.getItem("nowSubject")
      this.readOtherContent();
      this.readContentInfo();
    },
    mounted(){
      x=localStorage.getItem("nowSubject");
    },
    methods:{

      readOtherContent(){
        axios({
          url:"http://localhost:8080/readOtherContent",
          method:"post",
          data:{
            userName:localStorage.getItem("userName"),
            password:localStorage.getItem("password"),
            mailReceiveHost:mailReceiveHost0,
            msgnum:localStorage.getItem("nowRead"),
            protocal:localStorage.getItem("nowProtocal")
          },
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem("token")
          }
        }).then((Response)=>{
          console.log(Response.data);
          this.Content=Response.data;
          console.log(this.Content);
        })
      },
      readContentInfo(){
        axios({
          url:"http://localhost:8080/getContentInfo",
          method:"post",
          data:{
            userName:localStorage.getItem("userName"),
            password:localStorage.getItem("password"),
            mailReceiveHost:mailReceiveHost0,
            msgnum:localStorage.getItem("nowRead"),
            protocal:localStorage.getItem("nowProtocal")
          },
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem("token")
          }
        }).then((Response)=>{
          console.log("die");
          console.log(Response.data);
          this.ContentInfo=Response.data;
        })
      },
      readMultipartFile(val){
        axios({
          url:"http://localhost:8080/readMultipartContent",
          method:"post",
          responseType: "blob",
          data:{
            userName:localStorage.getItem("userName"),
            password:localStorage.getItem("password"),
            mailReceiveHost:mailReceiveHost0,
            msgnum:localStorage.getItem("nowRead"),
            protocal:localStorage.getItem("nowProtocal"),
            bodynum:val
          },
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem("token")
          }
        }).then((Response)=>{
          console.log("读取附件");
          console.log(Response.data);
          const data = Response.data;
          let blob = new Blob([data]);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", Response.headers["content-disposition"].split("=")[1]);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link)
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

@import "@/style/my-card.scss";

</style>
