# 📄 Structure du dossier nextjs-theme-customizer

```
nextjs-theme-customizer/
│
├── 📄 README.md
│   └─ Guide complet d'installation et d'utilisation
│
├── 📄 CHECKLIST.md
│   └─ Checklist rapide d'installation
│
├── 🎨 ThemeCustomizer.tsx
│   └─ Composant principal autonome
│   └─ Tous les styles et logique inclus
│
├── 📘 theme-customizer.types.ts
│   └─ Types TypeScript
│   └─ Utilitaires helper
│   └─ Constants et labels
│
├── 🎣 use-theme.ts
│   └─ Hook useTheme() - Complet
│   └─ Hook useThemeMode() - Light/dark
│   └─ Hook usePalette() - Palette seulement
│   └─ Hook useShade() - Shade seulement
│   └─ Hook useRounded() - Rounded seulement
│
├── 🎨 theme-customizer.css
│   └─ Variables CSS par palette
│   └─ Variables CSS par shade
│   └─ Variables CSS par rounded
│   └─ Support du mode dark
│   └─ Exemples de composants
│
└── 📝 layout.example.tsx
    └─ Exemple d'intégration complète
    └─ Exemple avec callback
    └─ Prêt à copier-coller
```

## 🚀 Quick Start

```bash
# 1. Copier dans ton projet Next.js
cp -r nextjs-theme-customizer/* /ton-project/

# 2. Installer les dépendances
npm install framer-motion lucide-react @radix-ui/react-radio-group tailwind-merge

# 3. Ajouter au layout principal (app/layout.tsx)
import ThemeCustomizer from '@/components/ThemeCustomizer'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeCustomizer />
        {children}
      </body>
    </html>
  )
}

# 4. Voilà! 🎉
```

## 📦 Fichiers et leur destination

| Fichier | Destination |
|---------|-------------|
| `ThemeCustomizer.tsx` | `src/components/ThemeCustomizer.tsx` |
| `theme-customizer.types.ts` | `src/lib/theme-customizer.types.ts` |
| `use-theme.ts` | `src/hooks/use-theme.ts` |
| `theme-customizer.css` | `src/styles/theme-customizer.css` |

## ✨ Caractéristiques incluses

✅ Composant complet et autonome
✅ Types TypeScript complets
✅ 5 hooks personnalisés
✅ Styles CSS variables
✅ localStorage persistant
✅ Animations fluides
✅ Support Iframes same-origin
✅ Raccourcis clavier (T, Escape)
✅ Mode responsive
✅ Accessible (ARIA)

## 🔗 Dépendances requises

```json
{
  "framer-motion": "^11.0.0",
  "lucide-react": "^latest",
  "@radix-ui/react-radio-group": "^latest",
  "tailwind-merge": "^latest"
}
```

## 📖 Documentation

- **README.md** - Guide complet d'installation et d'utilisation
- **CHECKLIST.md** - Checklist rapide
- **ThemeCustomizer.tsx** - Code commenté du composant
- **theme-customizer.types.ts** - Types et utilitaires documentés
- **use-theme.ts** - Hooks documentés

## 🎯 Points clés

1. **Autonome** - Pas de dépendance à nanostores ou frameworks complexes
2. **Complet** - Thème, palette, shade et rounded inclus
3. **Type-safe** - TypeScript avec types complets
4. **Performance** - Optimisé pour Next.js 13+
5. **Flexible** - Callback, storage key et target selector configurables

---

**Prêt à l'emploi - Copier, coller, utiliser! 🚀**
