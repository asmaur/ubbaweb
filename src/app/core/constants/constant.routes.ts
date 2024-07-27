import { apiBaseUrl } from "src/environments/environment";

export const AppRoutes = {
    tabnav: {
        entry: "app",
        home: "home",
        search: "search",
        notifications: "notifications",
        account: "account"
    },
    pets: {
        profile: `:id`,
        scan: "qrcode",
        new: "new",

    },
    accounts: {
        contact: "contacts"
    }
}

export const constants = {
    CURRENT_TOKEN: "CURRENT_TOKEN"
};

const apiBaseEndpoint = apiBaseUrl;

export const apiEndpoints = {
    pets: {
        userPetList: `${apiBaseEndpoint}/pets`,
        create: `${apiBaseEndpoint}/pets/`,
        update: `${apiBaseEndpoint}/pets/`,
        partial: `${apiBaseEndpoint}/pets/`,
        delete: `${apiBaseEndpoint}/pets/`,
        // transfer: `${apiBaseEndpoint}/pets/`,
        checkTagStatus: `${apiBaseEndpoint}/pets/tag-status/`,
        petImage: `${apiBaseEndpoint}/pets/upload-image/`,
        petLostStatus: `${apiBaseEndpoint}/pets/pet-lost/`,
        petAliveStatus: `${apiBaseEndpoint}/pets/pet-alive/`,
        transfer: `${apiBaseEndpoint}/pets/transfer/`,
    },
    tutors: {
        contacts: `${apiBaseEndpoint}/tutors-contact/`,
        newTutor: `${apiBaseEndpoint}/tutors/find-tutor/`,
        getTutor: `${apiBaseEndpoint}/tutors/`,
        tutorImage: `${apiBaseEndpoint}/tutors/tutor-image/`,
    }
}