import { Contact } from "./contact.model"

export interface Vet {
    id?: number
    doctor_name: string
    hospital_name?: string
    doctor_crm?: string
    contacts?: Contact[]
}