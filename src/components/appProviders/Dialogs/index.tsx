import * as React from 'react'

type DialogContext = {
  openDialogs: [] | Array<string>
  openDialog: undefined | ((key: string) => void)
  closeDialog: undefined | ((key: string) => void)
  closeAllDialogs: undefined | (() => void)
  isDialogOpen: undefined | ((key: string) => boolean)
  isAnyOpen: undefined | (() => boolean)
}
const DialogContext = React.createContext<DialogContext>({
  openDialogs: [],
  openDialog: undefined,
  closeDialog: undefined,
  closeAllDialogs: undefined,
  isDialogOpen: undefined,
  isAnyOpen: undefined,
})

type TriggerTypes = 'OPEN_DIALOG' | 'CLOSE_DIALOG' | 'CLOSE_ALL_DIALOGS'
type Action = {
  trigger: TriggerTypes
  payload?: {
    key: string
  }
}
const dialogReducer = (openDialogs: Array<string>, action: Action) => {
  let mutatedOpenDialogs = [...openDialogs]

  switch (action.trigger) {
    case 'OPEN_DIALOG':
      if (typeof action.payload?.key === 'string') {
        mutatedOpenDialogs.push(action.payload.key)
      }
      break

    case 'CLOSE_DIALOG':
      if (typeof action.payload?.key === 'string') {
        const removeIndex = openDialogs.indexOf(action.payload.key)
        if (removeIndex > -1) {
          mutatedOpenDialogs.splice(removeIndex, 1)
        }
      }
      break

    case 'CLOSE_ALL_DIALOGS':
      mutatedOpenDialogs = []
      break

    default:
      break
  }

  return mutatedOpenDialogs
}

type DialogProviderProps = {
  children: React.ReactNode
}
export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [openDialogs, dispatchDialogAction] = React.useReducer(dialogReducer, [])

  const openDialog = React.useCallback((key: string): void => {
    dispatchDialogAction({
      trigger: 'OPEN_DIALOG',
      payload: {
        key,
      },
    })
  }, [])

  const closeDialog = React.useCallback((key: string): void => {
    dispatchDialogAction({
      trigger: 'CLOSE_DIALOG',
      payload: {
        key,
      },
    })
  }, [])

  const closeAllDialogs = React.useCallback((): void => {
    dispatchDialogAction({ trigger: 'CLOSE_ALL_DIALOGS' })
  }, [])

  const isDialogOpen = React.useCallback(
    (key: string): boolean => {
      return openDialogs.includes(key)
    },
    [openDialogs],
  )

  const isAnyOpen = React.useCallback((): boolean => {
    return openDialogs.length > 0
  }, [openDialogs])

  return (
    <DialogContext.Provider
      value={{
        openDialogs,
        openDialog,
        closeDialog,
        closeAllDialogs,
        isDialogOpen,
        isAnyOpen,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialogContext = (): DialogContext => React.useContext(DialogContext)
