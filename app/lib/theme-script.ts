export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint so the stored theme applies with no flash.
 * Dark is the default; only an explicit choice switches to light.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;
