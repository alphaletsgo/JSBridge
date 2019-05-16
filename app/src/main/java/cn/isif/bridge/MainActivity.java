package cn.isif.bridge;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {
    WebView webView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        webView = findViewById(R.id.web);
        initView();
    }

    public void initView(){
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        webView.addJavascriptInterface(new JavaScriptInterface(),"android");
        webView.setWebChromeClient(new WebChromeClient());
        webView.loadUrl("file:///android_asset/test.html");
    }

    public class JavaScriptInterface{
        @JavascriptInterface
        public String tstString(String params){
            return params;
        }
    }
}
