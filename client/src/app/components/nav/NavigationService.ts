import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private petOwnerImageSource = new BehaviorSubject<string>('');
  private user = new BehaviorSubject<string>('');

  constructor() {}

  public updateUserImage(imageUrl: string) {
    this.petOwnerImageSource.next(imageUrl);
  }
  public updateUser(user:any){
    this.user.next(user);
  }
  public getUserSource() {
    return this.user.asObservable();
  }

  public getUserImageSource() {
    return this.petOwnerImageSource.asObservable();
  }
  clear() {
    this.petOwnerImageSource.next('');
  }
}
