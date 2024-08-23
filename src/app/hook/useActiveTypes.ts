import { useState,useEffect } from "react";
import { CategoryEnum } from "../service/api/searchShowAction";

export function useActiveTypes(){
  function getDefaultActiveTypes() {
    if (typeof window === 'undefined')
      return [
        ...(Object.values(CategoryEnum).filter(
          (e) => typeof e === 'number'
        ) as any),
      ]
    return localStorage.getItem('activeTypes')
      ? JSON.parse(localStorage.getItem('activeTypes') as string)
      : [...Object.values(CategoryEnum).filter((v) => typeof v === 'number')]
  }
  const [activeTypes, setActiveTypes] = useState<CategoryEnum[]>(
    getDefaultActiveTypes()
  )
  useEffect(() => {
    // 每當 activeTypes 改變時，將其保存到 localStorage
    localStorage.setItem('activeTypes', JSON.stringify(activeTypes))
  }, [activeTypes])
  return{
    activeTypes ,
    setActiveTypes
  }

}