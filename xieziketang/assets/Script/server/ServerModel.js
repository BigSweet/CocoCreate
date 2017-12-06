import ServerUtils from './ServerUtils';
import SignPackage from '../weixin/SignPackage';

export default class ServerModel {
    static ___instance;

    constructor(){

    }

    /**@type {ServerModel} */
    static get instance(){
        if(!ServerModel.___instance) {
            ServerModel.___instance = new ServerModel();
        }
        return ServerModel.___instance;
    }
    
    getSecondCategoryList(successCallback,thisObject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let resJson = JSON.parse(response);
                successCallback.call(thisObject,resJson);
                if(resJson.code != 0) {
                    cc.error("接口错误:"+resJson.err_msg);   
                }
            }
        };

        xhr.open("POST", ServerUtils.HttpServerConstant + "c/cm/activity/getActivityCourseList?course_id=2", true);
        // 设置POST请求的请求头  
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send("category_id=5");//POST请求，没用参数传null
    }

    getLetterSecondCategoryList(successCallback,thisObject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let resJson = JSON.parse(response);
                successCallback.call(thisObject,resJson);
                if(resJson.code != 0) {
                    cc.error("接口错误:"+resJson.err_msg);   
                }
            }
        };

        xhr.open("POST", ServerUtils.HttpServerConstant + "c/cm/activity/getActivityCourseList?course_id=2", true);
        // 设置POST请求的请求头  
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send("category_id=6");//POST请求，没用参数传null
    }
    
    getCartoonListByCategoryId(categoryId,successCallback,thisObject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let resJson = JSON.parse(response);
                successCallback.call(thisObject,resJson);
                if(resJson.code != 0) {
                    cc.error("接口错误:"+resJson.err_msg);   
                }
            }
        };

        xhr.open("POST", ServerUtils.HttpServerConstant + "c/cm/activity/activity", true);
        // 设置POST请求的请求头  
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("key="+categoryId);//POST请求，没用参数传null
    }





    /**
     * 
     * @param {string} schedule_id 
     * @param {Function} successCallback 
     * @param {*} thisObject 
     */
    getWRScheduleData(openid,schedule_id,/**@type {Function} */successCallback,thisObject){
        if(CC_DEBUG){
            let url = cc.url.raw('resources/Data/data.json');
            cc.loader.load(
                url,
                function(err,jsonData){
                    if(err) {
                        console.log(err);
                    }else {
                        successCallback.call(thisObject,jsonData);
                    }
                }.bind(this)
            );
        }
        if(CC_BUILD) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    let resJson = JSON.parse(response);
                    successCallback.call(thisObject,resJson);
                    if(resJson.code != 0) {
                        cc.error("接口错误:"+resJson.err_msg);   
                    }
                }
            };

            xhr.open("GET", ServerUtils.HttpServerConstant + "c/wr/getWRScheduleData?schedule_id="+schedule_id+"&openid="+openid, true);
            xhr.send();
        }
    }

    /**
     * 标记相关排课的相关状态为完成状态
     * @param {string} openid 
     * @param {string} user_group_id 
     * @param {string} schedule_id 
     * @param {string} status_n game1/game2/game3
     * @param {Function} successCallback 
     * @param {*} thisObject 
     */
    markWRScheduleStatusToComplete(openid,user_group_id,schedule_id,status_n,successCallback,thisObject){
        if(CC_BUILD) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    let resJson = JSON.parse(response);
                    successCallback.call(thisObject,resJson);
                    if(resJson.code != 0) {
                        cc.error("接口错误:"+resJson.err_msg);
                    }
                }
            };

            xhr.open("GET", ServerUtils.HttpServerConstant + "c/wr/markWRScheduleStatusToComplete?openid="+openid+"&user_group_id="+user_group_id+"&schedule_id="+schedule_id+"&status_n="+status_n, true);
            xhr.send();
        }
    }

    /**
     * 上传绘本阅读的录音
     * @param {string} openid 
     * @param {string} pic_book_id 
     * @param {string} user_group_id 
     * @param {string} weixin_media_id 
     * @param {Function} successCallback 
     * @param {*} thisObject 
     */
    putWRRecord(openid,pic_book_id,user_group_id,weixin_media_id,successCallback,thisObject){
        if(CC_BUILD) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    let resJson = JSON.parse(response);
                    successCallback.call(thisObject,resJson);
                    if(resJson.code != 0) {
                        cc.error("接口错误:"+resJson.err_msg);
                    }
                }
            };

            xhr.open("GET", ServerUtils.HttpServerConstant + "c/wr/putWRRecord?openid="+openid+"&pic_book_id="+pic_book_id+"&user_group_id="+user_group_id+"&media_id="+weixin_media_id, true);
            xhr.send();
        }
    }

    /**
     * 
     * @param {string} url 
     * @param {SignPackage} signPackage 
     * @param {Function} onWeixinAccessPackage 
     * @param {*} thisObject 
     */
    accessPackage(url,signPackage,onWeixinAccessPackage,thisObject){
        if(CC_DEBUG) {
            cc.warn("[accessPackage CC_Debug.]");
            onWeixinAccessPackage.call(
                thisObject,
                {"server_time":236051,"time":1508292631,"logid":150829263084958786,"traceid":"6JO8INV3hXq","code":0,"err_msg":"success","data":{"sign":"8673e2f66473fd2e2243c49356e4f9509d943667"}}
            );
        }
        if(CC_BUILD) {
            cc.warn("[accessPackage CC_Build.]");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    let resJson = JSON.parse(response);
                    if(resJson.code == 0) {
                        onWeixinAccessPackage.call(thisObject,resJson);
                    }else {
                        cc.error("接口错误:"+resJson.err_msg);
                    }
                }
            };

            xhr.open("GET","http://m.primedu.cn/c/wr/getSign?url="+url+"&noncestr="+signPackage.nonceStr+"&timestamp="+signPackage.timestamp, true);
            xhr.send();
        }
    }

}