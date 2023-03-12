import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/components/service/user.service';
import { IUser, IPet} from 'src/app/components/interfaces/form';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SharedFormComponent } from 'src/app/components/shared-form/shared-form.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PetComponent } from '../pet/pet.component';
import { PetSitterServiceComponent } from '../pet-sitter-service/pet-sitter-service.component';
import { IPetOwner, IPetSitter, IPetSitterID } from '../interfaces/users';
import { PetService } from '../service/pet.service';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { OrderComponent } from '../order/order.component';
import { Review } from 'src/app/components/ReviewInterfaces/review';
import { ReviewService } from 'src/app/components/Review-services/review.service';
import { ActivatedRoute } from '@angular/router';
import { SearchServiceService } from 'src/app/service/search_service_services/search-service.service';
import { ServiceInterface } from 'src/app/Interfaces/service-interface';
import { OrderService } from '../service/order.service';
import { INotAvailable, IOrderList } from '../interfaces/order';
import { StreamChat, ChannelData, UserResponse, TokenProvider, UserFromToken } from 'stream-chat';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-pet-sitter-details',
  templateUrl: './pet-sitter-details.component.html',
  styleUrls: ['./pet-sitter-details.component.scss']
})
export class PetSitterDetailsComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  public user: IUser; 
  public pet:IPet;
  isReadOnly?:boolean = false; 
  isSelected:boolean = false; 
  isShow:boolean; 
  isPetOwner:boolean = false; 
  public petOwner: IPetOwner; 
  public petSitter: IPetSitterID; 
  public petDetails:IPet[]; 
  selected: Date | null;
  reviews:Review[] = [];
  serviceList:ServiceInterface[] = [];
  message: any;
  email: string;
  userID: string;

  averageRoundStars: number;

  orders:IOrderList[] = [];
  datesToGray : Date[] = [];
  notAvailble:INotAvailable[] = [];
  componentFlag = "searchProfile";


  //start chat channel
  private readonly userDetails = localStorage.getItem('PetConnectUser');
  chatUserPetOwner = JSON.parse(this.userDetails);
  private readonly apiKey = environment.stream.key;
  private user1Token = this.chatUserPetOwner.chatToken; // the token for pet owner
  private user2Token = ''; // the token for pet sitter
  chatOwnerId = this.chatUserPetOwner.chatUserName;
  chatSitterId = '';
  chatName1 = this.chatUserPetOwner.name;
  chatName2 = '';
  chatUser1Img = this.chatUserPetOwner.profilePicUrl;
  chatUser2Img = '';
  private client: StreamChat;



  //weird 0 on data being returned, refactor get method in this class, get method in service
  
  // make sure all other gets are working 


  // array of key words to check for images// 
  picKeyWords: string[] = ["Feed", "Walk", "Sitting","Grooming"] 


  dateFilter: (date: Date | null) => boolean =
  (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day == 1; // 1 means monday, 0 means sunday, etc.
  };

  
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    var date = cellDate.getDate();
    console.log(date);
    
    // if (view == 'month') {
        return 'highlightCard';
    // }
  }



  @ViewChild('picker') picker:ElementRef;

  constructor(private _userService: UserService, private _petService:PetService, public authenticator: AuthenticatorService, 
    private dialog:MatDialog, private renderer: Renderer2,  private review:ReviewService,public r : ActivatedRoute,
     private service: SearchServiceService,private _order: OrderService, private router: Router
     ,private readonly dateAdapter: DateAdapter<Date>) {

      this.client = new StreamChat(this.apiKey);

  //   this._userService.get_user().subscribe((res: IUser) => {
  //     this.user= res; 

  //     console.log(this.user.emailAddress)
  //   })
   }

   myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  
  ngOnInit(): void {

    console.log(this.selected); 
   
    this.userID = this.r.snapshot.paramMap.get('id');
    //get users services
    this.getServices(Number(this.userID));
    this.getPetSitter(Number(this.userID));
    this.GetOrders(Number(this.userID));
    this.GetnotAvailable(Number(this.userID));
  

    console.log(this.petSitter);
 
    console.log('picker', this.picker);

  

  this.pet = {
    "name": "Lucy",
    "description": "She snores when sleeps",
    "petImageUrl": "https://img.freepik.com/free-photo/pug-dog-isolated-white-background_2829-11416.jpg?w=2000",
    "dob": "2018-03-21",
    "petType":"Dog",
    "petBreed": "Pug",
    "PetSize": "Small", 
    "createdDate":"12/09/2022", 
  }

   
  }


//getpet owner 
// getPetOwner(){
//   this._userService.get_petowner("joannasmith@gmail.com").subscribe(
//     petOwner=>{
//       this.petOwner = petOwner;
//       console.log(petOwner)
//     }); 
//     return false; 
//   }


// this.dialogRef2 = this.dialog.open(MessageAlertComponent, {data:{ order: this.order}


onCreateOrder(){
  // this._userService.initializeFormGroup(); 
  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.disableClose = false; 
  dialogConfig.autoFocus = true; 
  dialogConfig.width = "60%";
  this.dialog.open(OrderComponent, {data:{petSitter:this.petSitter, serviceList:this.serviceList}}); 

}

  getPetSitter(id: number){
    this._userService.get_petsitter_ID(id).subscribe(
      petSitter=>{
        this.petSitter = petSitter[0];
        console.log('favorite sitter', petSitter)
        //rounded average to print stars on profile view
        this.averageRoundStars = Math.floor(this.petSitter.ReviewsTotal / this.petSitter.NumReviews);
        this.user2Token = petSitter[0].ChatToken;
        this.chatSitterId = petSitter[0].ChatUserName;
        this.chatUser2Img = petSitter[0].profilePicUrl;
        this.chatName2 = petSitter[0].name;
      }); 
      
      return false; 
    }

//get pets 

  
  onCreate(){
    // this._userService.initializeFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(SharedFormComponent, dialogConfig); 

  }
  onCreatePet(){
    // this._userService.initializeFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(PetComponent, dialogConfig)
  }
  onCreateService(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = false; 
    dialogConfig.width = "80%";
    dialogConfig.height = "93%";
    this.dialog.open(PetSitterServiceComponent, dialogConfig)
  }

  getReviews(id: number):boolean
  {
    
    this.review.getReviews(id).subscribe({
      next: (value: Review[] )=> this.reviews = value,
      complete: () => console.log('Review service finished ' +  JSON.stringify((this.reviews))),
      error: (mess) => this.message = mess
    })
    return false;
  }

  getServices(id: number): void {
    this.service.getOtherServices(id).subscribe({
      next: (value: ServiceInterface[]) => {
        this.serviceList = value;
      },
      error: (error: any) => {
        this.message = error;
      },
      complete: () => {
        console.log('service finished ', (this.service));
      }
    });
  }
  

  GetOrders(id: number)
  {
    this._order.getOrdersList(id).subscribe({
      next: (value: IOrderList[] )=>this.orders = value,
      complete: () => console.log('Order service finished ' +  JSON.stringify((this.orders))),
      error: (mess) => this.message = mess
    })
  }

  GetnotAvailable(id: number)
  {
    this._order.getNotAvailable(id).subscribe({
      next: (value: INotAvailable[] )=>this.notAvailble = value,
      complete: () => console.log('not available service finished ' +  JSON.stringify((this.notAvailble))),
      error: (mess) => this.message = mess
    })
  }

  num(n: number): Array<number> {
    //alert(n);
    return Array(n);
  }

  //create new chat
  async startChatChannel() {
    const user1Id =  this.chatOwnerId;//pet owner chatUserName
    const user2Id = this.chatSitterId;//pet sitter chatUserName
    // const user2Id = {
    //   id: this.chatSitterId,//pet sitter chatUserName
    //   name: this.chatName2,
    //   image: this.chatUser2Img
    // };

    const userTokenProvider: TokenProvider = async () => {
      return this.user1Token;
    };

    await this.client.connectUser(
      { id: user1Id, name: this.chatName1, image: this.chatUser1Img },
      userTokenProvider,
    );

    // const userTokenProvider2: TokenProvider = async () => {
    //   return this.user2Token;
    // };
    
    // await this.client.connectUser(
    //   { id: user2Id, name: this.chatName2, image: this.chatUser2Img },
    //   userTokenProvider2,
    // );

    const channelData: ChannelData = {
      members: [user1Id, user2Id],
      name: 'my-new-channel',
      created_by_id: user1Id
    };

    const channel = this.client.channel('messaging', channelData);

    await channel.create();

    this.router.navigate(['/chat']);
    console.log(channel);
  }
  private readonly DATES_TO_DISABLE: Date[] = [
    new Date('2023-03-10'), // March 10th, 2023
    new Date('2023-03-15'), // March 15th, 2023
    new Date('2023-03-20')  // March 20th, 2023
  ];

  shouldDisableDate = (date: Date): boolean => {
    // Check if the date is selected
    if (this.DATES_TO_DISABLE.some(selectedDate =>
      this.dateAdapter.compareDate(date, selectedDate) === 0
    )) {
      return false;
    }
  
    // Otherwise, enable the date
    return true;
  }


  

}
/**
 *
 *  getPetDetails(){
  this._petService.get_petdetails("joannasmith@gmail.com").subscribe(
    petDetails=>{
      this.petDetails = petDetails; 
      console.log(petDetails)
    }); 
    return false; 
}

 */
