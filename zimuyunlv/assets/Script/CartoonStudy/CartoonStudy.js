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

const { ccclass, property } = cc._decorator;

@ccclass
export default class CartoonStudy extends cc.Component {

    /**@type {cc.ScrollView} */
    @property(cc.ScrollView)
    ScrollView1_ = null;


    /**@type {cc.ScrollView} */
    @property(cc.ScrollView)
    ScrollView2_ = null;

      /**@type {cc.ScrollView} */
      @property(cc.ScrollView)
      ScrollView3_ = null;

        /**@type {cc.ScrollView} */
    @property(cc.ScrollView)
    ScrollView4_ = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgTop = null;

    /**@type {cc.Label} */
    @property(cc.Label)
    Label1 = null;

    /**@type {cc.Label} */
    @property(cc.Label)
    Label2 = null;

     /**@type {cc.Label} */
     @property(cc.Label)
     Label3 = null;
 
     /**@type {cc.Label} */
     @property(cc.Label)
     Label4 = null;




    onLoad() {

        let size = WindowScreenSize.getWindowSize();
        cc.view.setFrameSize(size.width, size.height);

        DataManager.instance.initialize(this.initialize, this);
        cc.director.preloadScene("CategoryDetail");
    }

    start() {

    }


    Label1Click() {
        var color = new cc.Color(6, 247, 54);
        this.Label1.node.color = color;
        var color = new cc.Color(0, 0, 0);
        this.Label2.node.color = color;
        this.Label3.node.color = color;
        this.Label4.node.color = color;
        this.ScrollView1_.node.active = true;
        this.ScrollView2_.node.active = false;
        this.ScrollView3_.node.active = false;
        this.ScrollView4_.node.active = false;
    }

    Label2Click() {
        var color = new cc.Color(6, 247, 54);
        this.Label2.node.color = color;
        var color = new cc.Color(0, 0, 0);
        this.Label1.node.color = color;
        this.Label3.node.color = color;
        this.Label4.node.color = color;
        this.ScrollView1_.node.active = false;
        this.ScrollView2_.node.active = true;
        this.ScrollView3_.node.active = false;
        this.ScrollView4_.node.active = false;
    }

    Label3Click() {
        var color = new cc.Color(6, 247, 54);
        this.Label3.node.color = color;
        var color = new cc.Color(0, 0, 0);
        this.Label2.node.color = color;
        this.Label1.node.color = color;
        this.Label4.node.color = color;
        this.ScrollView1_.node.active = false;
        this.ScrollView2_.node.active = false;
        this.ScrollView3_.node.active = true;
        this.ScrollView4_.node.active = false;
    }


    Label4Click() {
        var color = new cc.Color(6, 247, 54);
        this.Label4.node.color = color;
        var color = new cc.Color(0, 0, 0);
        this.Label2.node.color = color;
        this.Label3.node.color = color;
        this.Label1.node.color = color;
        this.ScrollView1_.node.active = false;
        this.ScrollView2_.node.active = false;
        this.ScrollView3_.node.active = false;
        this.ScrollView4_.node.active = true;
    }

    initialize() {
        let category1ListArr = DataManager.instance.getCategory1ListArr();
        let result = DataManager.instance.result1;
        let url = result.data.background;
        let loadData = { url: url, type: 'png' };
        console.log("==>", url);
        cc.loader.load(loadData, function (err, texture) {
            this.imgTop.spriteFrame = new cc.SpriteFrame(texture);

        }.bind(this));

        cc.loader.loadRes("Prefab/CartoonStudy/CategroyListItem", cc.Prefab, (err, prefab) => {
            for (var i = 0; i < category1ListArr.length; ++i) {
                /**@type {cc.Node}*/let categoryListItemNode = cc.instantiate(prefab);
                let categoryItemVo = category1ListArr[i];
                let jsCategoryItem = categoryListItemNode.getComponent(CategoryItem);
                jsCategoryItem.initialize(categoryItemVo);
                this.ScrollView1_.content.addChild(categoryListItemNode);
            }
        });


        let category2ListArr = DataManager.instance.getCategory2ListArr();

        cc.loader.loadRes("Prefab/CartoonStudy/CategroyListItem", cc.Prefab, (err, prefab) => {
            for (var i = 0; i < category2ListArr.length; ++i) {
                /**@type {cc.Node}*/let categoryListItemNode = cc.instantiate(prefab);
                let categoryItemVo = category2ListArr[i];
                let jsCategoryItem = categoryListItemNode.getComponent(CategoryItem);
                jsCategoryItem.initialize(categoryItemVo);
                this.ScrollView2_.content.addChild(categoryListItemNode);
            }
        });

        let category3ListArr = DataManager.instance.getCategory3ListArr();

        cc.loader.loadRes("Prefab/CartoonStudy/CategroyListItem", cc.Prefab, (err, prefab) => {
            for (var i = 0; i < category3ListArr.length; ++i) {
                        /**@type {cc.Node}*/let categoryListItemNode = cc.instantiate(prefab);
                let categoryItemVo = category3ListArr[i];
                let jsCategoryItem = categoryListItemNode.getComponent(CategoryItem);
                jsCategoryItem.initialize(categoryItemVo);
                this.ScrollView3_.content.addChild(categoryListItemNode);
            }
        });



        let category4ListArr = DataManager.instance.getCategory4ListArr();

        cc.loader.loadRes("Prefab/CartoonStudy/CategroyListItem", cc.Prefab, (err, prefab) => {
            for (var i = 0; i < category4ListArr.length; ++i) {
                                /**@type {cc.Node}*/let categoryListItemNode = cc.instantiate(prefab);
                let categoryItemVo = category4ListArr[i];
                let jsCategoryItem = categoryListItemNode.getComponent(CategoryItem);
                jsCategoryItem.initialize(categoryItemVo);
                this.ScrollView4_.content.addChild(categoryListItemNode);
            }
        });
    }
}
