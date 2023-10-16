import { Component, OnInit } from '@angular/core';
import { StreamChat, Attachment, ChannelData} from 'stream-chat';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  text = '';
  client;
  channel;

  constructor() { }

  ngOnInit() {
    this.client = new StreamChat('a584yba4xs7f');
    this.client.setUser(
      {
        id: '',
        name: '',
        image: ''
      },
      ''//token
    );

    this.channel = this.client.channel('messaging', '', {
      name: '',
      image: '',
      members: ['member1', 'member2']
    });
  }

  sendMessage() {
    this.channel.sendMessage({ text: this.text});
    this.text = '';
  }

  sendButton() {
    const button = {
      type: 'button',
      text: 'Click Me',
      url: 'https://google.com'
    }
    
    this.channel.sendMessage({
      text: 'this is a button',
      attachments: [button]
    })
  }
}
