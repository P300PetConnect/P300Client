import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';
import { janisenv } from 'src/environments/janisenv';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  addPetForm: FormGroup;
  public uploadedImageUrl: string;
  //get user email back from local Storage
  user = localStorage.getItem("PetOwner");
  userDetails = JSON.parse(this.user);

  s3 = new AWS.S3({
    region: `${janisenv.REGION}`,
    accessKeyId: `${janisenv.ACCESSKEYID}`,
    secretAccessKey: `${janisenv.SECRETACCESSKEY}`
  });

  private rekognition: AWS.Rekognition;

  constructor(private fb: FormBuilder, private http: HttpClient) {}
  
  isSelected:boolean = false; 
  isShow:boolean;

  ngOnInit() {
    AWS.config.region = `${janisenv.REGION}`;
    AWS.config.credentials = new AWS.Credentials(`${janisenv.ACCESSKEYID}`, `${janisenv.SECRETACCESSKEY}`);
    this.addPetForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'petImageUrl': [this.uploadedImageUrl],
      'dob': [''],
      'petType': [''],
      'petBreed': [''],
      'petSize': [''],
    });

    this.rekognition = new AWS.Rekognition();
    this.checkCollection("pet-collection");
  }

  onSubmit() {
    if(this.addPetForm.valid) {
      const url = 'https://gl8g0i4oj1.execute-api.eu-west-1.amazonaws.com/pet/'+this.userDetails.emailAddress;
      const data = this.addPetForm.value;

      this.http.post(url, data)
      .subscribe((response) => {
        console.log(response);
      });
    }

    console.log(this.addPetForm);
    this.addPetForm.reset();
  }

  async uploadImage(file: File) {
    const params = {
      Bucket: 'petimagesp300',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      Metadata: {
        'Owner': this.userDetails.emailAddress
      }
    };
    try {
      const response = await this.s3.upload(params).promise();
      console.log('File uploaded successfully:', response.Location);
      this.uploadedImageUrl = response.Location;
      this.addPetForm.controls['petImageUrl'].setValue(response.Location);

      // Add the uploaded image to Rekognition collection and index it
      const rekognition = new AWS.Rekognition({
        region: `${janisenv.REGION}`,
        accessKeyId: `${janisenv.ACCESSKEYID}`,
        secretAccessKey: `${janisenv.SECRETACCESSKEY}`
      });
      const rekognitionParams = {
        CollectionId: 'pet-collection',
        ExternalImageId: file.name,
        Image: {
          S3Object: {
            Bucket: params.Bucket,
            Name: params.Key
          }
        }
      };
      
      const rekognitionResponse = await rekognition.indexFaces(rekognitionParams).promise();
      console.log('Image indexed successfully:', rekognitionResponse);

    } catch (error) {
      console.error(error);
    }
  }

  //create rekognition collection
  createCollection(collectionId: string) {
    const params = {
      CollectionId: collectionId
    };
    this.rekognition.createCollection(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
  }

  //check if collection exists
  checkCollection(collectionId: string) {
    const params = {
      CollectionId: collectionId
    };
    this.rekognition.describeCollection(params, function(err, data) {
      if (err) {
        this.createCollection("pet-collection");
        console.log('Collection created!');
      } else {
        console.log('Collection exists');
      }
    });
  }
  
}
