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
    __category1ListVoArr = null;

     /**@type {[CategoryListVo]} */
     __category2ListVoArr = null;

      /**@type {[CategoryListVo]} */
    __category3ListVoArr = null;

     /**@type {[CategoryListVo]} */
     __category4ListVoArr = null;

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
            ServerModel.instance.get1SecondCategoryList(this.second1CategoryListCallback,this);

        }
    }
    result1=null;
    result2=null;
    result3=null;
    result4=null;
    second1CategoryListCallback(result){
        let self = this;
        CocosAnalyticsInstance.instance.customEvent(AnalyticsEventName.EventName_Enter);
        self.result1 = result;
        this.__category1ListVoArr = [];
        if(result.code == 0) {
            this.imgUrl=result.data.background;
            /**@type {[]}*/let categoryList = result.data.activity_list;
            for(let i = 0;i<categoryList.length;++i){
                let vo = new CategoryListVo(categoryList[i]);
                this.__category1ListVoArr.push(vo);
            }
        }
        ServerModel.instance.get2SecondCategoryList(this.second2CategoryListCallback,this);
        
    }

    second2CategoryListCallback(result){
        let self = this;
        CocosAnalyticsInstance.instance.customEvent(AnalyticsEventName.EventName_Enter);
        self.result2 = result;
        this.__category2ListVoArr = [];
        if(result.code == 0) {
            /**@type {[]}*/let categoryList = result.data.activity_list;
            for(let i = 0;i<categoryList.length;++i){
                let vo = new CategoryListVo(categoryList[i]);
                this.__category2ListVoArr.push(vo);
            }
        }

        ServerModel.instance.get3SecondCategoryList(this.second3CategoryListCallback,this);
        
    }

    second3CategoryListCallback(result){
        let self = this;
        CocosAnalyticsInstance.instance.customEvent(AnalyticsEventName.EventName_Enter);
        self.result3 = result;
        this.__category3ListVoArr = [];
        if(result.code == 0) {
            /**@type {[]}*/let categoryList = result.data.activity_list;
            for(let i = 0;i<categoryList.length;++i){
                let vo = new CategoryListVo(categoryList[i]);
                this.__category3ListVoArr.push(vo);
            }
        }
        ServerModel.instance.get4SecondCategoryList(this.second4CategoryListCallback,this);
    }

    second4CategoryListCallback(result){
        let self = this;
        CocosAnalyticsInstance.instance.customEvent(AnalyticsEventName.EventName_Enter);
        self.result4 = result;
        this.__category4ListVoArr = [];
        if(result.code == 0) {
            /**@type {[]}*/let categoryList = result.data.activity_list;
            for(let i = 0;i<categoryList.length;++i){
                let vo = new CategoryListVo(categoryList[i]);
                this.__category4ListVoArr.push(vo);
            }
        }
        this._callback.call(this._thisObject);
        
    }

    /**@return {[CategoryListVo]} */
    getCategory1ListArr(){
        return this.__category1ListVoArr;
    }

       /**@return {[CategoryListVo]} */
       getCategory2ListArr(){
        return this.__category2ListVoArr;
    }

         /**@return {[CategoryListVo]} */
         getCategory3ListArr(){
            return this.__category3ListVoArr;
        }

             /**@return {[CategoryListVo]} */
       getCategory4ListArr(){
        return this.__category4ListVoArr;
    }
 /**@return {string} */
    getTopImgurl(){
        return this.imgUrl;
    }
}