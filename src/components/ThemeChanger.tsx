'use client'

import { useTheme } from 'next-themes'

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <div>
        test
      </div>
      <div style={{position: "fixed", zIndex: 99999, display: 'inline-block'}}>
        The current theme is: {theme}
        <button onClick={() => setTheme('light')}>Light Mode</button>
        <button onClick={() => setTheme('dark')}>Dark Mode</button>
      </div>
    </>
  )
}