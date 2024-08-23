import { useEffect, useState } from "react"

export function useFavorites(){
  function getFavorites() {
    if (typeof window === 'undefined') {
      return []
    }
    return localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites') as string)
      : []
  }
  const [favorites, setFavorites] = useState<string[]>(getFavorites())

  useEffect(() => {
    // 每當 favorites 改變時，將其保存到 localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])
  return{
    favorites ,
    setFavorites 
  }
}