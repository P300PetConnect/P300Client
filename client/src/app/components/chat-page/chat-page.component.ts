import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { environment } from 'src/environments/environment';
import { ChannelService, ChatClientService, StreamI18nService } from 'stream-chat-angular';
import { IPetOwner } from '../interfaces/users';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  chatName?:IPetOwner; 

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService) {}

  ngOnInit(): void {
    this.streamI18nService.setTranslation();
    this.chatName = JSON.parse(localStorage.getItem('PetOwner'));

    this.chatService.init(environment.stream.key, this.chatName?.chatUserName , this.chatName?.chatToken);
    //this.chatService.init(environment.stream.key, 'fatherted@gmail', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmF0aGVydGVkQGdtYWlsIn0.xAa90NtHiXLMMCTvjOOvkyBZeTGMueTZGOW13vZ1pcM');
    this.channelService.init({
      type: 'messaging',
      members: { $in: [this.chatName?.chatUserName] }
      //members: { $in: ['fatherted@gmail'] }
    });
    
  }

}

