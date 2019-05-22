var msgCallbackMap = [];
function callbackDispatcher(callbackId,params){
    var handler = this.msgCallbackMap[callbackId];
    if(handler && typeof(handler) === 'function'){
        console.log(params);
        var resultObj = params ? JSON.parse(params) : {};
        handler(resultObj);
    }
    delete this.msgCallbackMap[callbackId];
}

//获取系统类型
function getOS(){
    var u = navigator.userAgent;
//    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
        return 'Android';
    }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        return 'iOS';
    }
}

function sendSyncMessage(data){
    if(getOS()=='Android'){
        return window.android.handleSyncMessage(JSON.stringify(data));
    }else{
        //ios
        window.webkit.messageHandlers.WKJSBridge.postMessage(JSON.stringify(data));
    }

}

function sendAsyncMessage(data){
    if(getOS()=='Android'){
        return window.android.handleAsyncMessage(JSON.stringify(data));
    }else{
        //ios
        window.webkit.messageHandlers.WKJSBridge.postMessage(JSON.stringify(data));
    }
}

function getCallbackId(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp;
}

function testCallback(params){
    window.alert('native回调返回：'+ params);
}
//发送同步无回调消息
function sendSyncNormalMessage(){
    var msgBody = {};
    msgBody.handler = 'Common';
    msgBody.action = 'nativeLog';
    msgBody.params = "massage content";
    window.alert(sendSyncMessage(msgBody));
}

//发送同步回调消息
function sendSyncCallbackMessage(){
    var msgBody = {};
    msgBody.handler = 'Core';
    msgBody.action = 'getUserID';
    msgBody.params = "";
    var callbackId = getCallbackId();
    this.msgCallbackMap[callbackId] = testCallback;
    msgBody.callbackId = callbackId;
    msgBody.callbackFunction = 'callbackDispatcher';
    sendSyncMessage(msgBody);
}
//发送异步无回调消息
function sendAsyncNormalMessage(){
    var msgBody = {};
    msgBody.handler = 'Common';
    msgBody.action = 'nativeLog';
    msgBody.params = "massage content";
    sendAsyncMessage(msgBody);
}
//发送异步有回调消息
function sendAsyncCallbackMessage(){
    var msgBody = {};
    msgBody.handler = 'Core';
    msgBody.action = 'getUserID';
    msgBody.params = "";
    var callbackId = getCallbackId();
    this.msgCallbackMap[callbackId] = testCallback;
    msgBody.callbackId = callbackId;
    msgBody.callbackFunction = 'callbackDispatcher';
    sendAsyncMessage(msgBody);
}


