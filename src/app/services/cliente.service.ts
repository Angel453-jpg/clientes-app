import {Injectable} from '@angular/core';
import {Client} from '../models/client';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {
  }

  getClientes(): Observable<Client[]> {
    return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Client[])
    );
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndpoint, client);
  }

}
