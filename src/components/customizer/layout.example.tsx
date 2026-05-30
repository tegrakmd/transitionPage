'use client'

import ThemeCustomizer from './ThemeCustomizer'
import type { ThemeConfig } from './theme-customizer.types'

export default function reootLayout({ children }: { children: React.ReactNode }) {
    const handleThemeChange = (config: ThemeConfig) => {
        console.log('🎨 Theme updated:', config)

        // Exemples d'utilisation:
        // 1. Envoyer à une API
        // fetch('/api/user/theme', {
        //   method: 'PUT',
        //   body: JSON.stringify(config)
        // })

        // 2. Enregistrer dans Zustand/Redux
        // store.setTheme(config)

        // 3. Envoyer à un service d'analytics
        // analytics.track('theme_changed', config)
    }

    return (
        <div lang="fr">
            
                {/* Customizer */}
                <ThemeCustomizer onThemeChange={handleThemeChange} storageKey="app-theme" targetSelector="html" />

                {/* Contenu principal */}
                <main className="min-h-screen bg-white text-gray-950 transition-colors dark:bg-gray-950 dark:text-white">{children}</main>
           
        </div>
    )
}
