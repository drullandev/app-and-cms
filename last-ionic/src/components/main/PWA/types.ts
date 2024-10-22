import React, { ReactElement, useEffect } from 'react'

export interface SplashProps {
  show: boolean
  splash: any
  setShowSplash: any
  timeout: number
}

export interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export type PromptCtx = {
  deferredEvt: IBeforeInstallPromptEvent | null
  hidePrompt?:() => void
}

export type Children = {
  children: ReactElement | ReactElement[] | string | null
}