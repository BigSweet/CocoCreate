
import ServerModel from "../server/ServerModel";
import AnalyticsEventName from "../analytics/AnalyticsEventName";
import CategoryDetailVo from "../model/vo/CategoryDetailVo";
import CocosAnalyticsInstance from "../analytics/CocosAnalyticsInstance";
import VideoPlayerGroup from "./video/VideoPlayerGroup";
import SelectionItem from "./SelectionItem";
import SelectionGroup from "./selection/SelectionGroup";
import CategoryListVo from "../model/vo/CategoryListVo";


const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class CategoryDetail extends cc.Component {
    /**@type {VideoPlayerGroup} */
    @property(VideoPlayerGroup)
    videoPlayerGroup_ = null;

    /**@type {SelectionGroup} */
    @property(SelectionGroup)
    selectionGroup_ = null;

    /**@type {CategoryListVo} */
    __itemVo = null;

    /**@type {[CategoryDetailVo]} */
    _detailVoArr = null;
    
    onLoad(){
        cc.director.preloadScene("CartoonStudy");
    }
    
    initialize(itemVo){
        this.__itemVo = itemVo;
        ServerModel.instance.getCartoonListByCategoryId(this.__itemVo.key,this.startGame,this);

        cc.systemEvent.on("Refresh_Video_Player",this.showVideoPlayer,this);
    }
    // /videourl=null;
    startGame(result){
        CocosAnalyticsInstance.instance.customEvent(AnalyticsEventName.EventName_Detail);

        this._detailVoArr = [];
        if(result.code == 0) {
            /**@type {[]}*/let originUrl = result.data.feed_list[0].content.video_list[0].origin_url;
            
            let self = this;
            var url=originUrl;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    // window.eval(response);
                    // console.log("==>",);
                    let arr=response.split("\"");
                    console.log( "===============================>"+arr[5] );
                    self.videourl = arr[5]; 
                 this.initVideoPlayer( arr[5]);

                    /* let arr=response.split("\"");
                    console.log( arr[5] );
                    self.videourl = arr[5]; */
                }
            }.bind(this);
            xhr.open("GET", url, true);
            xhr.send();
        }

        
    }

    initVideoPlayer(string){
        /**@type {VideoPlayerGroup}*/let jsVideoPlayerGroup = this.videoPlayerGroup_.getComponent(VideoPlayerGroup);
        jsVideoPlayerGroup.initialize(string,"");
    }

  

    backStudyClick(/**@type {cc.Event.EventTouch}*/e){
        cc.director.loadScene("CartoonStudy");
    }

    showVideoPlayer(/**@type {cc.Event.EventCustom}*/e){
        let vo = e.detail;
        this.initVideoPlayer(vo);

        /**@type {VideoPlayerGroup}*/let jsVideoPlayerGroup = this.videoPlayerGroup_.getComponent(VideoPlayerGroup);
        jsVideoPlayerGroup.autoPlay();
    }

    onDestroy(){
        cc.log("销毁 CategroyDetail...");
        cc.systemEvent.off("Refresh_Video_Player",this.showVideoPlayer,this);
    }

}