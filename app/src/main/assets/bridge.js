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

function sendSyncMessage(data){
    return window.android.handleSyncMessage(JSON.stringify(data));
}

function sendAsyncMessage(data){
    return window.android.handleAsyncMessage(JSON.stringify(data));
}

function getCallbackId(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp;
}

function testCallback(params){
    window.alert('native回调返回：'+ params);
}

function sendSyncNormalMessage(){
    var msgBody = {};
    msgBody.handler = 'Common';
    msgBody.action = 'nativeLog';
    msgBody.params = "massage content";
    window.alert(sendSyncMessage(msgBody));
}


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

function sendAsyncNormalMessage(){
    var msgBody = {};
    msgBody.handler = 'Common';
    msgBody.action = 'nativeLog';
    msgBody.params = "massage content";
    sendAsyncMessage(msgBody);
}

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


