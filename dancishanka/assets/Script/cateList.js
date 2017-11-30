import ClassListModel from "./model/ClassListModel";
import Item from "./items/Item";


const {ccclass,property} = cc._decorator;

@ccclass
export default class cateList extends cc.Component {
 /**@type {cc.ScrollView} */
 @property(cc.ScrollView)
 scrollMain=null;    


    onLoad(){
 
        var _self = this;
        ClassListModel.instance.getClassList(this.success,this);
        
    }

    success(result){
        console.log(result);
        
        cc.loader.loadRes("prefab/Item",function(err,prefab){
            console.log("====",err,prefab);
            /**@type {[]}*/let listArr = result.data.category_list;
           
            for(let i = 0;i<listArr.length;++i) {
                /**@type {cc.Node}*/let itemNode = cc.instantiate(prefab);
                let item = itemNode.getComponent(Item);
                item.initialize(listArr[i]);
                this.scrollMain.content.addChild(itemNode);
               
            }

        }.bind(this));

       
                                        
        
    }

    clickBack(){
        cc.systemEvent.emit("back_click", "back");
    }

    update(dt){
        
     }
}