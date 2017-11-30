

export default class ServerModel {

     /**@type {ServerModel} */static __instance;
    constructor() {

    }

    /**@return {ServerModel} */
    static get instance() {
        if (!ServerModel.__instance) {
            ServerModel.__instance = new ServerModel();
        }
        return ServerModel.__instance;
    }

    accessPackage(url,signPackage,onWeixinAccessPackage,thisObject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let resJson = JSON.parse(response);
                if (resJson.code == 0) {
                    onWeixinAccessPackage.call(thisObject, resJson);
                } else {
                    cc.error("接口错误:" + resJson.err_msg);
                }
            }
        };

        xhr.open("GET", "http://m.primedu.cn/c/wr/getSign?url=" + url + "&noncestr=" + signPackage.nonceStr + "&timestamp=" + signPackage.timestamp, true);
        xhr.send();
    }


}
