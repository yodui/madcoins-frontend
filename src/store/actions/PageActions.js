export const PAGE_SET_THEME = 'page/SET_THEME';

const setTheme = (theme) => {
    return {
        type: PAGE_SET_THEME,
        payload: theme
    }
}

export { setTheme }
