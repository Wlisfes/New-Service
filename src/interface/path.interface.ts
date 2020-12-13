export function App(path: string): string {
	return `v1/${path}`
}

export function Web(path: string): string {
	return `v2/${path}`
}
