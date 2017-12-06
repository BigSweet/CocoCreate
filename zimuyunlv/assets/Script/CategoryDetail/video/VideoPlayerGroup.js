const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("VideoPlayerGroup")
export default class VideoPlayerGroup extends cc.Component {
    
    /**@type {cc.VideoPlayer} */
    @property(cc.VideoPlayer)
    playVideo_ = null;

    /**@type {cc.Label} */
    @property(cc.Label)
    lblCurTime_ = null;
    
    /**@type {cc.Label} */
    @property(cc.Label)
    lblTotalTime_ = null;
    
    /**@type {cc.Node} */
    @property(cc.Node)
    btnPlay_ = null;
    
    /**@type {cc.Node} */
    @property(cc.Node)
    btnPause_ = null;
    
    /**@type {cc.Node} */
    @property(cc.Node)
    btnFullscreen_ = null;
    
    /**@type {cc.Label} */
    @property(cc.Label)
    lblTitle_ = null;
        
    /**@type {cc.Node} */
    @property(cc.Node)
    control_ = null;

    /**@type {cc.ProgressBar} */
    @property(cc.ProgressBar)
    progressBarVideo_ = null;



    /**@type {number} */
    __totolDuration = 0;

    /**@type {boolean} */
    __isReady = false;

    onLoad(){
        this.progressBarVideo_.progress = 0;
    }

    initialize(remoteUrl,desc){
        this.lblTitle_.string = desc;
        this.playVideo_.remoteURL = remoteUrl;

        this.btnPlay_.active = true;
        this.btnPause_.active = false;
    }

    onControlClick(/**@type {cc.Event.EventTouch}*/event,/**@type {string}*/customData){
        switch(customData) {
            case "0"://
                this.playVideo_.play();
            break;
            case "1"://
                this.playVideo_.pause();
            break;
            case "2"://
                this.playVideo_.isFullscreen = true;
            break;
        }
    }

    playVideoHandler(videoplayer, eventType, customEventData){
        cc.log("视频加载状态切换：",eventType);
        switch(eventType){
            case 0://PLAYING//表示视频正在播放中。

            break;
            case 1://PAUSED//表示视频暂停播放。

            break;
            case 2://STOPPED//表示视频已经停止播放。

            break;
            case 3://COMPLETED//表示视频播放完成。

            break;
            case 4://META_LOADED//表示视频的元信息已加载完成，你可以调用 getDuration 来获取视频总时长。
                this.__totolDuration = this.playVideo_.getDuration();
            break;
            case 5://CLICKED	表示视频被用户点击了。
                this.control_.active = !this.control_.active;
            break;
            case 6://READY_TO_PLAY//表示视频准备好了，可以开始播放了。
                this.__isReady = true;

                this.playVideo_.play();
            break;
        }
    }

    update(dt) {
        if(this.__totolDuration != 0) {
            this.lblCurTime_.string = this.formatSeconds(this.playVideo_.currentTime);
            this.lblTotalTime_.string = this.formatSeconds(this.__totolDuration);

            this.progressBarVideo_.progress = (this.playVideo_.currentTime*1.0)/this.__totolDuration;
        }

        if(!this.__isReady) return;

        if(this.playVideo_.isPlaying()) {
            this.btnPlay_.active = false;
            this.btnPause_.active = true;
        }else {
            this.btnPlay_.active = true;
            this.btnPause_.active = false;
        }
    }

    autoPlay(){
        this.playVideo_.play();
    }
    
    formatSeconds(value) {
        var m = parseInt(value / 60);
        var s = parseInt(value % 60);
        
        m = m.toString();
        let mm = m[1] ? m : '0' + m;
        s = s.toString();
        let ss = s[1] ? s : '0' + s;

        return mm+":"+ss;
    }

    onDestroy(){
        cc.log("销毁 VideoPlayerGroup..");

        this.playVideo_.destroy();
    }

}