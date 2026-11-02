/* Theme state lives on <html data-theme>, set by an inline script in
   index.html BEFORE first paint, otherwise a light-theme visitor gets a
   black flash on every load. This module only handles changes after that. */

const KEY = 'theme'

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try { localStorage.setItem(KEY, theme) } catch { /* private mode, session only */ }
  // keep the browser chrome (address bar, PWA header) in step
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#F5F5F2' : '#07080A')
  return theme
}
