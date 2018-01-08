import GameConstant from "./GameConstant";
import MusciUtils from "./MusicUtils";
import AudioEngineUtils from "./AudioEngineUtils";



export default class Grid  {
    _index = 0;
    _item = null;

    _isComplete = false;
    myPos=null;
    constructor(index,item) {
        this._index = index;
        this._item = item;

        this.myPos = GameConstant.GridPositions[this._index];
        this._item.node.x = this.myPos.x;
        this._item.node.y = this.myPos.y;
        this._item.moveCallback = this.moveRun.bind(this);

        // this.x= PositionArr[index].x;
        // this.y= PositionArr[index].y;
 
    }



     moveRun() {
        //var newVec2 =this._item.node.convertToWorldSpace(cc.v2(this._item.node.x, this._item.node.y));

        /**@type {cc.Vec2} */
        // let myPos = GameConstant.GridPositions[this._index];
        let itemPos = new cc.Vec2(this._item.node.x,this._item.node.y);
        let deltapos = this.myPos.sub(itemPos);
        cc.log("mag:",deltapos.mag());
        if(deltapos.mag() < 20) {
            cc.log("到达正确的格子上了");

            this._item.arrive();
            this._isComplete = true;
              var actionBy = cc.moveTo(0.5, this.myPos.x,this.myPos.y);
             this._item.node.runAction(actionBy); 
            cc.systemEvent.emit("toCheck");
        }else{
            this._item.unArrive();

            cc.log("错误");
        }

        // console.log(x+"21321312");
        // newx,newy = _item.convertTo.....();
        
    }


 }