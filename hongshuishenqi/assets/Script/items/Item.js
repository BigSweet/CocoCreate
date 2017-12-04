const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgCenter = null;
    /**@type {cc.Label} */
    @property(cc.Label)
    ClassName = null;

    _data = null;
    i=null;
    onLoad() {

    }

    initialize(data,int) {
        this.i=int;
        this._data = data;
 let url = data.chapter_pic;
        let loadData = {url:url,type:'png'};
        cc.loader.load(loadData, function (err, texture) {
            this.imgCenter.spriteFrame = new cc.SpriteFrame(texture);
            this.imgCenter.node.setContentSize(new cc.Size(100,100));
        }.bind(this));
        this.ClassName.string = data.chapter_name;
  
    }


    clickItem() {
        cc.systemEvent.emit("item_click", this.i);
    }
}