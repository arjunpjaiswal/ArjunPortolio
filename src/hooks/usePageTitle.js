import { useEffect } from 'react'

export function usePageTitle(title){
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} | Arjun Pankaj Jaiswal` : 'Arjun Pankaj Jaiswal — Backend Engineer'
    return () => {
      document.title = prev
    }
  }, [title])
}
