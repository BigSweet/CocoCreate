
export default class CategoryDetailVo {
    resource_id;
    cartoon_pic;
    cartoon_mp4;
    cartoon_mp4_hd;
    cartoon_desc;
    cartoon_en_desc;

    constructor(data){
        this.resource_id = data.resource_id;
        this.cartoon_pic = data.cartoon_pic;
        this.cartoon_mp4 = data.cartoon_mp4;
        this.cartoon_mp4_hd = data.cartoon_mp4_hd;
        this.cartoon_desc = data.cartoon_desc;
        this.cartoon_en_desc = data.cartoon_en_desc;
    }
}