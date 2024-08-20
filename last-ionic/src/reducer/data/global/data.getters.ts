import { UserState } from '../user/user.state';
import { Preferences } from '@capacitor/preferences';
import { Schedule, Session } from '../../models/Schedule'
import { Speaker } from '../../models/Speaker'
import { Location } from '../../models/Location'
import { parseSessions, setOrRemove } from '../../../classes/data.utils'

//TODO: Add each new key to the data.constants file and also here!
import {
	BLOCKED,
	CARET,
	CONFIRMED,
	CREATED_AT,
	DARK_MODE,
	dataUrl,
	EMAIL,
	HAS_LOGGED_IN,
	HAS_SEEN_TUTORIAL, 
	ID,
	JWT, 
	locationsUrl,
	PROVIDER,
	ROLE,
	SESSION_ID,
	UPDATED_AT,
	USERNAME 
} from '../../constants'

export const getConfData = async () => {

	const response = await Promise.all([
		fetch(dataUrl),
		fetch(locationsUrl)])

	const responseData = await response[0].json()
	const schedule = responseData.schedule[0] as Schedule
	const sessions = parseSessions(schedule)
	const speakers = responseData.speakers as Speaker[]
	const locations = await response[1].json() as Location[]

	const allTracks = sessions
		.reduce((all, session) => all.concat(session.tracks), [] as string[])
		.filter((trackName: string, index: number, array: any[]) => array.indexOf(trackName) === index)
		.sort()

	return {
		schedule,
		sessions: parseSessions(schedule),
		locations,
		speakers,
		allTracks,
		filteredTracks: [...allTracks]
	}

}

export const getUserData = async () => {

	const response = await Promise.all([
		Preferences.get({ key: ID }),
		Preferences.get({ key: JWT }),
		Preferences.get({ key: SESSION_ID }),
		Preferences.get({ key: USERNAME }),
		Preferences.get({ key: EMAIL }),
		Preferences.get({ key: BLOCKED }),
		Preferences.get({ key: CONFIRMED }),
		Preferences.get({ key: CREATED_AT }),
		Preferences.get({ key: UPDATED_AT }),
		Preferences.get({ key: PROVIDER }),
		Preferences.get({ key: DARK_MODE }),
		Preferences.get({ key: HAS_SEEN_TUTORIAL }),
		Preferences.get({ key: HAS_LOGGED_IN }),
		Preferences.get({ key: CARET }),
		Preferences.get({ key: ROLE }),
	])

	return {
		id: response[0].value || '0',
		jwt: response[1].value || undefined,
		sessionId: response[2].value || undefined,
		username: response[3].value || undefined,
		email: response[4].value || undefined,
		blocked: response[5].value === 'true',
		confirmed: response[6].value === 'true',
		created_at: response[7].value || undefined,
		updated_at: response[8].value || undefined,
		provider: response[9].value || undefined,    
		darkMode: response[10].value  === 'true',
		hasSeenTutorial: response[11].value === 'true',
		isLoggedIn:  response[12].value === 'true',
		caret: response[13].value === undefined,
		role: response[14].value === undefined
	}

}
  