import { Petname } from "./petname.model"
import { Tag } from "./tag.model"
import { Tutor } from "./tutor.model"
import { Vet } from "./vet.model"

export interface Pet{
    id?: string 
    tag: Tag
    petname?: Petname
    name: string
    nickname?: string
    pet_type?: string
    race?: string
    birth_date?: string
    castration: boolean
    registered: boolean
    alive: boolean
    lost: boolean
    genre?: string
    observation?: string
    medical_condition: string
    image?: string
    tutor?: Tutor
    veterinarian?: Vet
    joined_date?: string
}