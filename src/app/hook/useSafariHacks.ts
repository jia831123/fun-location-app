import { useEffect } from 'react'

export function useSafarHack() {
  function safariHacks() {
    let windowsVH = window.innerHeight / 100
    const mainContainer = document.querySelector(
      '.main-container'
    ) as HTMLElement
    if (mainContainer === null) return
    mainContainer.style.setProperty('--vh', windowsVH + 'px')
    window.addEventListener('resize', function () {
      mainContainer.style.setProperty('--vh', windowsVH + 'px')
    })
  }
  useEffect(() => {
    safariHacks()
  }, [])
}
