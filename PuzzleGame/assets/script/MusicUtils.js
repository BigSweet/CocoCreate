export default class MusciUtils  {

    Sound_File_Ext=".mp3";//声音文件后缀名

    constructor(name,endCallBack){
        this._endCallBack=endCallBack;
        this.getAudio(name);
    }




    getAudio(name){
       
        this.audio = new Audio(this.getSoundUrl(name));
        this.audio.addEventListener("canplay",()=>{
            this.audio.play();
            cc.log("--->can be play()!!!");
        });
        this.audio.addEventListener("ended",()=>{
        });
        this.audio.loop=false;
        this.audio.load();
    }

    getSoundUrl(name) {
        let soundURL = cc.url.raw("resources/sound/"+ name + this.Sound_File_Ext);
        if(cc.loader.md5Pipe) {
            soundURL = cc.loader.md5Pipe.transformURL(soundURL);
        }
        console.log("mp3 文件路径:",soundURL);
        return soundURL;
    }
}