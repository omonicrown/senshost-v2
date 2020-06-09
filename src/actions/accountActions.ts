import { States } from '../interfaces/states';
import { Dispatch } from 'redux';
import { AccountActions } from '../interfaces/actions';
import * as constants from "../constants";
import { Account } from '../apis/generated/api';
import { AccountApis } from '../apis/accountApis';
import { AxiosError } from 'axios';


export function receiveAccount(account): AccountActions {
    return { type: constants.RECEIVE_ACCOUNT, account }
}


export type accountActions = AccountActions;