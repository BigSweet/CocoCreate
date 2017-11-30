import Hero from "./Hero";
import AudioGroup from "./audio/AudioGroup";
import Game from "./audio/Game";
import WordListModel from "./model/WordListModel";
import WeixinInstance from "./weixin/WeixinInstance";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HelloWorld extends cc.Component {

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgCenter = null;
    /**@type {cc.Label} */
    @property(cc.Label)
    MusicDes = null;
    /**@type {cc.Label} */
    @property(cc.Label)
    MusicName = null;

    /**@type {cc.Node} */
    @property(cc.Node)
    ClassNode = null;

    index = 0;
    _game = null;

    isFirst=true;

    onLoad() {
        WeixinInstance.instance.initialize();
        var _self = this;
        cc.systemEvent.on("item_click",this.itemClickHandler,this);
    }


    backClick(){
        this.ClassNode.active=true;
    }

    itemClickHandler(/**@type {cc.Event.EventCustom}*/event){
        this.ClassNode.active=false;
        let details = event.detail;
        console.log(details);
        this.index=0;
        this.node.active=true;
        WordListModel.instance.getIdWordList(this.success, this,event.detail);
    }

    success(result) {
        if (this.index == 19) {
            this.index = 0;
        }
        var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
        // var action = cc.scaleTo(0.1, 1.2,1.2);
        this.imgCenter.node.runAction(seq);
        console.log(result);

        if(this.isFirst){
            this.isFirst=false;
            WeixinInstance.instance._weixinJSSDK.getWeiXinConfig(function () {
                console.log("weixincallback");
                this._game = new Game(result.data.quotation_list[this.index].quotation_mp3_en);
            }.bind(this));
        }else{
            this._game = new Game(result.data.quotation_list[this.index].quotation_mp3_en);
        }
        this.MusicDes.string = result.data.quotation_list[this.index].quotation_desc;
        this.MusicName.string = result.data.quotation_list[this.index].quotation_en_desc;


        let url = result.data.quotation_list[this.index].quotation_pic;
        let loadData = {url:url,type:'png'};
        console.log("==>",url);
        cc.loader.load(loadData, function (err, texture) {
            this.imgCenter.spriteFrame = new cc.SpriteFrame(texture);
            this.imgCenter.node.setContentSize(new cc.Size(630,550));
            
        }.bind(this));


     
    }
 
   
   /*  clickCLass(){
        cc.log("=======>", "classclick");
        this.ClassNode.active=true;
    } */

    update(dt) {

    }


    clickButton(e) {
        var seq = cc.sequence(cc.scaleTo(0.1,1.2, 1.2), cc.scaleTo(0.1, 1, 1));
        // var action = cc.scaleTo(0.1, 1.2,1.2);
        this.imgCenter.node.runAction(seq);
        cc.log("=======>", e);
        let result = WordListModel.instance.result;
        this._game = new Game(result.data.quotation_list[this.index].quotation_mp3_en);



    }


    clickPre() {

        if (this.index == 0) {

        } else {
            var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
            // var action = cc.scaleTo(0.1, 1.2,1.2);
            this.imgCenter.node.runAction(seq);
            --this.index;
            this.setimg();
        }

    }

    setimg() {
        let result = WordListModel.instance.result;
        this._game = new Game(result.data.quotation_list[this.index].quotation_mp3_en);
        this.MusicDes.string = result.data.quotation_list[this.index].quotation_desc;
        this.MusicName.string = result.data.quotation_list[this.index].quotation_en_desc;

        let url = result.data.quotation_list[this.index].quotation_pic;
        let loadData = {url:url,type:'png'};
        console.log("---->",url);
        cc.loader.load(loadData,function(err, texture){
            this.imgCenter.spriteFrame = new cc.SpriteFrame(texture);
        }.bind(this));

        
    }
    centerImgClick() {
        var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
        // var action = cc.scaleTo(0.1, 1.2,1.2);
        this.imgCenter.node.runAction(seq);
        let result = WordListModel.instance.result;
        this._game = new Game(result.data.quotation_list[this.index].quotation_mp3_en);
    }

    clickNext() {
        if (this.index == 19) {
            WordListModel.instance.getWordList(this.success, this);
        } else {
            var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
            // var action = cc.scaleTo(0.1, 1.2,1.2);
            this.imgCenter.node.runAction(seq);
            ++this.index;
            this.setimg();
        }

    }


}