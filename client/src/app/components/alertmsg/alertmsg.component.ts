import { Component, OnInit, Input} from '@angular/core';
// import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-alertmsg',
  templateUrl: './alertmsg.component.html',
  styleUrls: ['./alertmsg.component.scss']
})
export class AlertmsgComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

//   constructor() { }

//   @Input() alertSelected: string = ""; 

//   ngOnInit(): void {
//     this.callTheMethod();
//     console.log(this.alertSelected); 
//     console.log('is here')
//   }
//   simpleAlert(){  
//     Swal.fire('Hello Angular');  
//   }  


//   callTheMethod(){
//     switch (this.alertSelected) {
//       case "alertPersonalised":{
//         this.alertPersonalised();
//         break;
//       }
//       case "alertWithSuccess":{
//         this.alertWithSuccess();
//         break;
//       }
//       case "topend":{
//         this.topend();
//         break;
//       }
//   }


//  } 
//   alertPersonalised(){
//     Swal.fire({
//       title: 'Custom width, padding, color, background.',
//       width: 600,
//       padding: '3em',
//       color: '#716add',
//       background: '#fff url(/images/trees.png)',
//       buttons: ["Stop", "Do it!"],
//       // confirmButtonText: 'Yes, delete it!',  
//       // cancelButtonText: 'No, keep it' , 
//       backdrop: `
//         rgba(0,0,123,0.4)
//         url("https://sweetalert2.github.io/images/nyan-cat.gif")
//         left top
//         no-repeat
//       `
//     })
//   }
    
//   alertWithSuccess(){  
//     Swal.fire('Thank you...', 'You submitted succesfully!', 'success')  
//   }  
//   erroalert(){  
//     Swal.fire({  
//       icon: 'error',  
//       title: 'Oops...',  
//       text: 'Something went wrong!',  
//       footer: '<a href>Why do I have this issue?</a>'  
//     })  
//   }  
//   topend()  
//   {  
//     Swal.fire({  
//       position: 'top-end',  
//       icon: 'success',  
//       title: 'Your work has been saved',  
//       showConfirmButton: false,  
//       timer: 1500  
//     })  
//   }  
//   confirmBox(){  
//     Swal.fire({  
//       title: 'Are you sure want to remove?',  
//       text: 'You will not be able to recover this file!',  
//       icon: 'warning',  
//       showCancelButton: true,  
//       confirmButtonText: 'Yes, delete it!',  
//       cancelButtonText: 'No, keep it'  
//     }).then((result) => {  
//       if (result.value) {  
//         Swal.fire(  
//           'Deleted!',  
//           'Your imaginary file has been deleted.',  
//           'success'  
//         )  
//       } else if (result.dismiss === Swal.DismissReason.cancel) {  
//         Swal.fire(  
//           'Cancelled',  
//           'Your imaginary file is safe :)',  
//           'error'  
//         )  
//       }  
//     })  
//   }
}
