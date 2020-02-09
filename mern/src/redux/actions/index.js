import { STORE_USER } from '../constants/action-types';

export function storeUser(payload) {
    return {
        type: STORE_USER,
        payload
    }
}
