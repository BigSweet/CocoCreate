
export class WeixinAudio {
    __callback = null;
    __thisObject = null;

    constructor(callback,thisObject){
        this.__callback = callback;
        this.__thisObject = thisObject;

        if(CC_DEBUG) {
            this.__callback.call(this.__thisObject);
            return;
        }

        try {
            this.init();
        } catch (error) {
            console.error("[WeixinJSBridge]error:",error);
            document.addEventListener("WeixinJSBridgeReady", ()=> {
                console.log("-------eventlistener caller-----");
                this.init();
            });
        }
    }

    init(){
        WeixinJSBridge.invoke('getNetworkType', {}, (e)=> {
            this.__callback.call(this.__thisObject);

            this.__callback = null;
            this.__thisObject = null;
        });
    }
}