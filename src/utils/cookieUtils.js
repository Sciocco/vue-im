// cookie 操作
export function  getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
　　 return (arr=document.cookie.match(reg))?decodeURIComponent(arr[2]):null;
}

export function setCookie(name,value) {
    document.cookie = name + "="+ encodeURIComponent(value) + ";";
}