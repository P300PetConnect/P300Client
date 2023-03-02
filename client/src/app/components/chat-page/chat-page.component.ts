import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChannelService, ChatClientService, StreamI18nService } from 'stream-chat-angular';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  ///get from localstorage
  userDetails = localStorage.getItem('PetConnectUser');
  chatName = JSON.parse(this.userDetails);

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService) {}

  ngOnInit(): void {
    this.streamI18nService.setTranslation();
    this.chatService.init(environment.stream.key, this.chatName.chatUserName, this.chatName.chatToken);
    this.channelService.init({
      type: 'messaging',
      members: { $in: [this.chatName.chatUserName] }
    });
    
  }

}

