
export default class CocosAnalyticsInstance {
    static ___instance;

    /**@type {CocosAnalyticsInstance} */
    static get instance(){
        if(!CocosAnalyticsInstance.___instance) {
            CocosAnalyticsInstance.___instance = new CocosAnalyticsInstance();
        }
        return CocosAnalyticsInstance.___instance;
    }

    initialize(){
        //开启/关闭本地日志的输出
        cocosAnalytics.enableDebug(CC_DEBUG);
        // 开始登陆
        cocosAnalytics.CAAccount.loginStart();
    }

    loginSuccess(userID){
        // 登陆成功
        cocosAnalytics.CAAccount.loginSuccess({'userID':''+userID});
    }

    loginFail(){
        // 登陆失败
        cocosAnalytics.CAAccount.loginFailed();
    }

    logout(userID){
        // 退出登陆
        cocosAnalytics.CAAccount.logout({'userID':''+userID});
    }

    customEvent(eventName){
        // 自定义事件
        // 参数：事件ID（必填）, 不得超过30个字符
        cocosAnalytics.CAEvent.onEvent({
            eventName:eventName
        });
    }

    customEventStartAndEnd(/**@type {string} */eventName,/**@type {boolean} */isStart){
        // 自定义事件，需要关心自定义时间时长的使用此接口
        // 参数：事件ID（必填）, 不得超过30个字符
        if(isStart) {
            cocosAnalytics.CAEvent.onEventStart({
                eventName:eventName
            });
        }else {
            cocosAnalytics.CAEvent.onEventEnd({
                eventName:eventName
            })
        }
    }

}