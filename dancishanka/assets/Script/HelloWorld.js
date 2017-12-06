import Hero from "./Hero";
import WordListModel from "./model/WordListModel";
import WeixinInstance from "./weixin/WeixinInstance";
import { WeixinAudio } from "./WeixinAudio";

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


    onLoad() {
		
		  cc.log(document.body.clientWidth,document.body.clientHeight);
        cc.view.setFrameSize(document.body.clientWidth,document.body.clientHeight);
        WeixinInstance.instance.initialize();
        var _self = this;
        WordListModel.instance.getWordList(this.success, this);
        cc.systemEvent.on("item_click",this.itemClickHandler,this);
        cc.systemEvent.on("back_click",this.backClick,this);
   /*      cc.loader.load("http://cdn2.primedu.cn/se/2094a2259aeded07d27786dd16fe34bc.mp3",function(err,result){
            console.log("mp3:",result);
        }.bind(this)); */
    }


    backClick(){
        this.ClassNode.active = false;
        
    }

    itemClickHandler(/**@type {cc.Event.EventCustom}*/event){
        this.ClassNode.active = false;
        this.audio.pause();
        let details = event.detail;
        console.log(details);
        this.index=0;
        WordListModel.__instance.getIdWordList(this.success, this,event.detail);
    }

    audio=null;

    success(result) {
        if (this.index == 19) {
            this.index = 0;
        }
        var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
        // var action = cc.scaleTo(0.1, 1.2,1.2);
        this.imgCenter.node.runAction(seq);
        console.log(result);
        
        new WeixinAudio (this.getAudio,this);

        this.MusicDes.string = result.data.word_list[this.index].word_en_desc;
        this.MusicName.string = result.data.word_list[this.index].word_desc;

        let url = result.data.word_list[this.index].word_pic;
        let loadData = {url:url,type:'png'};
        console.log("==>",url);
        cc.loader.load(loadData, function (err, texture) {
            this.imgCenter.spriteFrame = new cc.SpriteFrame(texture);
        }.bind(this));

     
    }
 
   
    clickCLass(){
        cc.log("=======>", "classclick");
        this.ClassNode.active=true;
    }

    update(dt) {

    }


    clickButton(e) {
        if(this.iscanClick){
            this.setInter();
            var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
            // var action = cc.scaleTo(0.1, 1.2,1.2);
            this.imgCenter.node.runAction(seq);
            cc.log("=======>", e);
            let result = WordListModel.instance.result;
            this.getAudio();
        }

      
    }

    getAudio(){
        let result = WordListModel.instance.result;
        this.audio= new Audio(result.data.word_list[this.index].word_mp3);
        this.audio.loop=false;
        this.audio.play();
    }

    iscanClick=true;

    setInter(){
        this.iscanClick=false;
        setTimeout(() => {
            this.iscanClick=true;
        }, 1000);
    }
    clickPre() {
        if(this.iscanClick){
            this.setInter();
            if (this.index == 0) {
                this.index=19;
                this.setimg();
            } else {
                var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
                // var action = cc.scaleTo(0.1, 1.2,1.2);
                this.imgCenter.node.runAction(seq);
                --this.index;
                this.setimg();
            }
        }
      

    }

    setimg() {
        let result = WordListModel.instance.result;
        this.getAudio();
        this.MusicDes.string = result.data.word_list[this.index].word_en_desc;
        this.MusicName.string = result.data.word_list[this.index].word_desc;

        let url = result.data.word_list[this.index].word_pic;
        let loadData = {url:url,type:'png'};
        console.log("---->",url);
        cc.loader.load(loadData,function(err, texture){
            this.imgCenter.spriteFrame = new cc.SpriteFrame(texture);
        }.bind(this));

        
    }
    centerImgClick() {
        if(this.iscanClick){
            this.setInter();
            var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
            // var action = cc.scaleTo(0.1, 1.2,1.2);
            this.imgCenter.node.runAction(seq);
            let result = WordListModel.instance.result;
            this.getAudio();
        }

   
    }

    clickNext() {
        if(this.iscanClick){
            this.setInter();
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


}