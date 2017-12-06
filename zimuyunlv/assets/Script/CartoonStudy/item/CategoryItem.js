import CategoryDetail from "../../CategoryDetail/CategoryDetail";
import CategoryListVo from "../../model/vo/CategoryListVo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CategoryItem extends cc.Component {

    /**@type {cc.Label} */
    @property(cc.Label)
    lblName_ = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgPic_ = null;

    /**@type {CategoryListVo} */
    __itemVo = null;

    /**@type {cc.Texture2D} */
    __texture = null;

    initialize(itemVo){
        this.__itemVo = itemVo;

        this.lblName_.string = this.__itemVo.key;
        cc.loader.load({url:this.__itemVo.background,type:'png'},(err,texture)=>{
            if(!this.node || !this.node.isValid) return;
    
            this.__texture = texture;
            this.imgPic_.spriteFrame = new cc.SpriteFrame(this.__texture);
        });
    }

    clickItem(/**@type {cc.Event.EventTouch}*/e){
        let vo = this.__itemVo;
        cc.director.loadScene("CategoryDetail",()=>{
            let curScene = cc.director.getScene();
            let curCavas = curScene.children[0];
            let jsCategoryDetail = curCavas.getComponent(CategoryDetail);
            jsCategoryDetail.initialize(vo);
        });
    }
    
   /*  onDestroy(){
        cc.log("销毁 CategoryItem..");
        if(this.__texture) {
            cc.loader.release(this.__texture);
        }
    } */
}