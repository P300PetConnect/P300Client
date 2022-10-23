export interface PostInterface 
{
    //docType: string;
    // boardID: string;
    // boardName: string;
    UserID: string,
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
    docType: string;
   // boardID: string;
   // boardName: string;
    voteCount: number;
    date: Date;
    title: string;
    content: string;
    //Comments: string;
    //imageLocation: string;
   // videoLocation: string;
    displayComments: boolean;

    constructor(docType:string, boardID:string, boardName: string, voteCount: number, date: Date ,title:string, 
        content: string, comments: string, imageLocation: string, videoLocation: string, displayComments: boolean)
    {
        this.docType = docType;
      //  this.boardID = boardID;
      //  this.boardName = boardName
        this.voteCount = voteCount;
        this.date = date
        this.title = title;
        this.content = content;
      //  this.Comments = comments;
       // this.imageLocation = imageLocation;
      //  this.videoLocation = videoLocation;
        this.displayComments = displayComments;
    }

}

