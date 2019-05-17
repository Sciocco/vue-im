'use strict';

import {getCookie} from '@/utils/cookieUtils';

class WebIMInstance {
    // 
    version = "1.0.0";
    // im连接实例
    content;
    // im连接参数
    connectOptions;
    // im

    created() {
        return !!this.content;
    }
    // 创建连接
    createIM(){
        if(this.content){
            console.error("请勿重复创建WebIM");
            return;
        }
        this.content = new WebIM.connection({
            https: WebIM.config.https,
            url: WebIM.config.xmppURL,
            isAutoLogin: WebIM.config.isAutoLogin,
            isMultiLoginSessions: WebIM.config.isMultiLoginSessions
        });
    }
    // 重连
    reConnect() {
        if(!this.content) {
            this.createIM();
        }
        this.content.open(this.connectOptions);
    }
    // 注册
    registerUser(options) {
        if(!this.content) {
            this.createIM();
        }
        this.content.registerUser(options);
    }
    // 登入
    login(options) {
        if(!this.content) {
            this.createIM();
        }
        this.connectOptions = options;
        this.content.open(options)
    }
    // 登出
    logout() {
        this.content.close('logout');
    }
    // 自动登陆
    autoLogin() {
        let username = getCookie("user");
        let password = getCookie("pwd");
        var options = {
            apiUrl: WebIM.config.apiURL,
            user: username,
            pwd: password,
            appKey: WebIM.config.appkey
        };
        this.login(options);
    }
    // 侦听ws返回
    listen (options) {
        // 抛出异常
        this.content.listen(options);
    }
    // 获取消息id
    getMsgId() {
        this.content.getUniqueId();
    }
    message() {
        
    }
    // 发送消息
    sendMessage (obj) {
        this.content.send(obj);
    }
    // 获取好友列表
    getFriendList(option) {
        this.content.getRoster(option);
    }
    // 添加好友
    addFriend(option) {
        this.content.addRoster(option);
    }
}
export default new WebIMInstance();


