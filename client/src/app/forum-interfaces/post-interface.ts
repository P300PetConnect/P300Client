export interface PostInterface 
{
  PostID: string;
  PostTitle: string;
  BoardID: string;
  User: string
  Content: string;
  Date: string;
  VoteCount: number;
  DisplayComments: boolean;
  imageProfileUrl:string;
}

    export class PostItem
{
  
    PostID: string;
    PostTitle: string;
    BoardID: string;
    User: string
    Content: string;
    Date: string;
    VoteCount: number;
    DisplayComments: boolean;
    imageProfileUrl:string;
    

    constructor(PostID: string, PostTitle:string, BoardID: string, 
                User: string, Content: string, Date: string,
                DisplayComments: boolean, VoteCount: number, imageProfileUrl:string )
    {
        this.PostID = PostID;
        this.PostTitle = PostTitle;
        this.BoardID = BoardID;
        this.User = User;
        this.Content = Content;
        this.Date = Date
        this.DisplayComments = DisplayComments;
        this.VoteCount = VoteCount;
        this.imageProfileUrl = imageProfileUrl; 
    }

}

//constructor(docType:string, boardID:string, boardName: string, voteCount: number, date: Date ,title:string, 
//content: string, comments: string, imageLocation: string, videoLocation: string, displayComments: boolean)
