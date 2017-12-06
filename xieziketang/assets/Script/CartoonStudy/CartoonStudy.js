import DataManager from "../server/DataManager";
import CategoryItem from "./item/CategoryItem";
import WindowScreenSize from "../weixin/WindowScreenSize";


// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CartoonStudy extends cc.Component {

    /**@type {cc.ScrollView} */
    @property(cc.ScrollView)
    categoryScrollView_ = null;


     /**@type {cc.ScrollView} */
     @property(cc.ScrollView)
     aScrollView_ = null;

      /**@type {cc.Sprite} */
      @property(cc.Sprite)
      imgTop = null;

        /**@type {cc.Label} */
        @property(cc.Label)
        Labela = null;

          /**@type {cc.Label} */
      @property(cc.Label)
      LabelA = null;
  

    onLoad() {
        
        let size = WindowScreenSize.getWindowSize();
        cc.view.setFrameSize(size.width,size.height);

        DataManager.instance.initialize(this.initialize,this);
        cc.director.preloadScene("CategoryDetail");
    }

    start() {
        
    }


    ALabelClick(){
        var color=new cc.Color(6,247, 54);
        this.LabelA.node.color=color;
        var color=new cc.Color(0,0, 0);
        this.Labela.node.color=color;
        this.aScrollView_.node.active=false;
        this.categoryScrollView_.node.active=true;
    }

    aLabelClick(){
        var color=new cc.Color(6,247, 54);
        this.Labela.node.color=color;
        var color=new cc.Color(0,0, 0);
        this.LabelA.node.color=color;
        this.aScrollView_.node.active=true;
        this.categoryScrollView_.node.active=false;
    }
    initialize(){
        let categoryListArr = DataManager.instance.getCategoryListArr();

        let result=DataManager.instance.result;
        let url=result.data.background;
        let loadData = { url: url, type: 'png' };
        console.log("==>", url);
        cc.loader.load(loadData, function (err, texture) {
            this.imgTop.spriteFrame = new cc.SpriteFrame(texture);

        }.bind(this));
    
        cc.loader.loadRes("Prefab/CartoonStudy/CategroyListItem",cc.Prefab,(err,prefab)=>{
            for(var i = 0;i<categoryListArr.length;++i) {
                /**@type {cc.Node}*/let categoryListItemNode = cc.instantiate(prefab);
                let categoryItemVo = categoryListArr[i];
                let jsCategoryItem = categoryListItemNode.getComponent(CategoryItem);
                jsCategoryItem.initialize(categoryItemVo);
                this.categoryScrollView_.content.addChild(categoryListItemNode);
            }
        });


        let lettercategoryListArr = DataManager.instance.getLetterCategoryListArr();

        let aresult=DataManager.instance.aresult;
        cc.loader.loadRes("Prefab/CartoonStudy/CategroyListItem",cc.Prefab,(err,prefab)=>{
            for(var i = 0;i<lettercategoryListArr.length;++i) {
                /**@type {cc.Node}*/let categoryListItemNode = cc.instantiate(prefab);
                let categoryItemVo = lettercategoryListArr[i];
                let jsCategoryItem = categoryListItemNode.getComponent(CategoryItem);
                jsCategoryItem.initialize(categoryItemVo);
                this.aScrollView_.content.addChild(categoryListItemNode);
            }
        });
    }
}
