import * as React from 'react'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useDialogContext } from '@components/appProviders/Dialogs'

export const OnRouteChange: React.FC = () => {
  const { pathname } = useLocation()
  const history = useHistory()
  const { closeAllDialogs } = useDialogContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (typeof closeAllDialogs === 'function') closeAllDialogs()
    })
    return () => {
      unlisten()
    }
  }, [history, closeAllDialogs])

  return null
}
