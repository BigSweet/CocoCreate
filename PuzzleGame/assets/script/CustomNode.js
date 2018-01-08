

export default class CustomNode extends cc.Node {

    constructor() {
        super();
        
        let s=this.addComponent(cc.Sprite);
        let url = "resources/lesson1/texture/57-a-1.png";
        cc.loader.load(cc.url.raw(url), function (err, texture) {
            let sf = new cc.SpriteFrame(texture);
            s.spriteFrame = sf;
        });
    }

    start() {
        cc.log("-- start --");
    }
}