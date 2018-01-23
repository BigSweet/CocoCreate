import CustomNode from "./CustomNode";
import Item from "./Item";
import Grid from "./Grid";
import GameConstant from "./GameConstant";
import AudioEngineUtils from "./AudioEngineUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPu extends cc.Component {

    /**@type {cc.Node} */
    @property(cc.Node)
    imgNode = null;

    gridArr = null;

    itemArr = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgComplete = null;


    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgBg = null;


    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    puzzleShadow = null;


    /**@type {cc.ParticleSystem} */
    @property(cc.ParticleSystem)
    mParticleSystem1 = null;

    /**@type {cc.ParticleSystem} */
    @property(cc.ParticleSystem)
    mParticleSystem2 = null;

    /**@type {cc.ParticleSystem} */
    @property(cc.ParticleSystem)
    mParticleSystem3 = null;

    /**@type {cc.ParticleSystem} */
    @property(cc.ParticleSystem)
    mParticleSystem4 = null;

    /**@type {cc.ParticleSystem} */
    @property(cc.ParticleSystem)
    mParticleSystem5 = null;

    audio = null;

    json0 ="";
    json1 = "";
    json2 = "";
    json3 = "";


    __lessonIndex = 0;

    _prefab = null;


    jumpUrl = null;


    GetQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";  
        if (r != null)  
             context = r[2];  
        reg = null;  
        r = null;  
        return context == null || context == "" || context == "undefined" ? "" : context;  
    }
    onLoad() {
        let lesson=this.GetQueryString("lesson");
        console.log(lesson+"lesson");
        this.json0= "lesson"+lesson+"/json/lesson1.json";
        this.json1= "lesson"+lesson+"/json/lesson2.json";
        this.json2= "lesson"+lesson+"/json/lesson3.json";
        this.json3= "lesson"+lesson+"/json/lesson4.json";
        cc.view.setFrameSize(document.body.clientWidth,document.body.clientHeight);
        this.gridArr = [];
        this.itemArr = [];
        cc.systemEvent.on("toCheck", this.Check, this);
        cc.systemEvent.on("loadComplete", this.imgLoadComplete, this);
        this.readJson();
      
    }

    imgLoadIndex = 0;

    imgLoadComplete() {
        this.imgLoadIndex++;
        if (this.imgLoadIndex == 8) {
            let actionBy = cc.sequence(cc.fadeOut(2.0), cc.callFunc(() => {
                this.setItemMoveAction();
                cc.log("动画执行完毕", i);
            }));
            actionBy.easing(cc.easeExponentialInOut());
            this.imgComplete.node.runAction(actionBy);
        }

    }

    /*     initImg(){
            this.node.addChild(this.imgBg.node);
            let url="resources/lesson1/texture/bg_puzzle.png";
            cc.loader.load(cc.url.raw(url), function (err, texture) {
                this.imgBg.spriteFrame = new cc.SpriteFrame(texture);
            }.bind(this));


            this.node.addChild(this.puzzleShadow.node);


            this.node.addChild(this.puzzleShadow.node);
            this.node.addChild(this.puzzleShadow.node);
            this.node.addChild(this.puzzleShadow.node);
            this.node.addChild(this.puzzleShadow.node);
            this.node.addChild(this.puzzleShadow.node);


            cc.loader.load(cc.url.raw("resources/lesson1/texture/puzzle_shadow.png"), function (err, texture) {
                this.puzzleShadow.spriteFrame = new cc.SpriteFrame(texture);
            }.bind(this));

        } */

    readJson() {
        if (!this["json" + this.__lessonIndex]) {

            new AudioEngineUtils("success",null);
            this.mParticleSystem1.resetSystem();
            this.mParticleSystem2.resetSystem();
            this.mParticleSystem3.resetSystem();
            this.mParticleSystem4.resetSystem();
            this.mParticleSystem5.resetSystem();
    
            this.mParticleSystem1.onDestroy = this.ParticleSysDestroy.bind(this);
            this.mParticleSystem1.node.zIndex = 100;
            this.mParticleSystem2.node.zIndex = 100;
            this.mParticleSystem3.node.zIndex = 100;
            this.mParticleSystem4.node.zIndex = 100;
            this.mParticleSystem5.node.zIndex = 100;

            cc.log(" youxi zhenzheng  over...");


            return;
        }

        var jsonUrl = cc.url.raw("resources/" + this["json" + this.__lessonIndex++]);
        //读取json文件内容
        cc.loader.load(jsonUrl, function (err, json) {
            console.log("第几个游戏" + this.__lessonIndex);
            let completeImg = json.game_complete_Img;
            cc.loader.load(cc.url.raw(completeImg), function (err, texture) {
                this.imgComplete.spriteFrame = new cc.SpriteFrame(texture);
                this.imgComplete.node.zIndex = 999;
            }.bind(this));
            for (let i = 0; i < json.game_nine_img.length; i++) {
                GameConstant.imgurlArr.push(json.game_nine_img[i]);
            }
            if (json.jump_url) {
                this.jumpUrl = json.jump_url;
            }
            GameConstant.itemMP3Url = json.item_mp3_name;
            GameConstant.itemCompleteMp3Name = json.game_complete_mp3_name;


            cc.loader.loadRes("prefab/Item", this.initialize.bind(this));
        }.bind(this));

    }


    initialize(err, prefab) {

        this._prefab = prefab;
        console.log("imgnodex" + this.imgNode.x + "-------" + this.imgNode.y);
        for (let i = 0; i < GameConstant.imgurlArr.length; ++i) {
            /**@type {cc.Node}*/
            let itemNode = cc.instantiate(prefab);
            let item = itemNode.getComponent(Item);
            this.node.addChild(item.node);
            // this.puzzleShadow.node.addChild(item.node);
            item.initialize(i, GameConstant.imgurlArr[i]);
            let grid = new Grid(i, item);
            this.gridArr.push(grid);
            this.itemArr.push(item);
        }
      

    }


    setItemMoveAction(){
            for (let i = 0; i < this.itemArr.length; i++) {
                let movex = this.RandomNumBoth(this.imgNode.x - 120, this.imgNode.x + 120);
                let movey = this.RandomNumBoth(this.imgNode.y - 200, this.imgNode.y + 200);
                let duration = this.RandomNumBoth(1, 2);
                let rotation = this.RandomNumBoth(0, 255)
                GameConstant.ItemStartPosition.push(new cc.Vec2(movex, movey));
                GameConstant.ItemStartRotation.push(rotation);
                let actionBy = cc.sequence(cc.spawn(cc.moveTo(duration, movex, movey), cc.rotateTo(duration, rotation)), cc.callFunc(() => {
                    cc.log("动画执行完毕", i);
                    this.itemArr[i].setTouch();
                }));
                actionBy.easing(cc.easeExponentialInOut());
                this.itemArr[i].node.runAction(actionBy);
                let mzindex = this.RandomNumBoth(1, 9);
                this.itemArr[i].node.zIndex = mzindex;
            }

    }

    RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }

    selectMusicIndex=0;
    Check() {

        this.selectMusicIndex++;
        if (this.selectMusicIndex%2==0){
            new AudioEngineUtils("puzzle_right",()=>{
                new AudioEngineUtils(GameConstant.itemCompleteMp3Name,null);
            });
        }else {
            new AudioEngineUtils("puzzle_right",()=>{
                new AudioEngineUtils(GameConstant.itemMP3Url,null);
            });
        }
        for (let i = 0; i < this.gridArr.length; ++i) {
            if (!this.gridArr[i]._isComplete) {


                console.log("游戏还没有完成");
                return;
            }
        }


        this.imgComplete.node.active = true;
        this.imgComplete.node.zIndex = 99;


        let seq = cc.sequence(cc.sequence(cc.scaleTo(0.3, 1.2, 1.2), cc.scaleTo(0.3, 1, 1)), cc.callFunc(() => {
            cc.log("动画执行完毕", i);
            this.lastActionComplete = true;
        }));

        let actionBy = cc.sequence(cc.fadeIn(2.0), cc.callFunc(() => {
            this.imgComplete.node.runAction(seq);
            new AudioEngineUtils(GameConstant.itemCompleteMp3Name, () => {
                if (this.lastActionComplete){
                    this.nextGame();
                }
            });
        }));

        // var seq = cc.sequence(cc.scaleTo(0.3, 1.2, 1.2), cc.scaleTo(0.3, 1, 1));
        this.imgComplete.node.runAction(actionBy);

        console.log("游戏完成");


    }

    lastActionComplete = false;

    ParticleSysDestroy() {

        console.log("粒子被销毁");

        window.location.href = this.jumpUrl;
    }

    nextGame() {

        for (let i = 0; i < this.itemArr.length; i++) {
            let item = this.itemArr[i];
            item.ReleaseSelf();
        }
        AudioEngineUtils.uncacheALLeng();
        GameConstant.imgurlArr = [];
        this.selectMusicIndex=0;
        this.lastActionComplete = false;
        this.imgLoadIndex = 0;
        GameConstant.ItemStartPosition = [];
        GameConstant.ItemStartRotation = [];
        //this._prefab.destroy();
        // cc.loader.releaseRes("prefab/Item");
        this.onLoad();
    }

}