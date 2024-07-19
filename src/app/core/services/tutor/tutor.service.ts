import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { apiEndpoints } from '../../constants/constant.routes';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  list(): Observable<Contact[]>{
    return this.httpClient.get<Contact[]>(`${apiEndpoints.tutors.contacts}`)
  }

  create(data: Contact): Observable<Contact>{
    return this.httpClient.post<Contact>(`${apiEndpoints.tutors.contacts}`, data)
  }

  update(id: number, data: Contact): Observable<Contact>{
    return this.httpClient.put<Contact>(`${apiEndpoints.tutors.contacts}${id}/`, data)
  }

  destroy(id: number): Observable<any>{
    return this.httpClient.delete(`${apiEndpoints.tutors.contacts}${id}/`)
  }

}
