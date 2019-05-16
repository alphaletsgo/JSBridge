var msgCallbackMap = [];
function callbackDispatcher(callbackId,params){
    var handler = this.msgCallbackMap[callbackId];
    if(handler && typeof(handler) === 'function'){
        console.log(params);
        var resultObj = params ? JSON.parse(params) : {};
        handler(resultObj);
    }
}

function sendMessage(data){
    return window.android.handleMessage(JSON.stringify(data));
}

function testCallback(params){
    window.alert('native回调返回：'+ params);
}


function sendMessageTest(){
    var msgBody = {};
    msgBody.handler = 'common';
    msgBody.action = 'getUserID';
    msgBody.params = "massage content";
    var callbackId = '111';
    this.msgCallbackMap[callbackId] = testCallback;
    msgBody.callbackId = callbackId;
    msgBody.callbackFunction = 'callbackDispatcher';
    sendMessage(msgBody);
}

