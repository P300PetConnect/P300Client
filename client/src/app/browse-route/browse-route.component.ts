import { Component, OnInit,Inject } from '@angular/core';
// import { Loader } from '@googlemaps/js-api-loader';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/model/post';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';
import { IUser, IPet } from 'src/app/components/interfaces/form';
import { AuthenticatorService } from '@aws-amplify/ui-angular';


@Component({
  selector: 'app-browse-route',
  templateUrl: './browse-route.component.html',
  styleUrls: ['./browse-route.component.scss']
})
export class BrowseRouteComponent implements OnInit {

  
  public user: IUser;

  //#region Atlas variables
  post: Post = {
    _id: '',
    email: '',
    routeName: '',
    startPoint: '',
    endPoint: '',
  };

  _id: string = '';
  email: string = this.authenticator?.user?.attributes?.email;
  routeName: string = '';
  startPoint: string = '';
  endPoint: string = '';

  allPosts: Post[] = [];
  onwerPosts: Post[] = [];
  FromPoints: any[] = [];
  ToPoints: any[] = [];
  ArrayIds: Post[] = [];

  isOpen = false;
  map: google.maps.Map;

  //#endregion

  constructor( private dataService: DataService, public authenticator: AuthenticatorService) { }

  ngOnInit(): void {
    console.log("Email: "+ this.authenticator?.user?.attributes?.email);
    this.email= this.authenticator?.user?.attributes?.email;
   // const loader = new Loader({apiKey: 'AIzaSyAHau_5frbGGXxZooEP1SkiXMHortLbB4w'}).load().then(initMap);
     this.allPosts = [];
     this.allPosts = [];
     this.getAllPost();
  }


  getAllPost() {

    this.ToPoints = [];
    this.FromPoints = [];
    this.ArrayIds = [];

    this.dataService.getAllPost().subscribe(
      (res) => {
        for (let index = 0; index < res.length; index++) {
          // if (res[index].email == this.authenticator?.user?.attributes?.email) {
            console.log("Email in getAll: "+ this.authenticator?.user?.attributes?.email);
            this.onwerPosts.push(res[index]);
            this.FromPoints.push(res[index].startPoint);
            this.ToPoints.push(res[index].endPoint);
            this.ArrayIds.push(res[index]);
          
        }
        this.allPosts = this.onwerPosts;
        console.log(this.allPosts);
     
      },
      (err) => {
        console.log(err);
      }
    );



  }

}
