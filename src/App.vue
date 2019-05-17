<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from '@/store';
import WebIM from "@/im/index";

// 保存im实例
store.dispatch("setWebIM",WebIM);

export default {
  name: 'App',
  data: function () {
    return {};
  }
}
</script>

<style>
html,body,h1,h2,p,div,ul,li {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  width: 80%;
  color:#303133;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color:#303133;
  text-decoration: none;
}
</style>
