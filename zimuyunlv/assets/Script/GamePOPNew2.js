/**
 * Created by lvjun on 2017/5/18.
 */
import GameMng from './GameMng'

const {ccclass , property} = cc._decorator;

@ccclass
export default class GamePOPNew2 extends cc.Component {

    @property(cc.Node)
    bg = null;

    @property(cc.Node)
    back = null;

    @property(cc.Node)
    pops = null;

    @property(cc.Prefab)
    popPrefab = null;

    @property(cc.Node)
    mira = null;

    /**@type {GameMng} */
    gameObj = null;
    randomWords = null;
    action = cc.spawn(cc.moveTo(5,cc.p(0,200),cc.scaleTo(0,0.5)),cc.sequence(cc.rotateTo(1.0,10),cc.rotateTo(1,-10)));

    onLoad() {
        
    }

    init(gameObj) {
        this.gameObj = gameObj;
        this.words = gameObj.words;
        this.urls = gameObj.urls;

        this.randomWords = [0,1,2,3,4];

        this.mira.once("touchend",this.testOnClick,this);

        this.showPop();
    }

    testOnClick(e){
        console.log("e:",e);
    }

    showPop() {
        this.list = Math.random() > 0.5?0:1;

        var pop0 = cc.instantiate(this.popPrefab);
        pop0.parent = this.pops;

        this.popNum = this.randomWords[Math.floor(Math.random() * this.randomWords.length)];
        pop0.children[this.popNum].active = true;

        var pic = pop0.getChildByName("pic");
        pic.once(cc.Node.EventType.TOUCH_END,this.onPicTouchEnd,this);

        /**
         * @type {string}
         */
        var urlPath = this.urls[Math.floor(Math.random() * 4)];
        var urlPathArr = urlPath.split("|");
        cc.loader.loadRes(urlPathArr[0],cc.SpriteAtlas,function(err,alas){
            err && cc.error("-err:"+err);
            cc.info("--spriteFrame:"+urlPathArr[1]);
            pic.getComponent(cc.Sprite).spriteFrame = alas.getSpriteFrame(urlPathArr[1]);

            this.runPop(pop0);
        }.bind(this));

        //cc.loader.loadRes("Texture/D31_u",cc.SpriteAtlas,function(err,/**@type {cc.SpriteAtlas}*/spriteAtlas){
        //    pic.getComponent(cc.Sprite).spriteFrame = spriteAtlas.getSpriteFrame("nun1");  
        //    this.runPop(pop0);
        //}.bind(this));
    }

    runPop(popChild) {
        /**
         * @type {cc.Node}
         */
        var popChildView = popChild;
        popChildView.runAction(this.action);
    }

    
    onPicTouchEnd(/**@type {cc.Event}*/e){
        var picNode = e.target;

        picNode.runAction(cc.sequence(cc.fadeTo(0.1, 50), cc.fadeTo(0.1, 255), cc.fadeTo(0.1, 50), cc.fadeTo(0.1, 255),cc.delayTime(0.2),cc.fadeTo(0.1,0)));
    }

    //called every frame, uncomment this function to activate update callback
    update (dt) {

    }
}