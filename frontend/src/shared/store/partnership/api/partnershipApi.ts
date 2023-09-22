import { api } from "src/shared/configs/axios/axiosConfig";
import { PARTNER } from "src/shared/consts/endpoints";
export class PartnerApi {
  static getPartners() {
    return api.get(PARTNER);
  }
}
