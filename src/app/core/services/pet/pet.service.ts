import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../../models/pet.model';
import { apiEndpoints } from '../../constants/constant.routes';
import { PetResponse } from '../../models/response.model';
import { Tag } from '../../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {

  constructor(
    private httpClient: HttpClient
  ) { }

  list(page: string): Observable<PetResponse>{
    return this.httpClient.get<PetResponse>(`${apiEndpoints.pets.userPetList}/?page=${page}`)
  }

  retrieve(tag: string): Observable<Pet>{
    return this.httpClient.get<Pet>(`${apiEndpoints.pets.userPetList}/${tag}`)
  }

  getTagStatus(data: any): Observable<Tag>{
    return this.httpClient.post<Tag>(`${apiEndpoints.pets.checkTagStatus}`, data);
  }

  create(data: any): Observable<Pet>{
    return this.httpClient.post<any>(`${apiEndpoints.pets.create}`, data);
  }

  update(data: any, id: string): Observable<Pet>{
    return this.httpClient.put<Pet>(`${apiEndpoints.pets.create}${id}/`, data);
  }

}
