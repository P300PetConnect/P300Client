import { Component, OnInit, Inject } from '@angular/core';
// import { Loader } from '@googlemaps/js-api-loader';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/interfaces/post';
import { DataService } from '../../service/data.service';
import Swal from 'sweetalert2';
import { IUser, IPet } from 'src/app/interfaces/form';
import { AuthenticatorService } from '@aws-amplify/ui-angular';


// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



declare const showGenRoute: any;
declare const showMakeRoute: any;
declare const showFavRoute: any;
declare const SettingMap: any;
declare const calcRoute: any;
declare const Gen2OnLoadDo: any;
//declare const move: any;
declare const shareRoute: any;
declare const copyRouteID: any;


// Testing here
declare const getArray: any;
@Component({
  selector: 'app-map-planner',
  templateUrl: './map-planner.component.html',
  styleUrls: ['./map-planner.component.scss']
})
export class MapPlannerComponent implements OnInit {

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
  isSidebar: boolean = false;

  //#endregion

  constructor(private dataService: DataService, public authenticator: AuthenticatorService) { }
  ngOnInit(): void {
    console.log("Email: " + this.authenticator?.user?.attributes?.email);
    this.email = this.authenticator?.user?.attributes?.email;
    // const loader = new Loader({apiKey: 'AIzaSyAHau_5frbGGXxZooEP1SkiXMHortLbB4w'}).load().then(initMap);
    this.allPosts = [];
    this.allPosts = [];
    this.getAllPost();
    SettingMap();
    Gen2OnLoadDo();
  }



  // initMap(): void {
  //   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // }
  // ngOnInit(): void {
  //   //#region  Atlas variables
  //   this._id = '';
  //   this.email = this.authenticator?.user?.attributes?.email;
  //   this.routeName = '';
  //   this.startPoint = '';
  //   this.endPoint = '';
  //   this.allPosts = [];
  //   this.allPosts = [];
  //   this.getAllPost();
  //   //#endregion
  //   SettingMap();
  //   Gen2OnLoadDo();

  // } //End of ngOnInit

  //#region  CRUD Atlas
  getAllPost() {

    this.ToPoints = [];
    this.FromPoints = [];
    this.ArrayIds = [];

    this.dataService.getAllPost().subscribe(
      (res) => {
        for (let index = 0; index < res.length; index++) {
          if (res[index].email == this.authenticator?.user?.attributes?.email) {
            console.log("Email in getAll: " + this.authenticator?.user?.attributes?.email);
            this.onwerPosts.push(res[index]);
            this.FromPoints.push(res[index].startPoint);
            this.ToPoints.push(res[index].endPoint);
            this.ArrayIds.push(res[index]);
          }
        }
        this.allPosts = this.onwerPosts;
        console.log(this.allPosts);
        this.getArray2();
      },
      (err) => {
        console.log(err);
      }
    );



  }

  getPostById(post: Post) {
    this.dataService.getPostById(post._id).subscribe(
      (res) => {
        post = res;
        console.log("GetPostById");
        console.log(post);
      },
      (err) => {
        console.log(err);
      }
    );

  }

  deletePostById(post: Post) {
    // alert("Delete function clicked");

    Swal.fire({
      title: 'Are you sure you want to delete ' + `${post.routeName}` + ' route ?',
      showCancelButton: true,
      confirmButtonText: 'delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.dataService.deletePostById(post._id).subscribe(
          (res) => {
            this.onwerPosts = [];
            location.reload();
            window.location.href = '#FavRoute';
            this.getAllPost();
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDismissed) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


    //  Start
    // if (
    //   window.confirm('Are you sure you want to delete post with id :' + post._id)
    // ) {
    //   this.dataService.deletePostById(post._id).subscribe(
    //     (res) => {
    //       this.onwerPosts = [];
    //       location.reload() ;
    //       window.location.href = '#FavRoute';
    //       this.getAllPost();
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
    // End
  }

  createPost() {
    console.log(this.email);
    this.post.email = this.authenticator?.user?.attributes?.email;
    this.post.routeName = this.routeName;
    this.post.startPoint = this.startPoint;
    this.post.endPoint = this.endPoint;
    this.dataService.createPost(this.post).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editPost(post: Post) {

    this.getPostById(post);
    this._id = post._id;
    this.email = post.email;
    this.routeName = post.routeName;
    this.startPoint = post.startPoint;
    this.endPoint = post.endPoint;
  }

  updatePost() {
    if (this.routeName == '' || this.email == '' || this.startPoint == '' || this.endPoint == '') {
      alert('Please fill all the values');
      return;
    }
    this.post._id = this._id;
    this.post.email = this.email;
    this.post.routeName = this.routeName;
    this.post.startPoint = this.startPoint;
    this.post.endPoint = this.endPoint;

    this.dataService.updatePost(this.post).subscribe(
      (res) => {
        location.reload();
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //#endregion


  onClickshowGenRoute() {
    // move();
    showGenRoute();

    // this.snackBar.open("Generate a route",'',{
    //   duration:3000,
    //   verticalPosition:'top'
    // })
  }

  onClickshowMakeRoute() {
    showMakeRoute();
  }

  onClickshowFavRoute() {
    showFavRoute();
    //this.InsertADeletForEachButton();
    // getArray(this.FromPoints, this.ToPoints, this.ArrayIds);
    // this.InsertADeletForEachButton();
  }

  onClickcalcRoute() {
    calcRoute();
  }


  onClickshowMakeRoute2(start: string, end: string, name: string) {
    showMakeRoute(start, end, name);
  }


  getArray2() {
    getArray(this.FromPoints, this.ToPoints, this.ArrayIds);
    // this.InsertADeletForEachButton();
    document.getElementById("FavRoute")!.addEventListener('click', () => this.InsertADeletForEachButton());

  }



  InsertADeletForEachButton() {

    console.log("Printing the IDs");
    for (let index = 0; index < this.onwerPosts.length; index++) {
      let post = this.onwerPosts[index];
      let delId = post._id + "d";
      let editId = post._id + "e";
      let shareId = post._id + "s";

      console.log(this.onwerPosts.length);
      console.log(post._id);


      // This  is for the delete
      document.getElementById(`${delId}`)!.addEventListener('click', () => this.deletePostById(post));


      // this is for the edit
      document.getElementById(`${editId}`)!.addEventListener('click', () => this.toggle(post));

      //Share route
      document.getElementById(`${shareId}`)!.addEventListener('click', () => this.shareTheRoute(post));

      //document.getElementById(`${shareId}`)!.style.backgroundColor = "Blue";


    }


  }



  // Dialog code
  toggle(post: Post) {
    this.isOpen = !this.isOpen;
    this.editPost(post);
  }

  toggleClose() {
    this.isOpen = false;
  }


  // Create post in  a diffrent way
  createPostSave() {
    let inputRouteName = document.getElementById('RouteName',) as HTMLInputElement | null;
    let inputstartPoint = document.getElementById('from',) as HTMLInputElement | null;
    let inputToPoint = document.getElementById('to',) as HTMLInputElement | null;



    this.post.email = this.authenticator?.user?.attributes?.email;
    this.post.routeName = inputRouteName!.value;
    this.post.startPoint = inputstartPoint!.value;
    this.post.endPoint = inputToPoint!.value;
    this.dataService.createPost(this.post).subscribe(
      (res) => {
        location.reload();
        // this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  shareTheRoute(post: Post) {
    // shareRoute(post.startPoint, post.endPoint, post.routeName, post.email);
    copyRouteID(post._id);
    Swal.fire('Route ID Copied to Cliboard!');

  }



  showSideBard() {

    document.getElementById("sidebar").style.display = "block";
  }


  hideSideBard() {

    document.getElementById("sidebar").style.display = "none";
  }

 
}
