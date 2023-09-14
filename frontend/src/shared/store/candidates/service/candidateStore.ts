import { makeAutoObservable } from "mobx";
import { CandidatesApi } from "../api/candidatesApi";

class CandidateStore {
  candidates = [];
  selectedCourier :any= null;
  constructor() {
    makeAutoObservable(this);
  }

  async fetchCandidates() {
    try {
      const response = await CandidatesApi.getCandidates();
      this.candidates = response.data;
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }

  async fetchCourierById(id:number) {
    try {
      const response = await CandidatesApi.getCourierById(id);
      this.selectedCourier=response.data
    } catch (error) {
      console.error("Error fetching courier by ID:", error);
    }
  }

  async updateCourier(id, updateData) {
    try {
      await CandidatesApi.updateCourier(id, updateData);
    } catch (error) {
      console.error("Error updating courier:", error);
    }
  }

  setSelectedCourier(courier){
    this.selectedCourier= courier
  }
}

export const candidateStore = new CandidateStore();
