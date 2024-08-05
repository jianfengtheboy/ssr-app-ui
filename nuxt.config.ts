import { resolve } from 'path'
// element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// icons
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineNuxtConfig({
	devtools: {
		// 本地开发启用devtools
		enabled: process.env.NODE_ENV !== 'production',
	},
	// 配置自定义 Meta 以及 SEO选项
	app: {
		baseURL: '/client',
		head: {
			title: import.meta.env.VITE_SYSTEM_NAME,
			meta: [
				{
					'data-n-head': 'ssr',
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover',
				},
				{ 'data-n-head': 'ssr', 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
			],
			link: [{ rel: 'icon', href: 'favicon.ico' }],
			style: [],
			script: [],
			noscript: [],
		},
		// 配置页面根节点id，默认是 _nuxt
		rootId: '__SSR_APP_UI__',
	},
	alias: {
		// 以下两项配置项是为了临时解决运行时 @nuxt/content 报错的问题
		'micromark/lib/preprocess.js': 'micromark',
		'micromark/lib/postprocess.js': 'micromark',
	},
	build: {
		transpile: process.env.NODE_ENV === 'production' ? ['element-plus/es', 'fsevents'] : ['fsevents'],
	},
	// 打包文件夹
	buildDir: import.meta.env.VITE_BUILD_DIR,
	// 默认引入的css文件
	css: ['element-plus/dist/index.css', '~/assets/styles/main.scss'],
	imports: {
		dirs: ['composables/**', 'store/**', 'components/**'],
	},
	plugins: ['@/plugins/element-plus', '@/plugins/authDirective'],
	modules: ['unplugin-icons/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-lodash', '@nuxt/content'],
	content: {},
	// postcss相关配置
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	devServer: {
		host: '0.0.0.0',
		port: 2024,
	},
	// 项目文件在src内，默认项目文件在根目录，注意：配置此项之后，需同步更新相关资源引用路径配置
	srcDir: 'src/',
	runtimeConfig: {
		public: {
			baseURL: import.meta.env.VITE_PROXY_BASE_URL,
			proxyUrl: import.meta.env.VITE_PROXY_URL,
			systemName: import.meta.env.VITE_SYSTEM_NAME,
		},
		app: {},
	},
	// 开发环境代理配置
	nitro: {
		devProxy: {
			[`${import.meta.env.VITE_PROXY_BASE_URL}`]: {
				target: import.meta.env.VITE_PROXY_URL,
				changeOrigin: true,
			},
		},
	},
	// vite相关配置
	vite: {
		plugins: [
			AutoImport({
				resolvers: [
					ElementPlusResolver({
						importStyle: false,
					}),
				],
			}),
			Components({
				dts: true,
				resolvers: [
					ElementPlusResolver({
						importStyle: false,
					}),
					IconsResolver({
						prefix: 'icon',
						customCollections: ['custom'],
					}),
				],
			}),
			Icons({
				autoInstall: true,
				customCollections: {
					custom: FileSystemIconLoader(resolve('src/assets/icons')),
				},
			}),
		],
	},
})
