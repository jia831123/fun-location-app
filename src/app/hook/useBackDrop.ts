import {  useState } from 'react'
export function useBackDrop(){
  const [isBackDrop, setBackDrop] = useState(true)
  const showLoading = () => setBackDrop(true)
  const hideLoading = () => setBackDrop(false)
  return {isLoading:isBackDrop,showLoading,hideLoading}
}