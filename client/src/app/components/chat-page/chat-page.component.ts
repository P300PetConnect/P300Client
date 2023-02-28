import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChannelService, ChatClientService, StreamI18nService } from 'stream-chat-angular';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService) {}

  ngOnInit(): void {
    this.streamI18nService.setTranslation();
    this.chatService.init(environment.stream.key, 'joannasmith@gmail', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam9hbm5hc21pdGhAZ21haWwifQ.m0LLSTgdE_iW9Xb_L8y8Z7x7nmXfsmuChE2k8LaoTHU');
    //this.chatService.init(environment.stream.key, 'fatherted@gmail', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmF0aGVydGVkQGdtYWlsIn0.xAa90NtHiXLMMCTvjOOvkyBZeTGMueTZGOW13vZ1pcM');
    this.channelService.init({
      type: 'messaging',
      members: { $in: ['joannasmith@gmail'] }
      //members: { $in: ['fatherted@gmail'] }
    });
    
  }

}

