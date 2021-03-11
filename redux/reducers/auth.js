import { USER_AUTH_CHANGED } from '../types/index';

const initialState = {
    currentUser: null,
};

export const auth = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_AUTH_CHANGED:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            return state;
    }
};
