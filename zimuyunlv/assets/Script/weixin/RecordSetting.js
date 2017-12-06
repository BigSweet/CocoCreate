import WeixinInstance from './WeixinInstance';

export default class RecordSetting {
    
    /**@type{boolean} */
    _isRecord = false;
    /**@type {number} */
    _recordTime = 0;

    /**@type {string} */
    _localId;

    constructor(){
    }

    /**@return {boolean} */
    startOrStopRecord(){
        if(this._isRecord) {
            this._isRecord = false;

            cc.systemEvent.emit(GameConstant.Event_PictureBook_Record_End);

            WeixinInstance.instance._weixinJSSDK.stopRecord(this.successStopRecordCallback,this);
        }else {
            this._isRecord = true;
            this._recordTime = 0;

            cc.systemEvent.emit(GameConstant.Event_PictureBook_Record_Start);

            WeixinInstance.instance._weixinJSSDK.startRecord(this.successStartRecord,this);
        }
        return this._isRecord;
    }

    playRecord(){
        WeixinInstance.instance._weixinJSSDK.playRecord(this._localId);
    }
    
    successStartRecord(/**@type {boolean}*/isOk){
        if(!isOk) {
            this._isRecord = false;
            
            cc.systemEvent.emit(GameConstant.Event_PictureBook_Record_End);
            cc.systemEvent.emit(GameConstant.Event_PictureBook_LocalRecord_Success_Or_Fail,0);
            
            //alert("请允许录音权限，否则无法继续！");
            MessageAlertInstance.instance.show("请允许录音权限，否则无法继续！");
        }else {
            cc.systemEvent.emit(GameConstant.Event_PictureBook_LocalRecord_Success_Or_Fail,1);
        }
    }
    
    successStopRecordCallback(localId){
        this._localId = localId;

        if(window.ex == 1){
            console.log("绘本录音上传完成！");//假的
            //MessageAlertInstance.instance.show("绘本录音上传完成！");
        }else {
            WeixinInstance.instance._weixinJSSDK.uploadRecord(localId,this.successUploadRecordCallback,this);
        }
        
        cc.systemEvent.emit(GameConstant.Event_PictureBook_LocalRecord_Complete,this._localId);
    }

    successUploadRecordCallback(mediaId){
        let openiid = window.openiid;
        cc.log("window.openiid:",openiid);
        if(!openiid) {
            cc.warn("window.openiid不存在，使用默认值1");
            openiid = '1';
        }
        let user_group_id = window.user_group_id;
        cc.log("window.user_group_id:",user_group_id);
        if(!user_group_id) {
            cc.warn("window.user_group_id不存在，使用默认值1");
            user_group_id = 1;
        }

        ServerModel.instance.putWRRecord(openiid,this._pictureBookVo.id,user_group_id,mediaId,this.successPutWRRecord,this);
    }

    successPutWRRecord(resultJson){
        cc.log("[接口putWRRecord]上传完成到本地服务器:",resultJson);
        if(resultJson.code == 0) {
            console.log("绘本录音上传完成！");
            //MessageAlertInstance.instance.show("绘本录音上传完成！");
        }else {
            console.log("绘本录音上传失败！"+resultJson.err_msg);
            MessageAlertInstance.instance.popRecordFailAlert();
            //MessageAlertInstance.instance.show("绘本录音上传失败！"+resultJson.err_msg);
        }
        
    }

    run(dt){
        if(this._isRecord) {
            this._recordTime += dt;
            if(this._recordTime >= 30) {
                this.startOrStopRecord();
            }
        }
    }

    clear(){
        if(this._isRecord) {
            this.startOrStopRecord();
        }
    }

}