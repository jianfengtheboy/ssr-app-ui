/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	important: 'body', // 提高样式优先级
	content: [
		'./src/components/**/*.{js,vue,ts}',
		'./src/layouts/**/*.vue',
		'./src/pages/**/*.vue',
		'./src/plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./src/app.vue',
		'./src/error.vue',
	],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			red: colors.red,
			yellow: colors.amber,
			green: colors.emerald,
			blue: colors.blue,
			indigo: colors.indigo,
			purple: colors.violet,
			pink: colors.pink,
			primary: '#4965f2',
			warning: '#FCA700',
			danger: '#fa2c19',
			success: '#00B246',
			info: '#909196',
		},
	},
	plugins: [],
}
