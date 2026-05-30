export type Theme = 'light' | 'dark'

export type Palette = 
  | 'trust' 
  | 'oz' 
  | 'passion' 
  | 'energy' 
  | 'romance' 
  | 'nature' 
  | 'spring' 
  | 'winter' 
  | 'mystery' 
  | 'tls'

export type Shade = 
  | 'glassy' 
  | '800' 
  | '900' 
  | '925' 
  | '950'

export type Rounded = 
  | 'none' 
  | 'small' 
  | 'default' 
  | 'medium' 
  | 'large' 
  | 'xlarge' 
  | '2xlarge' 
  | '3xlarge' 
  | 'full'

export interface ThemeConfig {
  theme: Theme
  palette: Palette
  shade: Shade
  rounded: Rounded
}

export interface ThemeCustomizerProps {
  onThemeChange?: (config: ThemeConfig) => void
  storageKey?: string
  targetSelector?: string
}

// Valeurs par défaut
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  theme: 'dark',
  palette: 'tls',
  shade: '900',
  rounded: 'large',
}

// Listes de valeurs disponibles
export const AVAILABLE_THEMES: Theme[] = ['light', 'dark']

export const AVAILABLE_PALETTES: Palette[] = [
  'trust',
  'oz',
  'mystery',
  'romance',
  'passion',
  'energy',
  'spring',
  'nature',
  'winter',
  'tls',
]

export const AVAILABLE_SHADES: Shade[] = [
  'glassy',
  '800',
  '900',
  '925',
  '950',
]

export const AVAILABLE_ROUNDEDS: Rounded[] = [
  'none',
  'small',
  'default',
  'medium',
  'large',
  'xlarge',
  '2xlarge',
  '3xlarge',
  'full',
]

// Labels lisibles pour l'UI
export const THEME_LABELS: Record<Theme, string> = {
  light: '☀️ Light',
  dark: '🌙 Dark',
}

export const PALETTE_LABELS: Record<Palette, string> = {
  trust: '🔵 Trust',
  oz: '🟣 Oz',
  mystery: '🔮 Mystery',
  romance: '💗 Romance',
  passion: '❤️ Passion',
  energy: '⚡ Energy',
  spring: '🌱 Spring',
  nature: '🌿 Nature',
  winter: '❄️ Winter',
  tls: '✨ Tailus',
}

export const SHADE_LABELS: Record<Shade, string> = {
  glassy: 'Glassy',
  '800': 'Dark 800',
  '900': 'Dark 900',
  '925': 'Dark 925',
  '950': 'Dark 950',
}

export const ROUNDED_LABELS: Record<Rounded, string> = {
  none: 'None',
  small: 'Small',
  default: 'Default',
  medium: 'Medium',
  large: 'Large',
  xlarge: 'X-Large',
  '2xlarge': '2X-Large',
  '3xlarge': '3X-Large',
  full: 'Full',
}

/**
 * Utilitaires
 */

export function getStoredThemeConfig(storageKey: string = 'theme-config'): ThemeConfig | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      return JSON.parse(stored) as ThemeConfig
    }
  } catch (e) {
    console.error('Failed to get stored theme config:', e)
  }

  return null
}

export function saveThemeConfig(
  config: ThemeConfig,
  storageKey: string = 'theme-config'
): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(storageKey, JSON.stringify(config))
  } catch (e) {
    console.error('Failed to save theme config:', e)
  }
}

export function applyThemeConfig(
  config: ThemeConfig,
  targetSelector: string = 'html'
): void {
  if (typeof document === 'undefined') return

  const target = document.querySelector(targetSelector) as HTMLElement
  if (target) {
    target.setAttribute('data-theme', config.theme)
    target.setAttribute('data-palette', config.palette)
    target.setAttribute('data-shade', config.shade)
    target.setAttribute('data-rounded', config.rounded)

    if (config.theme === 'dark') {
      target.classList.add('dark')
    } else {
      target.classList.remove('dark')
    }
  }

  const iframes = document.querySelectorAll('iframe') as NodeListOf<HTMLIFrameElement>
  iframes.forEach((iframe) => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (iframeDoc && iframeDoc.location.origin === window.location.origin) {
        iframeDoc.documentElement.setAttribute('data-theme', config.theme)
        iframeDoc.documentElement.setAttribute('data-palette', config.palette)
        iframeDoc.documentElement.setAttribute('data-shade', config.shade)
        iframeDoc.documentElement.setAttribute('data-rounded', config.rounded)

        if (config.theme === 'dark') {
          iframeDoc.documentElement.classList.add('dark')
        } else {
          iframeDoc.documentElement.classList.remove('dark')
        }
      }
    } catch (e) {
      // Cross-origin iframes
    }
  })
}

export function isValidThemeConfig(config: unknown): config is ThemeConfig {
  if (!config || typeof config !== 'object') return false

  const c = config as Record<string, unknown>
  return (
    typeof c.theme === 'string' &&
    typeof c.palette === 'string' &&
    typeof c.shade === 'string' &&
    typeof c.rounded === 'string' &&
    AVAILABLE_THEMES.includes(c.theme as Theme) &&
    AVAILABLE_PALETTES.includes(c.palette as Palette) &&
    AVAILABLE_SHADES.includes(c.shade as Shade) &&
    AVAILABLE_ROUNDEDS.includes(c.rounded as Rounded)
  )
}
