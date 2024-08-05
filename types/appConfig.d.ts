declare module '@nuxt/schema' {
	interface AppConfigInput {
		// 布局模式： fullscreen：全屏布局  grail: 圣杯布局  default: 默认布局
		layout?: 'fullscreen' | 'grail' | 'default'
	}
}

export {}
