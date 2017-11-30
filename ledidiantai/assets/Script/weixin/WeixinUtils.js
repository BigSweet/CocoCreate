
export default class WeixinUtils {
    //功能菜单:
    static MenuItems = [
        "menuItem:share:qq",//分享到QQ
        "menuItem:share:weiboApp",//分享到Weibo
        "menuItem:favorite",//收藏
        "menuItem:share:facebook",//分享到FB
        "menuItem:share:QZone",//分享到 QQ 空间
        "menuItem:editTag",//编辑标签
        "menuItem:delete",//删除
        "menuItem:copyUrl",//复制链接
        "menuItem:originPage",//原网页
        "menuItem:readMode",//阅读模式
        "menuItem:openWithQQBrowser",//在QQ浏览器中打开
        "menuItem:openWithSafari",//在Safari中打开
        "menuItem:share:email",//邮件
        "menuItem:share:brand"//一些特殊公众号
    ];
    //功能菜单:备份列表
    static MenuItems_Backup = [
        "menuItem:share:appMessage",//发送给朋友
        "menuItem:share:timeline",//分享到朋友圈
        "menuItem:share:qq",//分享到QQ
        "menuItem:share:weiboApp",//分享到Weibo
        "menuItem:favorite",//收藏
        "menuItem:share:facebook",//分享到FB
        "menuItem:share:QZone",//分享到 QQ 空间
        "menuItem:editTag",//编辑标签
        "menuItem:delete",//删除
        "menuItem:copyUrl",//复制链接
        "menuItem:originPage",//原网页
        "menuItem:readMode",//阅读模式
        "menuItem:openWithQQBrowser",//在QQ浏览器中打开
        "menuItem:openWithSafari",//在Safari中打开
        "menuItem:share:email",//邮件
        "menuItem:share:brand"//一些特殊公众号
    ];

    /**是否屏蔽微信环境下的基础菜单功能 */
    static showOrHideBaseMenuItem(/**@type {boolean}*/isShow){
        if(isShow) {          
            wx.showAllNonBaseMenuItem();//显示所有功能按钮接口
        }else {
            wx.hideAllNonBaseMenuItem();//隐藏所有非基础按钮接口，“基本类”按钮详见附录3  
        }
    }


    /**屏蔽微信环境下的右上角，分享功能 */
    static blockShare(){
        try {
            if(WeixinUtils.isWeiXin()) {
                function onBridgeReady() { 
                    WeixinJSBridge.call('hideOptionMenu'); 
                }
                 
                if (typeof WeixinJSBridge == "undefined") { 
                    if (document.addEventListener) { 
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false); 
                    } else if (document.attachEvent) { 
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady); 
                    }
                } else { 
                    onBridgeReady(); 
                }
            }
    
            WeixinJSBridge.invoke('getNetworkType',{},function(e){
                // 在这里拿到e.err_msg，这里面就包含了所有的网络类型
                console.log(e.err_msg);
                //e.err_msg的取值如下所示: network_type:wifi wifi网络 2 network_type:edge 非wifi,包含3G/2G 3 network_type:fail 网络断开连接 4 network_type:wwan 2g或者3g
             });
        } catch (error) {
            console.log("Weixin error:"+error);
        }
    }

    /**@return {string} */
    static getQueryString(url, name) {
        var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
        var r = url.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }

    /**@return {boolean} */
    static isWeiXin() {
        var ua = navigator.userAgent.toString();

        var str=ua.match(/MicroMessenger/i);
        if(str=="MicroMessenger") {
            return true;
        } else {
            return false;
        }
    }
}