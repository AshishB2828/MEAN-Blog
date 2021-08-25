export class BlogPost{
        _id:any
        title:string =''
        body:string =''
        uid:any
        images:Array<any>=[]
        createdBy:string =''
        createdAt:string =''
        likedBy:Array<any>=[]
        DislikedBy:Array<any>=[]
        likes:number=0
        Dislikes:number=0
        comments= { comment:'', commentator:'' }
}