import WeixinJSSDK from "./WeixinJSSDK";
import SignPackage from "./SignPackage";
import ServerModel from "../model/ServerModel";



export default class WeixinInstance {
    /**@type {WeixinInstance} */static ___instance;

    /**@type {WeixinJSSDK} */
    _weixinJSSDK = null;

    /**@type {SignPackage} */
    _signPackage = null;

    constructor(){

    }

    /**@type {WeixinInstance} */
    static get instance(){
        if(!WeixinInstance.___instance) {
            WeixinInstance.___instance = new WeixinInstance();
        }
        return WeixinInstance.___instance;
    }

    initialize(){
        this._weixinJSSDK = new WeixinJSSDK();
        this._signPackage = new SignPackage();
        var url = encodeURIComponent(location.href.split("#")[0]);
        //获取签名
        ServerModel.instance.accessPackage(url,this._signPackage,this.getSignPackage,this);
    }

    getSignPackage(data) {
        if (data["code"] == 0) {
            this._signPackage.setSign(data["data"]);
            cc.log("this._signPackage.sign:",this._signPackage.signature);
            //微信分享
            this._weixinJSSDK.initialize(this._signPackage);
        } else {
            alert(data["message"]);
        }
    }
}