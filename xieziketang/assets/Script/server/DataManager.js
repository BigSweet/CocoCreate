import ServerModel from "./ServerModel";
import ServerUtils from "./ServerUtils";
import CocosAnalyticsInstance from "../analytics/CocosAnalyticsInstance";
import AnalyticsEventName from "../analytics/AnalyticsEventName";
import CategoryListVo from "../model/vo/CategoryListVo";


export default class DataManager {
    static ___instance;

    _callback = null;
    _thisObject = null;
      /**@type {string} */
    imgUrl=null;
    /**@type {object} */
    config = null;
    /**@type {boolean} */
    Debug = null;

    /**@type {[CategoryListVo]} */
    __categoryListVoArr = null;

       /**@type {[CategoryListVo]} */
       __lettercategoryListVoArr = null;
    /**@return {DataManager} */
    static get instance() {
        if(!DataManager.___instance) {
            DataManager.___instance = new DataManager();
        }
        return DataManager.___instance;
    }

    initialize(callback,thisObject){
        this._callback = callback;
        this._thisObject = thisObject;

        CocosAnalyticsInstance.instance.initialize();

        let version = new Date();
        let url = cc.url.raw('resources/Data/config.json?'+version.getTime());
        cc.loader.load(url,this.configComplete.bind(this));
    }

    configComplete(err,jsonData){
        if(err) {
            console.log(err);
        }else {
            this.config = jsonData;
            this.Debug = this.config["Debug"];
            ServerUtils.HttpServerConstant = this.config["HttpServerConstant"];
            
            CocosAnalyticsInstance.instance.loginSuccess(0);
            ServerModel.instance.getSecondCategoryList(this.secondCategoryListCallback,this);

        }
    }
    result=null;
    letterresult=null;
    secondCategoryListCallback(result){
        let self = this;
        CocosAnalyticsInstance.instance.customEvent(AnalyticsEventName.EventName_Enter);
        self.result = result;
        this.__categoryListVoArr = [];
        if(result.code == 0) {
            this.imgUrl=result.data.background;
            /**@type {[]}*/let categoryList = result.data.activity_list;
            for(let i = 0;i<categoryList.length;++i){
                let vo = new CategoryListVo(categoryList[i]);
                this.__categoryListVoArr.push(vo);
            }
        }
        ServerModel.instance.getLetterSecondCategoryList(this.LettersecondCategoryListCallback,this);
        
    }

    LettersecondCategoryListCallback(result){
        let self = this;
        CocosAnalyticsInstance.instance.customEvent(AnalyticsEventName.EventName_Enter);
        self.letterresult = result;
        this.__lettercategoryListVoArr = [];
        if(result.code == 0) {
            /**@type {[]}*/let categoryList = result.data.activity_list;
            for(let i = 0;i<categoryList.length;++i){
                let vo = new CategoryListVo(categoryList[i]);
                this.__lettercategoryListVoArr.push(vo);
            }
        }
        this._callback.call(this._thisObject);
        
    }

    /**@return {[CategoryListVo]} */
    getCategoryListArr(){
        return this.__categoryListVoArr;
    }

       /**@return {[CategoryListVo]} */
       getLetterCategoryListArr(){
        return this.__lettercategoryListVoArr;
    }
 /**@return {string} */
    getTopImgurl(){
        return this.imgUrl;
    }
}