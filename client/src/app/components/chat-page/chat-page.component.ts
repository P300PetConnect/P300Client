import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConnectContactLens } from 'aws-sdk';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChannelService, ChatClientService, StreamI18nService } from 'stream-chat-angular';
import { IPetOwner } from '../../interfaces/users';
import { OrderComponent } from '../order/order.component';
import { PetService } from '../../service/pet.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  group = JSON.parse(localStorage.getItem('userGroup'));
  userDetails = localStorage.getItem('PetConnectUser');
  chatName = JSON.parse(this.userDetails);
  members: any[] = [];
  serviceList = JSON.parse(localStorage.getItem('serviceList')); 
  petSitter = JSON.parse(localStorage.getItem('PetSitter')); 
  petOwner: any;

  petDetails: import("../../interfaces/form").IPet[];
  petOwner2: import("../../interfaces/form").IUser;
  petOwnerEmail: any;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private _userService: UserService,
    private http: HttpClient,
    private dialog:MatDialog,  private _petService:PetService) {}

  ngOnInit(): void {


    this.streamI18nService.setTranslation();
    this.chatService.init(environment.stream.key, this.chatName.chatUserName, this.chatName.chatToken);
    this.channelService.init({
      type: 'messaging',
      members: { $in: [this.chatName.chatUserName] }
    });

    let currentChannel;
    const currentUserID = this.chatName.chatUserName;
    // Subscribe to the channels$ observable and log the user IDs of all members
    this.channelService.channels$.subscribe((channels) => {
      if (channels.length > 0) {
        currentChannel = channels[0];
        currentChannel.queryMembers({}, undefined, {})
          .then((response) => {
            response.members.forEach(member => {
              if(member.user.id !== this.chatName.chatUserName)
              console.log('Other user ID:', member.user.id);
              this.petOwnerEmail =  member.user.id; 
              this.members.push(member.user.id);
            });
            console.log('Other user ID:', this.members[1]);
            //get petownerdetails
            this.getPetOwnerDetails();

          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  getPetOwnerDetails(){
    console.log('made a call');
    this.http.get<IPetOwner>("https://5ugucpgs6k.execute-api.eu-west-1.amazonaws.com/dev/user/"+this.members[1])
    .subscribe(
      (response: any) => {
        console.log('Received response:', response);
        localStorage.setItem('ownerOrderDetails', JSON.stringify(response));
        this.petOwner = response; 
        this.getPetDetails(); 
      },
      (error: any) => {
        console.error('Failed to get data:', error);
      }
    );
  }

  async getPetDetails(){
    try{
      console.log(this.petOwner?.emailAddress); 
      const petDetails =  await this._petService.get_petdetails( this.petOwner?.emailAddress).toPromise()
      this.petDetails = petDetails; 
      console.log(petDetails)
      localStorage.setItem('petDetails', JSON.stringify(this.petDetails));
console.log('Pet Details', this.petDetails); 
     }catch (error) {
      console.error(error);
    }
}



  onCreateOrder(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(OrderComponent, {data:{petSitter:this.petSitter, serviceList:this.serviceList, petOwner:this.petOwner, petDetails: this.petDetails}}); 
  
  }

}

