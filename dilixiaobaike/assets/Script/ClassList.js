import classListModel from "./model/classListModel";
import Item from "./items/Item";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ClassList extends cc.Component {
    /**@type {cc.ScrollView} */
 @property(cc.ScrollView)
 scrollMain=null;    


    onLoad(){
        cc.log(document.body.clientWidth,document.body.clientHeight);
        cc.view.setFrameSize(document.body.clientWidth,document.body.clientHeight);
        var _self = this;
        classListModel.instance.getCLassList(this.success,this);
        cc.systemEvent.on("item_click",this.itemClickHandler,this);
        // this.scrollMain.node.on('scroll-to-bottom', this.callback, this);
    }


   /*  callback(){
        console.log("滑动到底部啦");
    } */
    success(result){
        cc.loader.loadRes("prefab/Item",function(err,prefab){
            console.log("====",err,prefab);
            /**@type {[]}*/let listArr = result.data.feed_list;
            for(let i = 0;i<listArr.length;++i) {
                /**@type {cc.Node}*/let itemNode = cc.instantiate(prefab);
                let item = itemNode.getComponent(Item);
                item.initialize(listArr[i]);
                this.scrollMain.content.addChild(itemNode);
            }

        }.bind(this));
        
    }

    itemClickHandler(/**@type {cc.Event.EventCustom}*/event){
            window.location.href=event.detail;
    }
  
}