import produce from 'immer';

const INITIAL_STATE = {
    token: null,
    signed: false,
};

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@user/SIGNIN_SUCCESS':
            return produce(state, draft => {
                draft.token = action.token;
                draft.signed = true;
            });
        case '@user/SIGNOUT': {
            return produce(state, draft => {
                draft.token = null;
            });
        }
        default:
            return state;
    }
}
