export const DISCONNECTED = 0; // disconnected
export const NEED_AUTH = 1; // authenticate request [ <- server ]
export const AUTH = 2; // authenticate response [ client -> ]
export const WRONG_ACCESS_TOKEN = 3; // wrong access token [ <- server ]
export const ACTIVE = 4; // active state [ <- server ]
export const SUBS = 5; // subscribe [ client -> ]
export const PAUSE = 6; // synchronization on pause [ client -> ]
export const DATA = 7; // subscription data
