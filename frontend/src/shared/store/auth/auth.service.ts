import { api } from "src/shared/configs/axios/axiosConfig";
import { SignInResponseType, SignInType } from "./auth.interface";
import { AxiosResponse } from "axios";
import { AUTH_SIGN_IN } from "src/shared/consts/endpoints";

export class AuthService {
    static async signUp(
        payload: SignInType
    ): Promise<AxiosResponse<SignInResponseType>> {
        const { email, password } = payload;
        return api.post(AUTH_SIGN_IN, { email, password });
    }
}