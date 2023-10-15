<template>
  <TimeVue />
  <el-card>
    <template #header>
      <strong><span>争分夺秒吧！少年！</span></strong>
    </template>
    团队报名系统
    <strong>
      <p class="a">拥有一颗奔腾的心！（没有毒鸡汤你让前端怎么活！！</p>
    </strong>
  </el-card>
  <el-card>
    <el-text>
      <Sentences />
    </el-text>
  </el-card>
</template>

<script setup lang="ts">
import TimeVue from '../components/time.vue';
import Sentences from '../components/sentences.vue';
</script>

<style scoped>
.el-card {
  margin-bottom: 100px;
  margin-top: 50px;
  width: 600px;
}

.el-card:last-child {
  margin-bottom: 0;
}

.a {
  font-style: italic;
}
</style>
