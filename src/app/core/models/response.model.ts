import { Pet } from "./pet.model"

export interface PetResponse{
    count: number
    next: string | null
    previous: string | null
    results: Pet[]
}