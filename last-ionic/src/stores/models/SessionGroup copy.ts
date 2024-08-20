import { Session } from './Schedule'
export interface SessionGroup {
  time: ReactI18NextChildren | Iterable<ReactI18NextChildren>
  startTime: string
  sessions: Session[]
}
