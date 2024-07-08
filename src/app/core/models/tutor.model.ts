import { Contact } from "./contact.model";

export interface Tutor {
    id?: string,
    name: string,
    // user
    image?: string,
    contacts: Contact[]
}