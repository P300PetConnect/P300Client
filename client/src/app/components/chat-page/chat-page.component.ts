import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StreamChat } from 'stream-chat';
import { ChannelService, ChatClientService, CustomTemplatesService, StreamI18nService } from 'stream-chat-angular';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  createOrderFlag: boolean;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private http: HttpClient, 
    private dialog:MatDialog
    ) {}

  async ngOnInit(): Promise<void> {
    this.streamI18nService.setTranslation();
    this.chatService.init(environment.stream.key, 'joannasmith@gmail', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam9hbm5hc21pdGhAZ21haWwifQ.NMidnnPiXpGGxTgz6U2hbK3GH-YTKKvpNTy6rvv3WfE');
    //this.chatService.init(environment.stream.key, 'fatherted@gmail', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmF0aGVydGVkQGdtYWlsIn0.xAa90NtHiXLMMCTvjOOvkyBZeTGMueTZGOW13vZ1pcM');
    this.channelService.init({
      type: 'messaging',
      members: { $in: ['joannasmith@gmail'] }
      //members: { $in: ['fatherted@gmail'] }
    });



     //   working add information automatically 
    const client = StreamChat.getInstance(environment.stream.key);
    const channel = client.channel('messaging', 'petconnect', {
      name: 'Awesome channel about traveling',
    });
    const text = 'A new order has been created';
    await channel.sendMessage({
      text,
      customField: '123',
      buttons: [
        {
          label: 'View Order',
          value: 'view_order',
          type: 'url',
          url: 'https://your-app.com/orders/123'
        }
      ]
    });
    const message = {
      text: 'Do you want to accept this request?',
      buttons: [
        {
          type: 'button',
          text: 'Yes',
          value: 'yes',
        },
        {
          type: 'button',
          text: 'No',
          value: 'no',
        },
      ],
    };
    
    await channel.sendMessage(message);
    channel.sendMessage({
      text: 'Do you want to purchase this product?',
      attachments: [{
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Do you want to purchase this product?',
          buttons: [{
            type: 'web_url',
            url: 'https://www.example.com/product/123',
            title: 'Purchase'
          }]
        }
      }]
    });
        

    
    
    // const client = StreamChat.getInstance(environment.stream.key);

    // const channel = client.channel('messaging', 'petconnect', {
    //   name: 'test pet connect chat',
    //   members: ['joannasmith@gmail', 'fatherted@gmail']
    // });
    
    // channel.create().then(() => {
    //   console.log('Channel created!');

    // }).catch((error) => {
    //   console.error(error);
    // });
    // console.log(channel); 




  //   this.createOrderFlag = true;

  //   if (this.createOrderFlag) {
  //     const message = {
  //       text: 'A new order has been created',
  //       channel_id: 'petconnect',
  //     };

  //     this.http.post('https://api.stream-chat.com/api/v1.0/message', message, {
  //       headers: {
  //         'Authorization': 'Bearer a584yba4xs7f',
  //         'Content-Type': 'application/json',
  //       },
  //     }).subscribe(() => {
  //       console.log('Message sent');
  //     });
  //   }
  // }
  }

  openChat() {
    const client = StreamChat.getInstance(environment.stream.key);
    const channel = client.channel('messaging', 'petconnect', {
      name: 'Create Order',
    });
    this.onCreateOrder();
  
    const chatHtml = `
      <div style="position: fixed; bottom: 0; right: 0; width: 300px; height: 400px;">
        <Chat client={client} theme="messaging">
          <Window>
            <Channel channel={channel}>
              <Thread />
              <ChannelHeader />
            </Channel>
          </Window>
        </Chat>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHtml);


  }


  onCreateOrder(){
    
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(OrderComponent, dialogConfig); 
  
  }
  }



