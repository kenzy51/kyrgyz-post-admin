import { makeAutoObservable } from "mobx";
import { MessageApi } from "../api/messagesApi";

class MessageStore {
  messages: any[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  async fetchMessages() {
    try {
      const response = await MessageApi.getMessages();
      this.messages = response.data;
    } catch (error) {
      console.error(error, "An error occurred while fetching clients");
    } 
  }

}

export const messageStore = new MessageStore();
