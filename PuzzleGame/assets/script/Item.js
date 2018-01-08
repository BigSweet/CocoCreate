import GameConstant from "./GameConstant";
import MusciUtils from "./MusicUtils";
import AudioEngineUtils from "./AudioEngineUtils";




const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    _index = 0;
    img = null;
    startX = null;
    startY = null;

    startrotation = null;

    moveCallback = null;

    onLoad() {
        this.img = this.getComponent(cc.Sprite);

    }

    setTouch() {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
    }

    initialize(index, url) {
        this._index = index;
        let anchorVec = GameConstant.ItemAnchor[this._index];

        cc.loader.load(cc.url.raw(url), function (err, texture) {
            this.img.spriteFrame = new cc.SpriteFrame(texture);

            this.node.width = texture.width;
            this.node.height = texture.height;
            this.img.node.width = texture.width;
            this.img.node.height = texture.height;
            this.img.node.rotation = this.startrotation;

            this.node.anchorX = anchorVec.x / this.node.width;
            this.node.anchorY = anchorVec.y / this.node.height;

            cc.log("anchor:", this._index, this.node.anchorX, this.node.anchorY);
            
            cc.systemEvent.emit("loadComplete",null);
        }.bind(this));


    }

    arrive() {
        console.log("到达正确的格子，移除监听");
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    }

    unArrive() {
        

    }

    onDestroy() {
        cc.log("Dragger onDestroy!");
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    }


    onTouchStart(event) {
        console.log(event.getLocation().x+"locationx"+"----locationy"+event.getLocation().y);
        var delta = event.touch.getDelta();
        // event.touch.preventDefault();
        this.startX = delta.x;
        this.img.node.rotation = 0;

        this.startY = delta.y;
        console.log("startx" + this.startX + "-----starty" + this.startY+"imgnodex"+this.node.x+"----imgnodey"+this.node.y);
        // this.node.x = event.getLocation().x -GameConstant.ItemAnchor[this._index].x/2;
        // this.node.y = event.getLocation().y+  GameConstant.ItemAnchor[this._index].y/2;
        this.node.zIndex = 10;
        // this.startrotation=this.img.node.roration;
        /*    var self = this.node;
           cc.log("Dragger onTouchStart:" + this.moveTop);
           if (this.moveTop) {
               cc.log("old zIndex = " + this.node.zIndex);
               this.node.zIndex = 999;
           }
           if (this.callback) {
               var start = ["start", this.node];
               this.callback.emit([start]);//这里是2个参数的数组，接收那边对应的函数应该是2个参数即可，现在接收那边是数组参数，我现在给它外面再套一个数组!
           } */
    }

    onTouchMove(event) {
        var delta = event.touch.getDelta();
        this.node.x += delta.x;
        this.node.y += delta.y;
        console.log(this.node.zIndex + "------swsw");
        this.moveCallback.call();
    }


    onTouchEnd(event) {
        console.log("没有到达正确的格子，回到最开始的位置");
        //错误逻辑，回到原点
        this.node.zIndex = 0;
        this.node.x = GameConstant.ItemStartPosition[this._index].x;

        this.node.y = GameConstant.ItemStartPosition[this._index].y;

        this.img.node.rotation = GameConstant.ItemStartRotation[this._index];
        new AudioEngineUtils("puzzle_wrong",null);
        /*        this.node.runAction(cc.sequence(this.getFallAction(this.img.node.position,this.img.node), cc.callFunc(function () {
       
               }, this))); */


        /*   if (this.callback) {
              var end = ["end", this.node];
              this.callback.emit([end]);
          } */
    }
    getFallAction(position, img) {
        var startY = position.y;
        var x = img.posX;
        cc.log("baseLineY : " + this.baselineY);
        // var endY = this.charRootNode.convertToNodeSpace(cc.p(pos.x, this.baselineY)).y;
        var endY = img.saveY;
        var duration = Math.max(Math.abs(endY - startY) / 480, 0.3);
        cc.log("startY : " + startY);
        cc.log("endY : " + endY);
        cc.log("duration : " + duration);
        var action = cc.spawn(cc.moveTo(duration, cc.p(x, endY)), cc.rotateTo(duration, img.saveRotation));
        return action;
    }


    onTouchCancel(event) {

        /* if (this.callback) {
            var cancel = ["cancel", this.node];
            this.callback.emit([cancel]);
        } */
    }

    ReleaseSelf() {
        this.img.spriteFrame.clearTexture();
        this.img = null;

        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);

        let p = this.node.parent;
        p.removeChild(this.node);
    }

}