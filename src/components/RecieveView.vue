<template>
  <h1>读取邮件</h1>
  <el-container>
    <el-header height="10px">
      <span>当前共有{{ InboxInfo.totalNum }}封邮件</span>
    </el-header>
    <el-main>
      <el-button @click="remove">remove</el-button>
      <el-button @click="forward">forward</el-button>
      <el-table ref="mailTable" :data="InboxInfo.simpleInfo" @selection-change="handleSelectionChange" style="width:100%;">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" width="70">
         <template v-slot="scope">
         {{ scope.row.index = scope.$index+1 }}
         </template>
        </el-table-column>
        <el-table-column property="ReplyTo['0'].personal" label="name" width="180" />
        <el-table-column property="subject" label="subject" width="180" />
        <el-table-column property="ReplyTo['0'].address" label="sender" width="220" />
        <el-table-column property="receiveDate" label="receiveDate" width="180" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import { useRouter } from "vue-router"

const router = useRouter();

const mailReceiveHost0=localStorage.getItem("nowProtocal")!=0?
      localStorage.getItem("IMAPmailReceiveHost"):localStorage.getItem("POPmailReceiveHost")

var nowdelIds=[];

export default{
  name:'receive',
  data(){
    return{
      InboxInfo:{},
      dataonLineListSelections: [],
    }
  },
  created(){
    this.getInboxInfo();
  },
  methods:{
    getInboxInfo(){
      axios({
        url:"http://localhost:8080/getInboxInfo",
        method:"post",
        data:{
          userName:localStorage.getItem("userName"),
          password:localStorage.getItem("password"),
          mailReceiveHost:mailReceiveHost0,
          protocal:localStorage.getItem("nowProtocal")
        },
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token")
        }
      }).then((Response)=>{
        console.log(Response.data);
        this.InboxInfo=Response.data;
      })
    },
    forward(){
      this.$router.push('/mailcontent')
    },
    remove(){
      console.log("dsa");
      console.log(nowdelIds);
      axios({
        url:"http://localhost:8080/delMessages",
        method:"post",
        data:{
          userName:localStorage.getItem("userName"),
          password:localStorage.getItem("password"),
          mailReceiveHost:mailReceiveHost0,
          protocal:localStorage.getItem("nowProtocal"),
          delIds:nowdelIds
        },
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token")
        }
      }).then((Response)=>{
        console.log(Response.data);
      })
    },
    handleSelectionChange (val) {
       this.dataonLineListSelections = val[0].index;

       nowdelIds.push(val[0].index)
       console.log("push"+val[0].index)
       console.log("there");
       console.log(val[0]);
       console.log(val[1])
       console.log(val[0].index);

       localStorage.setItem("nowRead",val[0].index);
       localStorage.setItem("nowSubject",val[0].subject);
       localStorage.setItem("nowReceiveDate",val[0].receiveDate);
       localStorage.setItem("nowSender",val[0].ReplyTo[0].address);
    }
  }
}

</script>
