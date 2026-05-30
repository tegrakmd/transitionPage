'use client'

import { useState, useEffect, useRef } from 'react'
import { Brush, Layers2, Moon, Palette, Square, Sun } from 'lucide-react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { motion, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

type Theme = 'light' | 'dark'
type Palette = 'trust' | 'oz' | 'passion' | 'energy' | 'romance' | 'nature' | 'spring' | 'winter' | 'mystery' | 'tls'
type Shade = 'glassy' | '800' | '900' | '925' | '950'
type Rounded = 'none' | 'small' | 'default' | 'medium' | 'large' | 'xlarge' | '2xlarge' | '3xlarge' | 'full'

const PALETTES: Palette[] = ['trust', 'oz', 'mystery', 'romance', 'passion', 'energy', 'spring', 'nature', 'winter', 'tls']
const SHADES: Shade[] = ['glassy', '800', '900', '925', '950']
const ROUNDEDS: Rounded[] = ['none', 'small', 'default', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge', 'full']
const THEMES: Theme[] = ['light', 'dark']

interface ThemeCustomizerProps {
    onThemeChange?: (config: ThemeConfig) => void
    storageKey?: string
    targetSelector?: string
}

interface ThemeConfig {
    theme: Theme
    palette: Palette
    shade: Shade
    rounded: Rounded
}

const DEFAULT_CONFIG: ThemeConfig = {
    theme: 'dark',
    palette: 'tls',
    shade: '900',
    rounded: 'large',
}

const radioItem = 'relative rounded-[calc(var(--btn-radius)-3px)] delay-75 duration-300 flex items-center justify-center h-8 px-2.5 gap-2 text-[--caption-text-color] transition-[color] hover:text-[--body-text-color] data-[state=checked]:scale-95 transition-transform will-change data-[state=checked]:text-[--title-text-color]'

const containerVariants = {
    hidden: { x: -1 },
    show: { x: 0 },
}

const itemVariants = {
    hidden: {
        x: -6,
        scale: 0.95,
        filter: 'blur(2px)',
        opacity: 0.5,
    },
    show: {
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        opacity: 1,
    },
}

export default function ThemeCustomizer({ onThemeChange, storageKey = 'theme-config', targetSelector = 'html' }: ThemeCustomizerProps) {
    const [isActive, setIsActive] = useState(false)
    const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG)
    const customizerRef = useRef<HTMLDivElement>(null)
    const triggerButtonRef = useRef<HTMLButtonElement>(null)

    // Load config from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                setConfig(parsed)
            } catch (e) {
                console.error('Failed to parse stored theme config:', e)
            }
        }
    }, [storageKey])

    // Apply theme to DOM
    useEffect(() => {
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

        // Apply to iframes if same origin
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
                console.error('Could not apply theme to iframe:', e)
            }
        })

        // Save to localStorage
        localStorage.setItem(storageKey, JSON.stringify(config))

        // Call callback
        onThemeChange?.(config)
    }, [config, targetSelector, storageKey, onThemeChange])

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (customizerRef.current && !customizerRef.current.contains(event.target as Node) && triggerButtonRef.current && !triggerButtonRef.current.contains(event.target as Node)) {
                setIsActive(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 't' || event.key === 'T') {
                setIsActive((prev) => !prev)
            }
            if (isActive && event.key === 'Escape') {
                setIsActive(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        if (isActive) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isActive])

    const updateConfig = (updates: Partial<ThemeConfig>) => {
        setConfig((prev) => ({ ...prev, ...updates }))
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    const initialAnimation = isMobile ? { y: 720 } : { x: 560 }
    const animate = isMobile ? { y: 0 } : { x: 0 }
    const exitAnimation = isMobile ? { y: 720, opacity: 0, scale: 0.95 } : { x: 560, opacity: 0, scale: 0.95 }

    return (
        <>
            <button ref={triggerButtonRef} onClick={() => setIsActive(!isActive)} className="fixed z-40 flex items-center justify-center gap-2 rounded-full border border-gray-950/5 bg-gray-950/5 px-3 py-2 transition-colors hover:bg-gray-950/10 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10" aria-label="Open theme customizer" title="Press T to toggle">
                <Brush className="h-4 w-4" />
                <kbd className="rounded-full bg-gray-950/10 px-2 py-0.5 text-xs font-medium dark:bg-white/10">T</kbd>
            </button>

            <AnimatePresence>
                {isActive && (
                    <motion.div ref={customizerRef} initial={initialAnimation} transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }} animate={animate} exit={exitAnimation} className="fixed inset-x-0 -bottom-px z-50 h-fit rounded-t-2xl border border-gray-200 bg-white p-8 shadow-2xl shadow-gray-950/5 md:inset-x-auto md:right-20 md:top-24 md:w-full md:max-w-sm md:rounded-2xl md:rounded-2xl dark:border-white/10 dark:bg-gray-950 dark:shadow-gray-950/25">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-950 dark:text-white">Personalize Your Theme</h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Tailor the theme to match your unique style</p>
                        </div>

                        {/* Theme Switcher */}
                        <div className="mb-8 space-y-6">
                            <div className="relative">
                                <div className={twMerge('absolute inset-[3px] w-1/2 rounded-lg border border-transparent bg-white shadow transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-gray-900', config.theme === 'dark' && 'translate-x-[calc(100%-6px)]')} />
                                <RadioGroup.Root className="grid grid-cols-2 gap-0.5 rounded-lg border border-gray-950/5 bg-gray-950/5 p-0.5 dark:border-white/10 dark:bg-gray-950/50" value={config.theme} onValueChange={(value) => updateConfig({ theme: value as Theme })}>
                                    <RadioGroup.Item value="light" className={radioItem}>
                                        <Sun className="h-4 w-4" />
                                        <span className="text-sm">Light</span>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="dark" className={radioItem}>
                                        <Moon className="h-4 w-4" />
                                        <span className="text-sm">Dark</span>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </div>

                            {/* Palette Switcher */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2.5 text-sm font-medium text-gray-950 dark:text-white">
                                    <Palette className="h-4 w-4 opacity-50" />
                                    Palette
                                </div>
                                <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-fit">
                                    <RadioGroup.Root aria-label="Theme palette" className="grid grid-cols-5 gap-3 sm:grid-cols-10" value={config.palette} onValueChange={(value) => updateConfig({ palette: value as Palette })}>
                                        {PALETTES.map((palette, index) => (
                                            <motion.div key={palette} variants={itemVariants}>
                                                <RadioGroup.Item value={palette} className="relative flex h-6 w-6 overflow-hidden rounded-full border border-gray-950/10 bg-blue-600 outline-2 outline-offset-2 outline-blue-600 hover:outline focus-visible:outline dark:border-white/20" title={palette}>
                                                    <RadioGroup.Indicator className="absolute inset-0 z-[1] m-auto h-2 w-2 rounded-full bg-white shadow-md shadow-gray-950/50" />
                                                </RadioGroup.Item>
                                            </motion.div>
                                        ))}
                                    </RadioGroup.Root>
                                </motion.div>
                            </div>

                            {/* Shade Switcher */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2.5 text-sm font-medium text-gray-950 dark:text-white">
                                    <Layers2 className="h-4 w-4 opacity-50" />
                                    Shade
                                </div>
                                <motion.div variants={containerVariants} initial="hidden" animate="show">
                                    <RadioGroup.Root aria-label="Theme shade" className="grid grid-cols-5 gap-3" value={config.shade} onValueChange={(value) => updateConfig({ shade: value as Shade })}>
                                        {SHADES.map((shade, index) => (
                                            <motion.div key={shade} variants={itemVariants}>
                                                <RadioGroup.Item value={shade} className="relative flex h-6 w-6 overflow-hidden rounded-full border border-gray-300 bg-gray-100 outline-2 outline-offset-2 outline-blue-600 focus-visible:outline dark:border-white/15 dark:bg-gray-800" title={shade}>
                                                    <RadioGroup.Indicator className="absolute inset-0 z-[1] m-auto h-2 w-2 rounded-full bg-gray-950 shadow-md shadow-gray-950/50 dark:bg-white" />
                                                </RadioGroup.Item>
                                            </motion.div>
                                        ))}
                                    </RadioGroup.Root>
                                </motion.div>
                            </div>

                            {/* Rounded Switcher */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2.5 text-sm font-medium text-gray-950 dark:text-white">
                                    <Square className="h-4 w-4 opacity-50" />
                                    Border Radius
                                </div>
                                <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-fit">
                                    <RadioGroup.Root aria-label="Border radius" className="grid grid-cols-5 gap-3 sm:grid-cols-9" value={config.rounded} onValueChange={(value) => updateConfig({ rounded: value as Rounded })}>
                                        {ROUNDEDS.map((rounded, index) => (
                                            <motion.div key={rounded} variants={itemVariants}>
                                                <RadioGroup.Item value={rounded} className="relative flex h-6 w-6 overflow-hidden border border-gray-300 bg-gray-100 outline-2 outline-offset-2 outline-blue-600 focus-visible:outline dark:border-white/15 dark:bg-gray-800" style={{ borderRadius: `var(--rounded-${rounded})` }} title={rounded}>
                                                    <RadioGroup.Indicator className="absolute inset-0 z-[1] m-auto h-2 w-2 rounded-full bg-gray-950 shadow-md shadow-gray-950/25 dark:bg-white dark:shadow-gray-950/50" />
                                                </RadioGroup.Item>
                                            </motion.div>
                                        ))}
                                    </RadioGroup.Root>
                                </motion.div>
                            </div>
                        </div>

                        {/* Code Snippet */}
                        <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200 bg-gray-100 p-4 font-mono text-xs dark:border-gray-800 dark:bg-gray-900">
                            <pre className="text-gray-700 dark:text-gray-300">{`<html 
  data-theme="${config.theme}"
  data-palette="${config.palette}"
  data-shade="${config.shade}"
  data-rounded="${config.rounded}"
>`}</pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
