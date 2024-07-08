import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../../models/pet.model';
import { apiEndpoints } from '../../constants/constant.routes';
import { PetResponse } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUserPet(page: string): Observable<PetResponse>{
    return this.httpClient.get<PetResponse>(`${apiEndpoints.pets.userPetList}/?page=${page}`)
  }

  getPetDetail(tag: string): Observable<Pet>{
    return this.httpClient.get<Pet>(`${apiEndpoints.pets.userPetList}/${tag}`)
  }

}
