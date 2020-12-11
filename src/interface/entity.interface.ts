//C端管理员表
export interface AdminFace {
	id: number
	uid: number
	nickname: string
	avatar: string
	status: number
	mobile: string | number
	password: string
	createTime: string
}

//B端用户表
export interface UserFace {
	id: number
	uid: number
	openid: string
	nickname: string
	avatar: string
	status: number
	mobile: string | number
	createTime: string
}

//banner表
export interface BannerFace {
	id: number
	picUrl: string
	comment: string
	proid: number
	status: string
	createTime: string
}

//source表
export interface BannerFace {
	id: number
	name: string
	picUrl: string
	comment: string
	status: string
	createTime: string
}
