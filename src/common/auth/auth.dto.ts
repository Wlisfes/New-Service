export interface AuthSign {
	uid: number
	password?: string
}

export interface AuthVerify {
	uid: number
	password?: string
	iat: number
	exp: number
}
