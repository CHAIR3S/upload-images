import { UploadService } from './Service/upload.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'upload-images';

  public images: any = new Array; 
  public showImage: any;

  constructor(
    public sanitizer: DomSanitizer,
    public uploadService: UploadService
    ){

  }

  public fileCharged(event: any): any{

    const image = event.target.files[0]; // Obtain image from event
    
    this.images.push(image);
    this.extraerBase64(image).then(img => {
      this.showImage = img.base;
    })
    

  }

  public sendImage(){

    this.uploadService.uploadImage(this.images[0]).subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }


  private extraerBase64: any = async ($event: any) => new Promise((resolve, reject) => {
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
        base: null // Asegura que haya un valor de retorno
      });
    }
  })
}
