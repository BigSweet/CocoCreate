export default class AudioGroup {
    audio;
    constructor(url){
        this.audio= new Audio(url);
        this.audio.loop=false;
        this.audio.play();
    }

}