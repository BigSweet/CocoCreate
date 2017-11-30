export default class ClassListModel {
    /**@type {ClassListModel} */static __instance;

    result = null;

    constructor(){

    }

    /**@return {ClassListModel} */
    static get instance(){
        if(!ClassListModel.__instance) {
            ClassListModel.__instance = new ClassListModel();
        }
        return ClassListModel.__instance;
    }

    getClassList(callback,target){
        let self = this;
        var url="http://m.primedu.cn/c/res/getSecondCategoryList?f_category_id=4";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let result = JSON.parse(response);
                self.result = result;
                callback.call(target,result);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }
}