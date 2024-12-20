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

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndpoint}/${id}`);
  }

  update(cliente: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndpoint}/${cliente.id}`, cliente);
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndpoint}/${id}`);
  }

}
