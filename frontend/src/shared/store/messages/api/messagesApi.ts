import { api } from "src/shared/configs/axios/axiosConfig";
import { MESSAGES_API, MESSAGES_API_READ } from "src/shared/consts/endpoints";
export class MessageApi {
  static getMessages() {
    return api.get(MESSAGES_API);
  }
  static makeMessageRead(payload:any) {
    return api.post(MESSAGES_API_READ, payload  );
  }
}
