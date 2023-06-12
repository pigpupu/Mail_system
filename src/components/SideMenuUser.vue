<template>
  <el-menu mode="horizontal" :default-active="route.path" :router="true" :ellipsis="false">
    <el-menu-item index="/mailconfig">
      <template #title>
        <el-icon>
          <EditPen />
        </el-icon>
        <span>config</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/write">
      <template #title>
        <el-icon>
          <EditPen />
        </el-icon>
        <span>Write</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/recieve">
      <template #title>
        <el-icon>
          <Message />
        </el-icon>
        <span>Recieve</span>
      </template>
    </el-menu-item>

  </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { EditPen, Message } from '@element-plus/icons-vue';

const route = useRoute();

</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>
