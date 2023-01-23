export const initialPageState = {
    theme: 'dark', // [dark, white]
    mode: 'default' // [default, collapsed]
};

export function pageReducer(state = initialPageState) {
    return state;
}

