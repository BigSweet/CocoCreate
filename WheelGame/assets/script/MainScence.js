import CameraPosition from "./CameraPosition";
import AnimationUtil from "./AnimationUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScence extends cc.Component {

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    mWheelCircle = null;

    /**@type {cc.Node} */
    @property(cc.Node)
    WheelNode = null;

    /**@type {cc.Node} */
    @property(cc.Node)
    MainNode = null;

    /**@type {cc.Node} */
    @property(cc.Node)
    WheelBubbleNode = null;

    /**@type {cc.Node} */
    @property(cc.Node)
    WheelWordNode = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    img1 = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    img2 = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    img3 = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    img4 = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    img5 = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    img6 = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    imgnpc = null;

    /**@type {cc.Sprite} */
    @property(cc.Sprite)
    wheelBase = null;

    mCameraPosition;

    startRoration = true;

    scralAnimation = false;

    imgNodeArr = [];


    __lessonIndex = 0;

    temp;

    PointArr = [];

    index = 0;

    dx = 0;

    onLoad() {
        this.pushImgNodeToArr();
        setTimeout(() => {
            this.scralAnimation = true;
            var action = cc.moveTo(2, cc.p(-473, -262));
            this.imgnpc.node.runAction(action);
            let actionMove = cc.sequence(cc.moveTo(2, cc.p(130, 350)), cc.callFunc(() => {
                this.stopAnimation();
                this.WheelNode.on('touchstart', this.onTouchStart, this);
                this.WheelNode.on('touchmove', this.onTouchMove, this);
                this.WheelNode.on('touchend', this.onTouchEnd, this);
                this.WheelNode.on('touchcancel', this.onTouchCancel, this);
                this.FadeIn();
            }));
            this.MainNode.runAction(actionMove);
        }, 2000);
    }

    playMusic() {
        /*        new AudioEngineUtils("puzzle_right",()=>{
                   new AudioEngineUtils(GameConstant.itemCompleteMp3Name,null);
               }); */
    }

    FadeIn() {
        AnimationUtil.NodeFadeIn(this.WheelBubbleNode);
        AnimationUtil.NodeFadeIn(this.WheelWordNode);
    }

    FadeOut() {
        AnimationUtil.NodeFadeOut(this.WheelBubbleNode);
        AnimationUtil.NodeFadeOut(this.WheelWordNode);
    }


    readJson() {
        var jsonUrl = cc.url.raw("resources/" + this["json" + this.__lessonIndex++]);
        //读取json文件内容
        cc.loader.load(jsonUrl, function (err, json) {

        }.bind(this));

    }

    pushImgNodeToArr() {

        for (let i = 1; i <= 6; i++) {
            this.imgNodeArr.push(this["img"+i]);
        }
    }


    onTouchStart(event) {
        this.FadeOut();
    }

    onTouchMove(event) {
        var delta = event.touch.getDelta();
        if (delta.x < 0) {
            this.WheelNode.rotation += 2;
        } else {
            this.WheelNode.rotation -= 2;
        }
    }

    onTouchEnd(event) {
        for (let i = 0; i < this.imgNodeArr.length; i++) {
            //转化为世界坐标
            let vec1 = this.WheelNode.convertToWorldSpaceAR(cc.v2(this.imgNodeArr[i].node.x, this.imgNodeArr[i].node.y));
            let ArrarVec2 = new cc.Vec2(778, 487);
            if (i == 0) {
                this.temp = vec1.sub(ArrarVec2).mag();
                this.index = i;
            } else {
                if (vec1.sub(ArrarVec2).mag() < this.temp) {
                    this.temp = vec1.sub(ArrarVec2).mag();
                    this.index = i;
                }
            }
        }

        console.log("第几个最近" + (this.index + 1));
        //计算旋转角度
        this.getRoration(this.index);

    }

    getRoration(index) {
        //比较的基点778 487  中心点1118 1008

        let ImgNodeVec = this.WheelNode.convertToWorldSpaceAR(cc.v2(this.imgNodeArr[index].node.x, this.imgNodeArr[index].node.y));

        let WheelNodeVec = this.MainNode.convertToWorldSpaceAR(cc.v2(257, 31));

        let ArrarVec2 = new cc.Vec2(778, 487);

        let arr_wheel = ArrarVec2.sub(WheelNodeVec);

        let wheel_img = ImgNodeVec.sub(WheelNodeVec);

        let cos = (arr_wheel.dot(wheel_img)) / (arr_wheel.mag() * wheel_img.mag());

        let du = (Math.acos(cos).toFixed(4) * 180 / Math.PI );

        if (ImgNodeVec.y > ArrarVec2.y) {
            du = -du;
        }

        let ratation = cc.sequence(cc.rotateBy(0.5, du), cc.callFunc(() => {
            this.FadeIn();
        }));
        this.WheelNode.runAction(ratation);

    }

    onTouchCancel(event) {
        this.onTouchEnd(event);
    }

    //顺时针
    ClockwiseWheelRoration() {
        for (let i = 0; i < this.imgNodeArr.length; i++) {
            this.imgNodeArr[i].node.rotation = -this.WheelNode.rotation;
        }
    }

    update(dt) {
        this.ClockwiseWheelRoration();

        if (this.startRoration) {
            this.WheelNode.rotation += 1;
        }

        if (this.scralAnimation) {
            if (this.MainNode.scale <= 2.1) {
                this.MainNode.scale += 0.01;
                this.dx = this.dx + this.MainNode.width * 0.01;
            }
        }

    }

    startAnimation() {
        this.startRoration = true;
    }

    stopAnimation() {
        this.startRoration = false;
    }

}