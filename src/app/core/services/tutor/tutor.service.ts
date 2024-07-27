import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { apiEndpoints } from '../../constants/constant.routes';
import { Tutor } from '../../models/tutor.model';

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

  retrieve(id: string): Observable<Tutor>{
    return this.httpClient.get<Tutor>(`${apiEndpoints.tutors.getTutor}${id}`);
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

  updateImage(data: any, id: string): Observable<Tutor>{
    return this.httpClient.patch<Tutor>(`${apiEndpoints.tutors.tutorImage}${id}/`, data); 
  }

}
