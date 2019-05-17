package cn.isif.bridge.bridge;

import android.text.TextUtils;

public class Message {
    public String handler;
    public String action;
    public String params;
    public String callbackId;
    public String callbackFunction;

    public boolean isCallbackMessage() {
        return !TextUtils.isEmpty(callbackId) && !TextUtils.isEmpty(callbackFunction);
    }
}
