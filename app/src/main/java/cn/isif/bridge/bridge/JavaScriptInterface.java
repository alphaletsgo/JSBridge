package cn.isif.bridge.bridge;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import org.json.JSONObject;

public class JavaScriptInterface {
    WebView webView;
    Context context;

    public JavaScriptInterface(Context context, WebView webView) {
        this.webView = webView;
        this.context = context;
    }

    @JavascriptInterface
    public String handleMessage(String params) {
        Log.d("JavaScriptInterface",params);
        try {
            JSONObject jsonObject = new JSONObject(params);
            String action = jsonObject.getString("action");
            String pm = jsonObject.getString("params");
            String callbackId = jsonObject.getString("callbackId");
            String callbackFunction = jsonObject.getString("callbackFunction");
            if (!TextUtils.isEmpty(callbackId) && !TextUtils.isEmpty(callbackFunction)) {
                String call = "javascript:" + callbackFunction + "(" + callbackId + "," + System.currentTimeMillis() + ")";//JS此方法的返回值会通过onReceiveValue回调到原生
                new Handler(Looper.getMainLooper()).post(() -> webView.evaluateJavascript(call, value -> {
                    Log.i("bqt", "ValueCallback 是否发生在主线程：" + (Looper.myLooper() == Looper.getMainLooper()));//true
                    Toast.makeText(context, "【onReceiveValue】" + value, Toast.LENGTH_SHORT).show();
                }));
            }
            return ClientHandle.invoke(action).toString();
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
}
