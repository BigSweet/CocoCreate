export default class WordListModel {
    /**@type {WordListModel} */static __instance;

    result = null;

    constructor(){

    }

    /**@return {WordListModel} */
    static get instance(){
        if(!WordListModel.__instance) {
            WordListModel.__instance = new WordListModel();
        }
        return WordListModel.__instance;
    }

    getWordList(callback,target){
        let self = this;
        var url="http://m.primedu.cn/c/res/getWordList";
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
        var url="http://m.primedu.cn/c/res/getWordList?s_category_id="+string;
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