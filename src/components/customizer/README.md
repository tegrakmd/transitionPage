# 🎨 ThemeCustomizer - Installation pour Next.js

Composant autonome et complet pour personnaliser les thèmes dans Next.js.

## 📦 Fichiers inclus

```
nextjs-theme-customizer/
├── ThemeCustomizer.tsx           # Composant principal
├── theme-customizer.types.ts     # Types et utilitaires
├── use-theme.ts                  # Hooks custom
├── theme-customizer.css          # Styles CSS
├── layout.example.tsx            # Exemple d'intégration layout
└── README.md                     # Ce fichier
```

## 🚀 Installation rapide (3 étapes)

### 1️⃣ Copier les fichiers

```bash
# Copier dans ton projet Next.js
cp ThemeCustomizer.tsx src/components/
cp theme-customizer.types.ts src/lib/
cp use-theme.ts src/hooks/
cp theme-customizer.css src/styles/
```

### 2️⃣ Installer les dépendances

```bash
npm install framer-motion lucide-react @radix-ui/react-radio-group tailwind-merge
# ou
pnpm add framer-motion lucide-react @radix-ui/react-radio-group tailwind-merge
```

### 3️⃣ Configurer Tailwind (si pas déjà fait)

Dans `tailwind.config.ts`:

```ts
export default {
  darkMode: 'class',
  // ...
}
```

## 📝 Utilisation

### Simple - Dans ton layout principal

```tsx
// app/layout.tsx
import ThemeCustomizer from '@/components/ThemeCustomizer'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ThemeCustomizer />
        {children}
      </body>
    </html>
  )
}
```

### Avancé - Avec callback et configuration

```tsx
import ThemeCustomizer from '@/components/ThemeCustomizer'
import type { ThemeConfig } from '@/lib/theme-customizer.types'

export default function RootLayout({ children }) {
  const handleThemeChange = (config: ThemeConfig) => {
    // Envoyer à une API, analytics, etc.
    console.log('Thème changé:', config)
  }

  return (
    <html lang="fr">
      <body>
        <ThemeCustomizer 
          onThemeChange={handleThemeChange}
          storageKey="my-app-theme"
          targetSelector="html"
        />
        {children}
      </body>
    </html>
  )
}
```

## 🎣 Utiliser les hooks

### Hook principal

```tsx
'use client'

import { useTheme } from '@/hooks/use-theme'

export function MyComponent() {
  const { theme, palette, setTheme, setPalette } = useTheme()

  return (
    <div>
      <p>Thème: {theme}</p>
      <p>Palette: {palette}</p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Changer le thème
      </button>
    </div>
  )
}
```

### Hook dédié au mode

```tsx
'use client'

import { useThemeMode } from '@/hooks/use-theme'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeMode()

  return (
    <button onClick={toggleTheme}>
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
```

### Autres hooks disponibles

```tsx
import { usePalette, useShade, useRounded } from '@/hooks/use-theme'

// Hook palette
const { palette, setPalette } = usePalette()

// Hook shade
const { shade, setShade } = useShade()

// Hook rounded
const { rounded, setRounded } = useRounded()
```

## ⚙️ Configuration

### Props du composant

```tsx
<ThemeCustomizer
  onThemeChange={(config) => {}}  // Callback optionnel
  storageKey="theme-config"        // Clé localStorage
  targetSelector="html"            // Sélecteur CSS cible
/>
```

### Configuration par défaut

```ts
{
  theme: 'dark',      // 'light' | 'dark'
  palette: 'tls',     // 10 palettes disponibles
  shade: '900',       // 5 nuances
  rounded: 'large',   // 9 rayons de bordure
}
```

## 🎨 Palettes disponibles

- 🔵 **trust** - Bleu cyan
- 🟣 **oz** - Violet magenta
- 🔮 **mystery** - Indigo
- 💗 **romance** - Rose rouge
- ❤️ **passion** - Rouge orange
- ⚡ **energy** - Ambre orange
- 🌱 **spring** - Vert citron
- 🌿 **nature** - Vert émeraude
- ❄️ **winter** - Bleu turquoise
- ✨ **tls** - Bleu violet (défaut)

## ⌨️ Raccourcis clavier

| Touche | Action |
|--------|--------|
| **T** | Ouvrir/fermer le customizer |
| **Escape** | Fermer le customizer |

## 📚 Attributs HTML

Le composant ajoute ces attributs au `<html>`:

```html
<html 
  data-theme="dark"
  data-palette="tls"
  data-shade="900"
  data-rounded="large"
  class="dark"
>
```

## 🎯 Utiliser dans le CSS

```css
/* Par palette */
:root[data-palette="tls"] {
  --color-primary: #3b82f6;
}

/* Par nuance */
:root[data-shade="900"] {
  --bg-primary: #111827;
}

/* Par rayon */
:root[data-rounded="large"] {
  --btn-radius: 0.75rem;
}

/* Mode dark */
html.dark {
  color-scheme: dark;
}
```

## 🔄 Exemple complet

```tsx
'use client'

import ThemeCustomizer from '@/components/ThemeCustomizer'
import { useTheme } from '@/hooks/use-theme'
import type { ThemeConfig } from '@/lib/theme-customizer.types'

export default function RootLayout({ children }) {
  const handleThemeChange = (config: ThemeConfig) => {
    // Sauvegarder les préférences utilisateur
    fetch('/api/user/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: config })
    })
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            const stored = localStorage.getItem('theme-config')
            if (stored) {
              const config = JSON.parse(stored)
              const html = document.documentElement
              html.setAttribute('data-theme', config.theme)
              html.setAttribute('data-palette', config.palette)
              html.setAttribute('data-shade', config.shade)
              html.setAttribute('data-rounded', config.rounded)
              if (config.theme === 'dark') html.classList.add('dark')
            }
          `
        }} />
      </head>
      <body>
        <ThemeCustomizer onThemeChange={handleThemeChange} />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

## 🐛 Troubleshooting

### Le thème ne persiste pas
✅ Vérifiez que vous utilisez `'use client'` en haut du fichier
✅ Assurez-vous que localStorage est activé

### Les animations ne fonctionnent pas
✅ Installez `framer-motion`: `npm install framer-motion`

### Le dark mode ne fonctionne pas
✅ Vérifiez `tailwind.config.ts` a `darkMode: 'class'`

### Les icônes ne s'affichent pas
✅ Installez `lucide-react`: `npm install lucide-react`

## 📖 Structure de fichiers recommandée

```
src/
├── components/
│   └── ThemeCustomizer.tsx
├── hooks/
│   └── use-theme.ts
├── lib/
│   └── theme-customizer.types.ts
├── styles/
│   ├── globals.css
│   └── theme-customizer.css
└── app/
    ├── layout.tsx
    └── page.tsx
```

## ✨ Caractéristiques

✅ **Autonome** - Zéro dépendance à des UI libraries complexes
✅ **TypeScript** - Types complets et utilitaires
✅ **Performance** - Optimisé pour Next.js 13+
✅ **Accessible** - ARIA labels et raccourcis clavier
✅ **Responsive** - Mobile-first design
✅ **Persistant** - localStorage intégré
✅ **Callback** - Intégration avec vos services
✅ **Iframes** - Support same-origin
✅ **10 palettes** - Couleurs prédéfinies
✅ **Animations fluides** - Framer Motion

## 📝 Dépendances

- `framer-motion` - Animations
- `lucide-react` - Icônes
- `@radix-ui/react-radio-group` - RadioGroup accessible
- `tailwind-merge` - Utilitaire Tailwind

## 🤝 Besoin d'aide?

Consultez les fichiers inclus:
- `ThemeCustomizer.tsx` - Code du composant
- `theme-customizer.types.ts` - Types et utilitaires
- `use-theme.ts` - Hooks disponibles
- `theme-customizer.css` - Styles et variables CSS
- `layout.example.tsx` - Exemple d'intégration

---

**Créé avec ❤️ à partir du BlockCustomizer du projet Astro Tailus**
