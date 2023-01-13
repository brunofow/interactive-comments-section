import { useEffect, useState } from 'react'

interface WindowSize {
  width: number | undefined
  height: number | undefined
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  })

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (windowSize.width) {
      setIsMobile(windowSize.width <= 768)
    }
  }, [windowSize])

  return [windowSize, isMobile]
}
