const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgCenter = null;
    /**@type {cc.Label} */
    @property(cc.Label)
    ClassName = null;

    /**@type {cc.Label} */
    @property(cc.Label)
    ClassDesc = null;

    _data = null;

    onLoad() {

    }

    initialize(data) {
        this._data = data;
 let url = data.category_pic;
        let loadData = {url:url,type:'png'};
        cc.loader.load(loadData, function (err, texture) {
            this.imgCenter.spriteFrame = new cc.SpriteFrame(texture);
        }.bind(this));

        this.ClassName.string = data.category_name;
        this.ClassDesc.string = data.category_desc;
    }


    clickItem() {
        cc.systemEvent.emit("item_click", this._data.category_id);
    }
}