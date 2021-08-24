export class BlogPost{
        _id:any
        title:string =''
        body:string =''
        images=[]
        createdBy:string =''
        createdAt:string =''
        likedBy=[]
        DislikedBy=[]
        likes:number=0
        Dislikes:number=0
        comments= { comment:'', commentator:'' }
}