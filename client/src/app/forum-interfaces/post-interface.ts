export interface PostInterface 
{
    //docType: string;
    // boardID: string;
    // boardName: string;
    PostID: string,
    PostTitle: string,
     VoteCount: number;
     Date: Date;
 
     Content: string;
     //Comments: string;
     //imageLocation: string;
    // videoLocation: string;
     DisplayComments: boolean;
}

    export class PostItem
{
   // docType: string;
   // boardID: string;
   // boardName: string;
   
   PostID: string;
    PostTitle: string;
    Content: string;
    Date: string;
    //Comments: string;
    //imageLocation: string;
   // videoLocation: string;
    VoteCount: number;
    DisplayComments: boolean;

    constructor(PostID: string, PostTitle:string, Content: string, Date: string,DisplayComments: boolean, VoteCount: number )
    {
       // this.docType = docType;
      //  this.boardID = boardID;
      //  this.boardName = boardName
     
       this.PostID = PostID;
        this.PostTitle = PostTitle;
        this.Content = Content;
        this.Date = Date
       
      //  this.Comments = comments;
       // this.imageLocation = imageLocation;
      //  this.videoLocation = videoLocation;
        this.DisplayComments = DisplayComments;
        this.VoteCount = VoteCount;
    }

}

//constructor(docType:string, boardID:string, boardName: string, voteCount: number, date: Date ,title:string, 
//content: string, comments: string, imageLocation: string, videoLocation: string, displayComments: boolean)
