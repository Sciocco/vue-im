const state= {
    userName:"",
    sessionToken:"",
    WebIM:null
}
const getters= {
  userName :()=>{
    return state.userName;
  },
  sessionToken: ()=> {
    return state.sessionToken;
  },
  WebIM: ()=> {
    return state.WebIM;
  }
}
const mutations= {
  set_name :(state, anotherName) =>{
    state.userName = anotherName;
  },
  set_token: (state, sessionToken) =>{
    state.sessionToken = sessionToken;
  },
  set_im: (state,WebIM) =>{
    state.WebIM = WebIM;
  }
}
const actions= {
  setName :({commit},anotherName) =>{
    commit("set_name", anotherName);
  },
  setToken : ({commit},token) =>{
    commit("set_token", token);
  },
  setWebIM : ({commit},WebIM) =>{
    commit("set_im", WebIM);
  }
}
export default {
     namespaced:false,
     state,
     getters,
     mutations,
     actions
}
