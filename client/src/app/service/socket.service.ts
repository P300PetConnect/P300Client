import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable()
export class SocketService {
  private socket: Socket;

  constructor(private http:HttpClient) {
    this.socket = io('http://localhost:3000');
  }

  // EMITTER example
  sendMessage(msg: any) {
    this.socket.emit('google-map-history', JSON.stringify(msg));
  }

  // HANDLER example
  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('google-map-history', msg => {
        console.log('google-map-history recived:', msg);
        observer.next(msg);
      });
    });
  }

  getAll(){
    return new Promise((resolve,reject)=>{
      this.http.get(environment.SERVER_URL + '/history').subscribe((result:any)=>{
        resolve(result);
      },err=>{
        reject(err);
      });
    });
  }
}