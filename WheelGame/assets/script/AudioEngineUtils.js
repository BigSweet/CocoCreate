

export default class AudioEngineUtils  {

    Sound_File_Ext=".mp3";//声音文件后缀名


    constructor(name, endcallback){
        
        let audioID=cc.audioEngine.play(this.getSoundUrl(name), false, 1);
        cc.audioEngine.setFinishCallback(audioID, function () {
            if(endcallback){
                endcallback();
            }
        });
    }


    getSoundUrl(name) {
        let soundURL = cc.url.raw("resources/sound/"+ name + this.Sound_File_Ext);
        if(cc.loader.md5Pipe) {
            soundURL = cc.loader.md5Pipe.transformURL(soundURL);
        }
        console.log("mp3 文件路径:",soundURL);
        return soundURL;
    }


     static uncacheALLeng(){
        cc.audioEngine.uncacheAll();
    }
}

