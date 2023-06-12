<template>
  <el-container>
    <el-main>
      <div v-if="route.path=='/home'">
      <template style="display:flex">
        <h1 style="margin:auto">welcome to mail system</h1>
      </template>
      </div>
      <div v-else><RouterView /></div>
    </el-main>
    <el-footer style="width:100%">
      <SideMenuUser />
    </el-footer>
  </el-container>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router';
import SideMenuUser from '../components/SideMenuUser.vue'


const router = useRouter()
const route = useRoute()
</script>
