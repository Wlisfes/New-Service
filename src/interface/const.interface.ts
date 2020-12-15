export const ADMINKEY = (uid: number): string => {
	return `admin_uid_${uid}`
}

export const USERKEY = (uid: number): string => {
	return `user_uid_${uid}`
}
