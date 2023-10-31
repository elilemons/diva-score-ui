import { App, URLOpenListenerEvent } from '@capacitor/app'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

export const InAppBrowserListener: React.FC = () => {
  const history = useHistory()
  React.useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const slug = event.url.split('installmint.app').pop()
      if (slug) {
        history.push(slug)
      }
    })
  }, [history])

  return null
}
