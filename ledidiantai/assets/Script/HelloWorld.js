import lediModel from "./model/lediModel.js";
import Game from "./audio/Game";
import WeixinInstance from "./weixin/WeixinInstance";


const { ccclass, property } = cc._decorator;

@ccclass
export default class HelloWorld extends cc.Component {

    _game = null;
    index = 0;
    audio;
    isplay = false;



    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgCenter = null;

  /**@type {cc.Node} */
  @property(cc.Node)
    maskNode=null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgPlay = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgStop = null;

    /**@type {cc.Label} */
    @property(cc.Label)
    mMusicTime = null;

    isFirst = true;

    /**@type {cc.Label} */
    @property(cc.Label)
    MusicName = null;
    /**@type {cc.Label} */
    @property(cc.Label)
    Currentime = null;

    /**@type {cc.ProgressBar} */
    @property(cc.ProgressBar)
    mProgressBar = null;


      /**@type {cc.Node} */
      @property(cc.Node)
      ClassNode = null;


      startAnima=true;
    onLoad() {
        WeixinInstance.instance.initialize();
        cc.systemEvent.on("item_click",this.itemClickHandler,this);
        cc.systemEvent.on("back_click",this.backClick,this);
        lediModel.instance.getWordList(this.success, this);
    }

    update(dt) {
        if(this.startAnima){
            this.maskNode.rotation += 1;
        }
       
    }


    backClick(){
        this.ClassNode.active = false;
    }

    itemClickHandler(/**@type {cc.Event.EventCustom}*/event){
        this.ClassNode.active = false;
        let details = event.detail;
        console.log(details);
        this.index=0;
        this.audio = null
        this.mmm.load();
        this.isplay = false;
        lediModel.__instance.getIdWordList(this.success, this,event.detail);
    }

    success(result) {

        if (this.index == 19) {
            this.index = 0;
        }
        //startanimation
        this.startAnimation();
        console.log(result);

        if (this.isFirst) {
            this.isFirst = false;
            WeixinInstance.instance._weixinJSSDK.getWeiXinConfig(function () {
                this.getAudio();
            }.bind(this));
        } else {
            this.getAudio();
        }

        this.MusicName.string = result.data.radio_list[this.index].radio_en_desc;

        let url = result.data.radio_list[this.index].radio_pic;
        let loadData = { url: url, type: 'png' };
        console.log("==>", url);
        cc.loader.load(loadData, function (err, texture) {
            this.imgCenter.spriteFrame = new cc.SpriteFrame(texture);
        }.bind(this));

    }


    clickButton(e) {


        cc.log("=======>", e);
        let result = lediModel.instance.result;

        this.getAudio();


    }

    updateProgress(s) {
        this.mProgressBar.progress = s;
    }
    startAnimation() {
        this.startAnima=true;
    }

    stopAnimation() {
        this.startAnima=false;
    }

    mmm = null;
    getAudio() {

        let result = lediModel.instance.result;
        if (this.audio == null) {
            let mp3audio = result.data.radio_list[this.index].radio_mp3;
            this.mmm = null;
            cc.log("mp3audio:", mp3audio);
            this.audio = mp3audio;
            this.mmm = new Audio(mp3audio);
            this.mmm.addEventListener("canplay", function (e) {
                let time = this.mmm.duration;
               
                var m = parseInt(time / 60);
                var s = time % 60;
                if (Math.round(s) >= 10) {
                    this.mMusicTime.string = "0" + m + ":" + Math.round(s);
                } else {
                    this.mMusicTime.string = "0" + m + ":0" + Math.round(s);
                }

            }.bind(this));

            this.mmm.addEventListener("timeupdate", function (e) {
                var m = parseInt(this.mmm.currentTime / 60);
                var s = this.mmm.currentTime % 60;


                this.updateProgress(this.mmm.currentTime*1.0/this.mmm.duration);
                
                if (Math.round(s) >= 10) {
                    this.Currentime.string = "0" + m + ":" + Math.round(s);
                } else {
                    this.Currentime.string = "0" + m + ":0" + Math.round(s);
                }

            }.bind(this));
            this.play();

        } else {
            this.play();
        }
    }




    play() {
        if (this.isplay) {
            this.isplay = false;
            this.mmm.pause();
            this.stopAnimation();
            this.imgPlay.node.active = true;
            this.imgStop.node.active = false;
        } else {
            this.isplay = true;
            this.startAnimation();
            this.mmm.play();
            this.imgPlay.node.active = false;
            this.imgStop.node.active = true;
        }


    }


    clickPre() {

        if (this.index == 0) {

        } else {
            //startanimation

            --this.index;
            this.setimg();
        }

    }

    setimg() {
        let result = lediModel.instance.result;
        this.audio = null;
        this.mmm.load();
        this.isplay = false;
        this.MusicName.string = result.data.radio_list[this.index].radio_en_desc;
        let url = result.data.radio_list[this.index].radio_pic;
        let loadData = { url: url, type: 'png' };
        console.log("---->", url);
        cc.loader.load(loadData, function (err, texture) {
            this.imgCenter.spriteFrame = new cc.SpriteFrame(texture);
        }.bind(this));

        this.getAudio();


    }
    centerImgClick() {
        let result = lediModel.instance.result;
    }

    clickNext() {
        if (this.index == 19) {
            lediModel.instance.getWordList(this.success, this);
            this.audio = null
            this.mmm.load();
            this.isplay = false;
        } else {
            //startanimation
            ++this.index;
            this.setimg();
        }

    }

    clickCLass(){
        cc.log("=======>", "classclick");
        this.ClassNode.active=true;
    }

}