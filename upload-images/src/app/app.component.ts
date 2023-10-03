import { UploadService } from './Service/upload.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'upload-images';

  images: any = new Array; 
  showImage: any;
  imageSearched: any;
  load:boolean = false;
  imageForm: FormGroup;

  constructor(
    public sanitizer: DomSanitizer,
    public uploadService: UploadService,
    public formBuilder: FormBuilder
    ){
      this.imageForm = this.formBuilder.group({
        name: ['', Validators.required]
      });
    }

  public fileCharged(event: any): any{
    const image = event.target.files[0]; // Obtain image from event
    this.load = true; //If image is charged in the input

    
    this.images.push(image);
    this.extractBase64(image).then(img => { //Serealize to Base64
      this.showImage = img.base;
    })
    

  }

  public sendImage(){

    this.uploadService.uploadImage(this.images[0]).subscribe(response => {
      console.log(response);
      this.load = false;
    },
    error => {
      console.log(error);
      this.load = false;
    });
  }


  public getImage(){
    this.uploadService.getImageByName(this.imageForm.value.name)
    .subscribe(image => {
      this.extractBase64(image).then(img => {
        this.imageSearched = img.base;
        console.log(img);
      })
    },
    error => {
      console.log(error);
    });

  }


  private extractBase64: any = async ($event: any) => new Promise((resolve, reject) => {
    try {
      //const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
  
    } catch (error) {
      console.error('Error en extraerBase64:', error);
      resolve({
        base: null // Ensures return value
      });
    }
  })
}
