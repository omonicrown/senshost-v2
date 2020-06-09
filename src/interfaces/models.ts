import { Account } from "../apis/generated/api";

export interface AuthModel {
    identityToken: string;
    account: Account;
}