const {ccclass , property} = cc._decorator;

@ccclass
export default class GameMng extends cc.Component {
    @property
    json = "E27D31.json";

    @property
    lesson_type = 0;

    // use this for initialization
    onLoad () {
        var jsonUrl = cc.url.raw("resources/Data/"+this.json);

        cc.loader.load(jsonUrl,function(err,json) {
            this.games = json.games;
            this.endToScene = json.endToScene;
            this.curIndex = 0;

            this.loadGame(this.games[this.curIndex]);
        }.bind(this));

        cc.log("GameMng onLoad, jsonUrl="+jsonUrl);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    loadGame (gameObj) {
        var gameName = gameObj.name;
        switch (gameName) {
            case "戳泡泡1":
                var prefab = "Prefab/GamePOPNew";
                break;
        }

        cc.loader.loadRes(prefab,function(err,prefab) {
            err && cc.error("-GameMng-,err:"+err);
            this.gameNode = cc.instantiate(prefab);
            this.gameNode.parent = this.node;

            var jsComponent = this.gameNode.getComponent("GamePOPNew2");
            jsComponent.init(gameObj);
        }.bind(this));
    }
}
