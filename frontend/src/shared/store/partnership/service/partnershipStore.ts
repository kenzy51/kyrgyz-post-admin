    import { makeAutoObservable } from "mobx";
    import { PartnerApi } from "../api/partnershipApi";
    class PartnerStore {
    partners: any[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    async fetchPartners() {
        try {
        const response = await PartnerApi.getPartners();
        this.partners = response.data;
        } catch (error) {
        console.error(error, "An error occurred while fetching clients");
        } 
    }

    }

    export const partnerStore = new PartnerStore();
