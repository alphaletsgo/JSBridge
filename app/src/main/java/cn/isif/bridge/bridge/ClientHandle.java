package cn.isif.bridge.bridge;

import android.util.Log;

import java.lang.reflect.Method;

public class ClientHandle {
    public static Object invoke(String methodName,String ... params)throws Exception{
            Class<?> clazz = Class.forName("cn.isif.bridge.bridge.ClientHandle");
            Method method = clazz.getMethod(methodName,String.class);
            return method.invoke(null,params);
    }
    public static Object invoke(String methodName)throws Exception{
        Class<?> clazz = Class.forName("cn.isif.bridge.bridge.ClientHandle");
        Method method = clazz.getMethod(methodName,null);
        return method.invoke(null,null);
    }

    public static void nativeLog(String msg){
        Log.d("WebView",":"+ msg );
    }

    public static String getUserID(){
        return "id:4831571";
    }
}
