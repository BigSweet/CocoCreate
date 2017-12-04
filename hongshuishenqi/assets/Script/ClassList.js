import lediModel from "./model/lediModel";
import classListModel from "./model/classListModel";
import Item from "./items/Item";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ClassList extends cc.Component {
    /**@type {cc.ScrollView} */
 @property(cc.ScrollView)
 scrollMain=null;    


    onLoad(){
        var _self = this;
        classListModel.instance.getCLassList(this.success,this);
    }

    success(result){
        console.log(result);
        
        cc.loader.loadRes("prefab/Item",function(err,prefab){
            console.log("====",err,prefab);
            /**@type {[]}*/let listArr = result.data.chapter_list;
           
            for(let i = 1;i<listArr.length;++i) {
                /**@type {cc.Node}*/let itemNode = cc.instantiate(prefab);
                let item = itemNode.getComponent(Item);
                item.initialize(listArr[i],i);
                this.scrollMain.content.addChild(itemNode);
            }

        }.bind(this));

       
                                        
        
    }

    clickBack(){
        cc.systemEvent.emit("back_click", "back");
    }
}