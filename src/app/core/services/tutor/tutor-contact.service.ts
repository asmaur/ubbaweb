import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { apiEndpoints } from '../../constants/constant.routes';

@Injectable({
  providedIn: 'root'
})
export class TutorContactService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllTutorContact(): Observable<Contact[]>{
    return this.httpClient.get<Contact[]>(`${apiEndpoints.tutors.contactList}`)
  }

}
