import SignPackage from './SignPackage';

import WeixinShareConstant from './WeixinShareConstant';
import WeixinUtils from './WeixinUtils';

export default class WeixinJSSDK {
    /**@type {Function}*/__audioPlayFuncCallback = null;

    /**@type {SignPackage*/signPackage = null;

    constructor(){
    }

    /**
     * 获取签名分享.
     * //微信 JS 接口签名校验工具:可用
     *       http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 页面工具进行校验。
     *
     */
    initialize(/**@type {SignPackage}*/signPackage) {
        this.signPackage = signPackage;

        //this.signPackage = <SignPackage>JSON.parse(e.target.data);
        this.getWeiXinConfig(this.__audioPlayFuncCallback);//下面会定义

        //下面可以加更多接口,可自行扩展
        //this.getWeiXinShareTimeline();//分享朋友圈
        //this.getWeiXinShareAppMessage();//分享朋友
        //this.getWeiXinShareQQ();//分享QQ
        //this.getWeiXinShareWeiBo();//分享到腾讯微博
        //this.getWeixinShowMenuItems(["menuItem:share:timeline"]);//显示菜单项
        //this.getWeixinHideMenuItems();//隐藏菜单项
    }

    getWeiXinConfig(/**@type {Function}*/audioPlayFuncCallback) {
        this.__audioPlayFuncCallback = audioPlayFuncCallback;
        if(!this.signPackage) return;
        /*
         * 注意：
         * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
         * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
         * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * 如有问题请通过以下渠道反馈：
         * 邮箱地址：weixin-open@qq.com
         * 邮件主题：【微信JS-SDK反馈】具体问题
         * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
         */
        //配置参数
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = WeixinShareConstant.IsDebug;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1
        bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            'hideMenuItems',//批量隐藏功能按钮接口
            'showMenuItems',//批量显示功能按钮接口
            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
            'showAllNonBaseMenuItem',//显示所有功能按钮接口
            'translateVoice',//识别音频并返回识别结果接口
            'startRecord',//开始录音接口
            'stopRecord',//停止录音接口
            'playVoice',//播放语音接口
            'pauseVoice',//暂停播放接口
            'stopVoice',//停止播放接口
            'uploadVoice',//上传语音接口
            'downloadVoice',//下载语音接口
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage',//下载图片接口
            'getNetworkType',//获取网络状态接口
            'openLocation',//使用微信内置地图查看位置接口
            'getLocation',//获取地理位置接口
            'hideOptionMenu',//隐藏右上角菜单接口
            'showOptionMenu',//显示右上角菜单接口
            'closeWindow',//关闭当前网页窗口接口
            'scanQRCode',//调起微信扫一扫接口
            'chooseWXPay',//发起一个微信支付请求
            'openProductSpecificView',//跳转微信商品页接口
            'addCard',//批量添加卡券接口
            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
            'openCard'//查看微信卡包中的卡券接口
        ];
        wx.config(bodyConfig);

        let thisObject = this;
        wx.ready(function() {
            if(audioPlayFuncCallback) {
                /* let audioMp3 = new Audio(audioSrc);
                audioMp3.loop = false;
                audioMp3.crossOrigin = 'anonymous';
                audioMp3.play();
                console.log("[wx.ready]播放默认第一首音频:",audioSrc); */
                audioPlayFuncCallback.call();
            }
            

            //2.3 隐藏不用的按钮
            wx.hideMenuItems({
                menuList: WeixinUtils.MenuItems, // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                success:function(res){
                    console.log("隐藏功能按钮回调成功。");
                }
            });

            //WeixinUtils.showOrHideBaseMenuItem(true);

            /// 在这里调用微信相关功能的 API
            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','startRecord','stopRecord','playVoice','pauseVoice','stopVoice','uploadVoice','downloadVoice'],
                success: function(res) {
                    thisObject.shareTimeline();
                    cc.log("微信config接口验证成功!");
                }
            });

            //监听录音自动停止接口
            wx.onVoiceRecordEnd({
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: function (res) {
                    var localId = res.localId; 
                    cc.log("超过一分钟,录音自动停止接口，返回的localId:",localId);
                }
            });

            //监听语音播放完毕接口
            wx.onVoicePlayEnd({
                success: function (res) {
                    var localId = res.localId; // 返回音频的本地ID
                    cc.log("语音播放完毕接口，返回的localId:",localId);
                    cc.systemEvent.emit("Voice_Play_End",localId);
                }
            });
        });

        
    }

    wxReady(/**@type {Function}*/callbackFunc){
        wx.ready(callbackFunc);
    }

    //步骤四：通过ready接口处理成功验证
    //wx.ready(function() {
    //    /// 在这里调用微信相关功能的 API
    //    wx.checkJsApi({
    //        jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //        success: function(res) {
    //            // 以键值对的形式返回，可用的api值true，不可用为false
    //            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //        }
    //    });
    //});

    shareTimeline() {
        this.onShareAPPMessage();
        this.onTimeline();
        this.onShareQQ();
        this.onshareWeibo();
    }

    startRecord(successStartRecordCallback,thisObject){
        let bodyStartRecord = {
            success: function(res){
                cc.log('用户授权录音',res);
                successStartRecordCallback.call(thisObject,true);
            },
            cancel: function (res) {
                cc.log('用户拒绝授权录音',res);
                successStartRecordCallback.call(thisObject,false);
            }
        };
        wx.startRecord(bodyStartRecord);
    }

    stopRecord(successStopRecordCallback,thisObject){
        let self = this;
        let bodyStopRecord = {
          success: function (res) {
            let localId = res.localId;
            //uploadVoice();
            successStopRecordCallback.call(thisObject,localId);
            //cc.log('停止录音成功,播放一遍,localId:',localId);
            //self.playRecord(localId);
          },
          fail: function (res) {
            cc.log('停止录音失败',JSON.stringify(res));
          }
        };
        wx.stopRecord(bodyStopRecord);
    }

    playRecord(localId){
        wx.playVoice({
            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
    }

    uploadRecord(localId,successUploadRecordCallback,thisObject){
        wx.uploadVoice({
            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                cc.log("微信回调成功：微信上传完成,serverId:",serverId);
                successUploadRecordCallback.call(thisObject,serverId);
            }
        });
    }



    //-----------------------------------//
    //-----------------------------------//
    //-----------------------------------//
    onShareAPPMessage() {
        var shareAppMessage = new BodyMenuShareAppMessage();
        shareAppMessage.title = WeixinShareConstant.Share_Title;
        shareAppMessage.desc = WeixinShareConstant.Share_Description;
        shareAppMessage.link = WeixinShareConstant.Share_Link;
        shareAppMessage.imgUrl = WeixinShareConstant.Share_Image_Link;
        shareAppMessage.trigger = function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            cc.log('用户点击发送给朋友');
        }
        shareAppMessage.success = function (res) {
            cc.log('已分享');
        };
        shareAppMessage.fail = function (res) {
            cc.log('已取消');
        };
        shareAppMessage.cancel = function (res) {
            cc.log(JSON.stringify(res));
        };

        //
        wx.onMenuShareAppMessage(shareAppMessage);
    }

    onTimeline() {
        var sharet = new BodyMenuShareTimeline();
        sharet.title = WeixinShareConstant.Share_Title;
        sharet.link = WeixinShareConstant.Share_Link;
        sharet.imgUrl = WeixinShareConstant.Share_Image_Link;
        sharet.trigger = function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            cc.log('用户点击分享到朋友圈');
        };
        sharet.success = function (res) {
            cc.log('已分享');
        };
        sharet.cancel = function (res) {
            cc.log('已取消');
        };
        sharet.fail = function (res) {
            cc.log(JSON.stringify(res));
        };
        //
        wx.onMenuShareTimeline(sharet);
    }
    
    onShareQQ() {
        var shareqq = new BodyMenuShareQQ();
        shareqq.title = WeixinShareConstant.Share_Title;
        shareqq.desc = WeixinShareConstant.Share_Description;
        shareqq.link = WeixinShareConstant.Share_Link;
        shareqq.imgUrl = WeixinShareConstant.Share_Image_Link;
        shareqq.complete = function (res) {
            console.log(JSON.stringify(res));
        };
        shareqq.trigger = function (res) {
            console.log('用户点击分享到QQ');
        };
        shareqq.success = function (res) {
            console.log('已分享');
        };
        shareqq.cancel = function (res) {
            console.log('已取消');
        };
        shareqq.fail = function (res) {
            console.log(JSON.stringify(res));
        };

        //
        wx.onMenuShareQQ(shareqq);
    }

    onshareWeibo() {
        var shareweibo = new BodyMenuShareWeibo();
        shareweibo.title = WeixinShareConstant.Share_Title;
        shareweibo.desc = WeixinShareConstant.Share_Description;
        shareweibo.link = WeixinShareConstant.Share_Link;
        shareweibo.imgUrl = WeixinShareConstant.Share_Image_Link;
        shareweibo.complete = function (res) {
            console.log(JSON.stringify(res));
        };
        shareweibo.trigger = function (res) {
            console.log('用户点击分享到微博');
        };
        shareweibo.cancel = function (res) {
            console.log('已取消');
        };
        shareweibo.fail = function (res) {
            console.log(JSON.stringify(res));
        };

        //
        wx.onMenuShareWeibo(shareweibo);
    }

}