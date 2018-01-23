export default class AnimationUtil {


    static NodeFadeIn(node){
        var action = cc.fadeIn(0.5);
        node.runAction(action);
    }


    static NodeFadeOut(node){
        var action = cc.fadeOut(0.5);
        node.runAction(action);
    }

}
