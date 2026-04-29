export const UI_STORE_PERSIST_KEY = 'XMAI_Vending_UI_SSR'
export const THEME_FIELD = 'theme'

export function getThemePreloadScript() {
  return `(function(){try{function getCookie(name){var m=document.cookie.match(new RegExp('(?:^|; )'+name.replace(/([.$?*|{}()\\[\\]\\\\\\/\\+^])/g,'\\\\$1')+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}var rawCookie=getCookie('${UI_STORE_PERSIST_KEY}');var rawLocal=null;try{rawLocal=localStorage.getItem('${UI_STORE_PERSIST_KEY}')}catch(e){}var raw=rawCookie||rawLocal;var parsed=null;try{parsed=raw?JSON.parse(raw):null}catch(e){}var mode=parsed&&parsed['${THEME_FIELD}']?parsed['${THEME_FIELD}']:null;if(mode!=='light'&&mode!=='dark'){mode=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var isDark=mode==='dark';var root=document.documentElement;root.classList.toggle('dark',isDark);root.style.colorScheme=mode;root.style.backgroundColor=isDark?'#0f172a':'#ffffff';root.style.color=isDark?'#f1f5f9':'#0f172a'}catch(e){}})();`
}
