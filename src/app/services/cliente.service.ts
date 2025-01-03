import {Injectable} from '@angular/core';
import {Client} from '../models/client';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Region} from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient, private router: Router) {
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndpoint + '/regions');
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      //USAMOS EL OPERADOR TAP PARA REALIZAR ALGUNA TAREA, NOS PERMITE REALIZAR ALGO
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Client[]).forEach(
          cliente => {
            console.log(cliente.name);
          }
        )
      }),
      map((response: any) => {
          (response.content as Client[]).map(cliente => {
            cliente.name = cliente.name.toUpperCase();
            // let datePipe = new DatePipe('es');
            // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMM, yyyy');
            // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
            return cliente;
          });
          return response;
        }
      ),
      //USAMOS EL OPERADOR TAP PARA REALIZAR ALGUNA TAREA
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Client[]).forEach(cliente => {
          console.log(cliente.name);
        })
      })
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

  submitPicture(archivo: File, id: any): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData, {reportProgress: true});
    return this.http.request(req);
  }

}
