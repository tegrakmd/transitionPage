'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ThemeConfig } from './theme-customizer.types'
import {
  DEFAULT_THEME_CONFIG,
  getStoredThemeConfig,
  saveThemeConfig,
  applyThemeConfig,
  isValidThemeConfig,
} from './theme-customizer.types'

interface UseThemeOptions {
  storageKey?: string
  targetSelector?: string
  onThemeChange?: (config: ThemeConfig) => void
}

export function useTheme(options: UseThemeOptions = {}) {
  const {
    storageKey = 'theme-config',
    targetSelector = 'html',
    onThemeChange,
  } = options

  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = getStoredThemeConfig(storageKey)
    if (stored && isValidThemeConfig(stored)) {
      setConfig(stored)
    }
    setMounted(true)
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return

    applyThemeConfig(config, targetSelector)
    saveThemeConfig(config, storageKey)
    onThemeChange?.(config)
  }, [config, mounted, targetSelector, storageKey, onThemeChange])

  const updateConfig = useCallback((updates: Partial<ThemeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }, [])

  const setTheme = useCallback(
    (theme: ThemeConfig['theme']) => {
      updateConfig({ theme })
    },
    [updateConfig]
  )

  const setPalette = useCallback(
    (palette: ThemeConfig['palette']) => {
      updateConfig({ palette })
    },
    [updateConfig]
  )

  const setShade = useCallback(
    (shade: ThemeConfig['shade']) => {
      updateConfig({ shade })
    },
    [updateConfig]
  )

  const setRounded = useCallback(
    (rounded: ThemeConfig['rounded']) => {
      updateConfig({ rounded })
    },
    [updateConfig]
  )

  const reset = useCallback(() => {
    setConfig(DEFAULT_THEME_CONFIG)
  }, [])

  return {
    config,
    mounted,
    updateConfig,
    setTheme,
    setPalette,
    setShade,
    setRounded,
    reset,
    theme: config.theme,
    palette: config.palette,
    shade: config.shade,
    rounded: config.rounded,
  }
}

export function useThemeMode() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const isDark = theme === 'dark'
  const isLight = theme === 'light'

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark,
    isLight,
  }
}

export function usePalette() {
  const { palette, setPalette } = useTheme()
  return { palette, setPalette }
}

export function useShade() {
  const { shade, setShade } = useTheme()
  return { shade, setShade }
}

export function useRounded() {
  const { rounded, setRounded } = useTheme()
  return { rounded, setRounded }
}
