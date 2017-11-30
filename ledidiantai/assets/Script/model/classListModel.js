export default class classListModel {
    /**@type {classListModel} */static __instance;

    result = null;

    constructor(){

    }

    /**@return {classListModel} */
    static get instance(){
        if(!classListModel.__instance) {
            classListModel.__instance = new classListModel();
        }
        return classListModel.__instance;
    }

    getCLassList(callback,target){
        let self = this;
        var url="http://m.primedu.cn/c/res/getSecondCategoryList?f_category_id=2";
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