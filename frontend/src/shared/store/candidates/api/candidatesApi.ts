import { api } from "src/shared/configs/axios/axiosConfig";
import { COURIERS } from "src/shared/consts/endpoints";
export class CandidatesApi {
  static getCandidates() {
    return api.get(COURIERS);
  }
}
