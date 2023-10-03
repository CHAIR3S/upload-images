import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient ) {}

  baseUrl: string = 'http://localhost:8080/'


  public uploadImage(image: any) {
    const url: string = `${this.baseUrl}image`;

    const formularioDeDatos = new FormData();

    formularioDeDatos.append('image', image);

    return this.http.post(url, formularioDeDatos);
  }


  public getImageByName(name: string){
    const url: string = `${this.baseUrl}image/${name}`;

    return this.http.get(url, {responseType: "blob"});
  }
}
