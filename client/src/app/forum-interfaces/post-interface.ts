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
    

    constructor(PostID: string, PostTitle:string, BoardID: string, 
                User: string, Content: string, Date: string,
                DisplayComments: boolean, VoteCount: number )
    {
        this.PostID = PostID;
        this.PostTitle = PostTitle;
        this.BoardID = BoardID;
        this.User = User;
        this.Content = Content;
        this.Date = Date
        this.DisplayComments = DisplayComments;
        this.VoteCount = VoteCount;
    }

}

//constructor(docType:string, boardID:string, boardName: string, voteCount: number, date: Date ,title:string, 
//content: string, comments: string, imageLocation: string, videoLocation: string, displayComments: boolean)
