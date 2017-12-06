cc.Class({
    extends: cc.Component,


    properties: {
        bg:cc.Node,
        back:cc.Node,
        pops:cc.Node,
        popPrefab:cc.Prefab,
        mira:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        /**
         *
         * @type {cc.Node}
         */
        var a = null;

        /**
         *
         * @type {Array<cc.Node>}
         */
        var ns = [];
    },

    init:function(gameObj){
        this.gameObj = gameObj;
        this.words = gameObj.words;
        this.urls = gameObj.urls;

        this.randomWords = [0,1,2,3,4];

        this.showPop();
    },

    showPop:function(){
        this.list = Math.random() > 0.5?0:1;

        var pop0 = cc.instantiate(this.popPrefab);
        pop0.parent = this.pops;

        this.popNum = this.randomWords[Math.floor(Math.random() * 5)];
        pop0.children[this.popNum].active = true;

        var pic = pop0.getChildByName("pic");
        pic.active = true;
        cc.loader.loadRes(this.urls[1],cc.SpriteFrame,function(err,spriteFrame){
            err && cc.error("-err:"+err);
            cc.info("--spriteFrame:"+spriteFrame)
            pic.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }.bind(this));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
