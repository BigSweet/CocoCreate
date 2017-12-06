export default class SignPackage {
    /**@type {string} */appId = "wx12249a5e09de9521";
    ////public jsapi_ticket:string;
    /**@type {string} */nonceStr = "supper_pgy";
    /**@type {string} */signature;
    /**@type {number} */timestamp = new Date().getTime();

    constructor() {
        //this.appId = data["appId"];
        ////this.jsapi_ticket = data["jsapi_ticket"];
        //this.nonceStr = data["noncestr"];
        //this.signature = data["sign"];
        //this.timestamp = data["timestamp"];
    }

    setSign(data) {
        this.signature = data["sign"];
    }
}