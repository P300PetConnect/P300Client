import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss']
})
export class RecognitionComponent implements OnInit {

  public uploadedImageUrl: string;

  s3 = new AWS.S3({
    region: '',
    accessKeyId: '',
    secretAccessKey: ''
  });

  rekognition = new AWS.Rekognition({
    region: '',
    accessKeyId: '',
    secretAccessKey: ''
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  async uploadImage(file: File) {
    const params = {
      Bucket: 'petimagesp300',
      Key: file.name,
      Body: file,
      ACL: 'public-read'
    };
    try {
      const response = await this.s3.upload(params).promise();
      console.log('File uploaded successfully:', response.Location);
      this.uploadedImageUrl = response.Location;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async recognizeImage() {
    const params = {
      CollectionId: 'pet-collection',
      Image: {
        S3Object: {
          Bucket: 'petimagesp300',
          Name: this.uploadedImageUrl.split('/').pop()
        }
      }
    };
  
    try {
      const result = await this.rekognition.searchFacesByImage(params).promise();
      console.log(result);
      if (result.FaceMatches.length > 0) {
        const metadata = result.FaceMatches[0].Face.ExternalImageId;
        console.log('Metadata:', metadata);
        // you can store the metadata in a variable or display it to the user
      } else {
        console.log('No face matches found.');
        // handle case where no matches are found
      }
    } catch (error) {
      console.error(error);
    }
  }
}

//   //comparing images attempt

// import { Component, OnInit } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { HttpClient } from '@angular/common/http';
// import { S3 } from 'aws-sdk';
// import { Rekognition } from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';

// @Component({
//   selector: 'app-recognition',
//   templateUrl: './recognition.component.html',
//   styleUrls: ['./recognition.component.scss']
// })
// export class RecognitionComponent {
//   bucketName: string = "petimagesp300";
//   region: string = environment.REGION;
//   accessKeyId: string = environment.ACCESSKEYID;
//   secretAccessKey: string = environment.SECRETACCESSKEY;
//   image1Key: string;
//   image2Key: string;
//   image1Url: string;
//   image2Url: string;
//   image1Labels: string[] = [];
//   image2Labels: string[] = [];
//   labelsMatch: boolean;
//   showResult: boolean = false;
//   s3: S3;
//   rekognition: Rekognition;

//   constructor() {
//     // Initialize the S3 and Rekognition clients
//     this.s3 = new S3({
//       accessKeyId: environment.ACCESSKEYID,
//       secretAccessKey: environment.SECRETACCESSKEY
//     });
//     this.rekognition = new Rekognition({
//       region: environment.REGION,
//       accessKeyId: environment.ACCESSKEYID,
//       secretAccessKey: environment.SECRETACCESSKEY
//     });
//   }

//   uploadImage1(event: any) {
//     const file = event.target.files[0];
//     this.image1Key = 'image1-' + new Date().getTime() + '-' + file.name;
//     const params = {
//       Bucket: this.bucketName,
//       Key: this.image1Key,
//       Body: file,
//       ACL: 'public-read'
//     };
//     this.s3.upload(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log('Image 1 uploaded:', data.Location);
//     });
//   }

//   uploadImage2(event: any) {
//     const file = event.target.files[0];
//     this.image2Key = 'image2-' + new Date().getTime() + '-' + file.name;
//     const params = {
//       Bucket: this.bucketName,
//       Key: this.image2Key,
//       Body: file,
//       ACL: 'public-read'
//     };
//     this.s3.upload(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log('Image 2 uploaded:', data.Location);
//     });
//   }

//   async compareImages() {
//     // Clear any previous results
//     this.image1Labels = [];
//     this.image2Labels = [];
//     this.labelsMatch = false;
//     try{
//       // Detect labels in image 1
//     const image1LabelsResponse = await this.rekognition.detectLabels({
//       Image: {
//         S3Object: {
//           Bucket: this.bucketName,
//           Name: this.image1Key
//         }
//       },
//       MaxLabels: 10
//     }).promise();

//     this.image1Labels = image1LabelsResponse.Labels.map(label => label.Name);

//     // Detect labels in image 2
//     const image2LabelsResponse = await this.rekognition.detectLabels({
//       Image: {
//         S3Object: {
//           Bucket: this.bucketName,
//           Name: this.image2Key
//         }
//       },
//       MaxLabels: 10
//     }).promise();

//     this.image2Labels = image2LabelsResponse.Labels.map(label => label.Name);

//     // Compare labels to check if they match
//     this.labelsMatch = this.image1Labels.some(label => this.image2Labels.includes(label));
//     console.log("Labels match: ", this.labelsMatch);
//     // Show the result
//     this.showResult = true;
  
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

