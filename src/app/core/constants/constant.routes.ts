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
    tutor: {
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
        transfer: `${apiBaseEndpoint}/pets/`,
        checkTagValidity: `${apiBaseEndpoint}/pets/tag/`,
    },
    tutors: {
        contactList: `${apiBaseEndpoint}/tutors/contacts`
    }
}