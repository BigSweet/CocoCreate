import SelectionItem from "../SelectionItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectionGroup extends cc.Component {
    /**@type {cc.Label} */
    @property(cc.Label)
    lblSelectCount_ = null;

    /**@type {cc.ScrollView} */
    @property(cc.ScrollView)
    scrollViewSelection_ = null;


    /**@type {[CategoryDetailVo]} */
    _detailVoArr = null;

    initialize(detailVoArr){
        this._detailVoArr = detailVoArr;

        cc.loader.loadRes("Prefab/CartoonDetail/SelectionItem",cc.Prefab,(err,prefab)=>{
            for(let i = 0;i<this._detailVoArr.length;++i) {
                /**@type {cc.Node}*/let prefabNode = cc.instantiate(prefab);
                prefabNode.parent = this.scrollViewSelection_.content;
                let vo = this._detailVoArr[i];
                let jsSelectionItem = prefabNode.getComponent(SelectionItem);
                jsSelectionItem.initialize(vo);
            }
        });
    }

    onDestroy(){
        cc.log("销毁 SelectionGroup..");
        cc.loader.releaseRes("Prefab/CartoonDetail/SelectionItem");
    }
}