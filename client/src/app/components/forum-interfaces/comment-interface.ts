export interface CommentInterface 
{
    postID: string;
    commentID: string;
    user: string;
    comment: string;
    voteCount: number;
    datePost: string;
}
  


export class CommentItem
{
  
    postID: string;
    commentID: string;
    user: string;
    comment: string;
    voteCount: number;
    datePost: string;
   
    constructor( postID:string, commentID: string, user: string, comment: string, voteCount: number, datePost: string)
    {
      
        this.postID = postID;
        this.commentID = commentID;
        this.user = user;
        this.comment = comment;
        this.voteCount = voteCount;
        this.datePost = datePost;
    }
}
