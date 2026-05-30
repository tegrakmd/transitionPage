# 📋 Checklist d'installation

Copie-colle cette checklist pour installer le ThemeCustomizer:

## ✅ Étapes

- [ ] **Étape 1:** Copier les fichiers
  ```bash
  cp ThemeCustomizer.tsx /ton-project/src/components/
  cp theme-customizer.types.ts /ton-project/src/lib/
  cp use-theme.ts /ton-project/src/hooks/
  cp theme-customizer.css /ton-project/src/styles/
  ```

- [ ] **Étape 2:** Installer les dépendances
  ```bash
  npm install framer-motion lucide-react @radix-ui/react-radio-group tailwind-merge
  ```

- [ ] **Étape 3:** Configurer Tailwind
  - Vérifier que `tailwind.config.ts` a `darkMode: 'class'`

- [ ] **Étape 4:** Importer le CSS
  - Ajouter dans `src/styles/globals.css`:
  ```css
  @import './theme-customizer.css';
  ```

- [ ] **Étape 5:** Utiliser le composant
  ```tsx
  import ThemeCustomizer from '@/components/ThemeCustomizer'
  
  export default function Layout({ children }) {
    return (
      <html>
        <body>
          <ThemeCustomizer />
          {children}
        </body>
      </html>
    )
  }
  ```

- [ ] **Étape 6:** Tester
  - Appuyer sur **T** pour ouvrir le customizer
  - Changer le thème, palette, shade et rounded
  - Vérifier la persistance en rechargant la page

## 🎉 Terminé!

Ton composant ThemeCustomizer est maintenant prêt à l'emploi.

---

**Besoin d'aide?** Consultez le README.md dans le dossier.
