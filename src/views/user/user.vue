<template>
<div>
  <h2>当前用户：{{username}}</h2>
  <div class="window">
    <div class="friends">
      好友列表
      <ul>
        <li v-for="friend in friends" :key="friend.name" @click="selectedEvt" class="friendName">{{friend.name}}</li>
      </ul>
    </div>
    <div class="char" v-show="selected!==''">
      <div class="message">
        <p>正在和 {{selected}} 聊天</p>
        <div class="messageAll">
          <div v-for="message in messages " :key="message.from" class="newMessage" :class="{'owner': message.from == username}">
            {{message.from}}: {{message.data}}
          </div>
        </div>
      </div>
      <div class="messageInput">
        <textarea id="msg" @keydown.enter.prevent="sendMessage"></textarea>
      </div>
    </div>
  </div>
  <button @click="logout">退出登录</button>

</div>
</template>

<script>
console.log("1");

import store from '@/store';

var webIM = store.getters.WebIM;
if(!webIM.created()){
    //自动登陆
    webIM.autoLogin();
}

export default {
  data() {
    return {
      conn: '',
      username: '',
      friends: '',
      messages: [],
      selected: ''
    };
  },
  computed: {},
  created() {
    console.info(webIM);
    this.username = webIM.content.user;
    webIM.listen({
      onOpened: ()=>{
        webIM.content.setPresence();
        console.log(webIM.content.user + "登陆成功");
        webIM.getFriendList({
            success: ( roster ) =>{
              this.friends = roster;
            },
            error: () =>{

            }
        });
      },
      onClosed: ()=> {
        console.log("onClosed");
        this.$router.push({name: 'index'})
      },
      onTextMessage: (message)=> {
        console.log(message);
        this.messages.push(message);
      },
      //收到表情消息
      onEmojiMessage: (message)=> {
        console.log("收到表情消息");
      },   
      //收到图片消息
      onPictureMessage: (message)=> {
        console.log("收到图片消息");
      }, 
      //收到命令消息
      onCmdMessage: (message)=> {
        console.log("收到命令消息");
      },     
      //收到音频消息
      onAudioMessage: (message)=> {
        console.log("收到音频消息");
      },   
      //收到位置消息
      onLocationMessage: (message)=> {
        console.log("收到位置消息");
      },
      //收到文件消息
      onFileMessage: (message)=> {
        console.log("收到文件消息");
      },    
      //收到视频消息
      onVideoMessage: (message)=> {
        console.log("收到视频消息");
      },   
      //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
      onPresence: (message)=> {
        console.log("收到联系人订阅请求、处理群组、聊天室被踢解散等消息");
      },       
       //处理好友申请
      onRoster: (message)=> {
        console.log("处理好友申请");
      },        
      //处理群组邀请
      onInviteMessage: (message)=> {
        console.log("处理群组邀请");
      },  
      //本机网络连接成功
      onOnline:  ()=> {
        console.log("本机网络连接成功");
      },                
      //本机网络掉线  
      onOffline:  ()=> {
        console.log("本机网络掉线");
      },                 
      onError: (message)=> {
        console.log("回调失败", message);
      }
    });
  },
  watch: {
    'messages': function() {
      this.goBottom();
    }
  },
  mounted() {
    webIM.getFriendList({
      success: ( roster ) =>{
        this.friends = roster;
      },
      error: () =>{

      }
    })
  },
  methods: {
    logout: function() {
      webIM.logout();
      this.$router.push({name: 'index'});
    },
    sendMessage: function() {
      var messageContext = document.getElementById('msg').value;
      var id = webIM.getMsgId();//生成本地消息id
      var msg = new WebIM.message('txt', id);//创建文本消息
      msg.set({
        msg: messageContext,
        to: this.selected,
        type: "chat",
        success:  ( id, serverMsgId )=> {
          console.log("发送成功");
          this.messages.push({from: this.username, to: this.selected, data: messageContext});
          console.log(this.messages);
        }//消息发送成功回调
      });
      webIM.sendMessage(msg.body);
      document.getElementById('msg').value = '';
    },
    selectedEvt: function (event) {
      var friendNames = document.getElementsByClassName('friendName');
      for (var i = 0; i < friendNames.length; i++) {
        friendNames[i].style.backgroundColor = "white";
        friendNames[i].style.color = "red";
      }
      event.target.style.backgroundColor = "red";
      event.target.style.color = "white";
      this.selected = event.target.innerText;
      console.info(this);
      console.log(this.selected);
    },
    goBottom: function() {
      var goBottomDiv = document.getElementsByClassName('messageAll')[0];
      goBottomDiv.scrollTop = goBottomDiv.scrollHeight;
    }
  },
  components: {}
};
</script>

<style lang="css">
.window {
  display: flex;
  flex-grow: 2;
  align-items: stretch;
  margin: 10px 0;
  min-height: 400px;
}

.window>div {
  border: 1px solid #303133;
}

.friends {
  padding: 5px;
  margin-right: 5px;
}
.friendName {
  cursor: pointer;
  margin: 5px 0;
}

.char {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
}

.message {
  display: flex;
  flex-direction: column;
  flex-grow: 5;
  border-bottom: 1px solid #303133;
  max-height: 80%;
}

.message p {
  padding: 5px 0;
  border-bottom: 1px solid #303133;
}
.messageAll {
  /*flex-grow: 2;*/
  overflow-y: auto;
  max-height: 80%;
}

.newMessage {
  text-align: left;
}

.owner {
  text-align: right;
}

.messageInput {
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  justify-content: space-between;
  overflow: hidden;
}

.messageInput textarea{
  width: 100%;
  resize: none;
}
</style>
