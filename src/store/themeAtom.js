import { atom } from 'jotai';
import Cookies from 'js-cookie';
const initialTheme = Cookies.get('theme') || 'dark';
document.documentElement.classList.add(initialTheme);

export const themeAtom = atom(initialTheme);