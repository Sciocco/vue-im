<template>
  <div>
    <h2>登录</h2>
    <p>用户名：<input type='text' v-model="username" /></p>
    <p>　密码：<input type='password' v-model="password" /></p>
    <button type="button" name="button" @click="login">登录</button>
  </div>
</template>

<script>
import store from '@/store';
import {setCookie,getCookie} from '@/utils/cookieUtils';

var webIM = store.getters.WebIM;
export default {
  name:'login',
  data() {
    return {
      conn: '',
      username: "",
      password: ''
    }
  },
  created (){
    this.username = getCookie("user");
    this.password = getCookie("pwd");
    webIM.createIM();
    webIM.listen({
       onOpened:()=>{
        console.log("======start======");
        console.info(this);
        console.info(webIM);
        setCookie('user', webIM.content.user);
        setCookie('token', webIM.content.token);
        setCookie('pwd',this.password);
        console.log(webIM.content.user + "登陆成功");
        this.$router.push({name:'user'});
      },
      onClosed: ()=> {
        console.log("关闭");
      }
    });
    
  },
  methods: {
    login: function() {

    var options = {
        apiUrl: WebIM.config.apiURL,
        user: this.username,
        pwd: this.password,
        appKey: WebIM.config.appkey
      };

      webIM.login(options);
    }
  }
}
</script>

<style>


.logo {
  width: 48px;
  height: 48px
}

.wraper {
  height: 480px;
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 20px;
}

.wraper p {
  color: black;
}
</style>
