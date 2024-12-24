import {Injectable} from '@angular/core';
import {Client} from '../models/client';
import {catchError, map, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient, private router: Router) {
  }

  getClientes(): Observable<Client[]> {
    return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Client[])
    );
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Error al editar',
          e.error.mensaje,
          'error'
        );
        return throwError(() => e);
      })
    );
  }

  create(client: Client): Observable<Client> {
    return this.http.post(this.urlEndpoint, client).pipe(
      map((response: any) => response.cliente as Client),
      catchError(e => {

        if (e.status === 400) {
          return throwError(() => e);
        }

        console.error(e.error.mensaje)
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
        );
        return throwError(() => e);
      })
    );
  }

  update(cliente: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndpoint}/${cliente.id}`, cliente).pipe(
      map((response: any) => response.cliente as Client),
      catchError(e => {

        if (e.status === 400) {
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
        );
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
        );
        return throwError(() => e);
      })
    );
  }

}
