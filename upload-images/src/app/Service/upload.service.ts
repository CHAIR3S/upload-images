import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient ) {}


  public uploadImage(image: any) {
    const url: string = 'http://localhost:8080/image';

    const formularioDeDatos = new FormData();

    formularioDeDatos.append('image', image);

    return this.http.post(url, formularioDeDatos);
  }
}
