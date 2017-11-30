export default class AudioGroup {
    audio;

    constructor(url){
        cc.loader.load(url,function(err,audio){
           this.audio = audio;
         this.play();
                   }.bind(this));
    }

    play(){
        cc.audioEngine.play(this.audio,false,1);
    }
 
}