export default class lediModel {
    /**@type {lediModel} */static __instance;

    result = null;

    constructor(){

    }

    /**@return {lediModel} */
    static get instance(){
        if(!lediModel.__instance) {
            lediModel.__instance = new lediModel();
        }
        return lediModel.__instance;
    }

    getWordList(callback,target){
        let self = this;
        var url="http://m.primedu.cn/c/res/getRadioList";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let result = JSON.parse(response);
                self.result = result;
                callback.call(target,result);
            }
        };
        xhr.open("POST", url, true);
        xhr.send();
    }


    getIdWordList(callback,target,string){
        let self = this;
        var url="http://m.primedu.cn/c/res/getRadioList?s_category_id="+string;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let result = JSON.parse(response);
                self.result = result;
                callback.call(target,result);
            }
        };
        xhr.open("POST", url, true);
        xhr.send();
    }
}