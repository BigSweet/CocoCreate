import CategoryDetailVo from "../model/vo/CategoryDetailVo";

const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class SelectionItem extends cc.Component {
    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgThumb_ = null;

    /**@type {cc.Label} */
    @property(cc.Label)
    descCartoon_ = null;

    
    /**@type {CategoryDetailVo} */
    __categoryDetailVo = null;

    initialize(vo) {
        this.__categoryDetailVo = vo;

        this.descCartoon_.string = this.__categoryDetailVo.cartoon_desc;
        cc.loader.load({url:this.__categoryDetailVo.cartoon_pic,type:"png"},(err,texture)=>{
            this.imgThumb_.spriteFrame = new cc.SpriteFrame(texture);
        });
    }

    onSelectionItemClick(/**@type {cc.Event.EventTouch}*/e){
        cc.systemEvent.emit("Refresh_Video_Player",this.__categoryDetailVo);
    }
}