import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { getThemePreloadScript } from './app/utils/theme-preload'

const _require = createRequire(import.meta.url)
const _piniaRoot = dirname(_require.resolve('pinia/package.json'))
const piniaEsmEntry = join(_piniaRoot, 'dist', 'pinia.mjs')

export default defineNuxtConfig({
  srcDir: 'app/',
  // @nuxtjs/sitemap / @nuxtjs/robots 依赖站点绝对地址
  site: {
    url: 'https://SSR_APP_UI.com',
  },
  // 兼容性设置
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  // 开发工具
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  // Vite 插件配置
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // pinia 的 package exports 在 node+production 会指向 prod CJS，被 Rollup 转成对 vue 的默认导入会炸；固定到 ESM 入口
        pinia: piniaEsmEntry,
      },
    },
    optimizeDeps: {
      include: ['aos', 'vee-validate'],
    },
  },
  // 应用配置
  app: {
    head: {
      titleTemplate: '%s | SSR APP UI',
      title: 'SSR APP UI',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      meta: [
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'msapplication-TileImage',
          content:
            'https://xmaivending.com/wp-content/uploads/2026/03/cropped-微信图片_20260323170806_192_11343-270x270.png',
        },
      ],
      link: [
        {
          rel: 'icon',
          sizes: '32x32',
          href: 'https://xmaivending.com/wp-content/uploads/2026/03/cropped-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260323170806_192_11343-32x32.png',
        },
        {
          rel: 'icon',
          sizes: '192x192',
          href: 'https://xmaivending.com/wp-content/uploads/2026/03/cropped-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260323170806_192_11343-192x192.png',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://xmaivending.com/wp-content/uploads/2026/03/cropped-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260323170806_192_11343-180x180.png',
        },
        { rel: 'dns-prefetch', href: 'https://SSR_APP_UI.com/' },
      ],
      bodyAttrs: {
        class: 'ssr-app-ui',
      },
      script: [
        {
          key: 'theme-preload',
          tagPosition: 'head',
          innerHTML: getThemePreloadScript(),
        },
      ],
    },
    rootId: '__SSR_APP_UI__',
  },
  // 运行时配置
  runtimeConfig: {
    public: {
      siteUrl: 'https://SSR_APP_UI.com/',
      contactEmail: 'guts@SSR_APP_UI.com',
      supportPhone: '+1 8165537029',
      defaultLocale: 'en',
    },
  },
  // 模块配置
  modules: [
    [
      '@nuxtjs/i18n',
      {
        restructureDir: 'app/assets/locales',
        strategy: 'no_prefix',
        defaultLocale: 'en',
        locales: [
          { code: 'en', iso: 'en-US', name: 'English', file: 'en-US.json', dir: 'ltr' },
          { code: 'es', iso: 'es-ES', name: 'Español', file: 'es-ES.json', dir: 'ltr' },
          { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr-FR.json', dir: 'ltr' },
        ],
        langDir: 'languages',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'SSR_APP_UI_LANGUAGE',
          redirectOn: 'root',
          alwaysRedirect: false,
        },
        vueI18n: 'i18n.config.ts',
      },
    ],
    [
      '@nuxt/image',
      {
        provider: 'ipx',
        screens: {
          xs: 320,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          '2xl': 1536,
          '3xl': 1920,
        },
        format: ['webp', 'jpg'],
        quality: 80,
      },
    ],
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    'nuxt-swiper',
    [
      '@formkit/nuxt',
      {
        autoImport: true,
      },
    ],
  ],
  // 构建配置
  nitro: {
    prerender: {
      routes: ['/', '/robots.txt', '/sitemap.xml'],
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },
  // 开发服务器
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  // CSS配置
  css: ['~/assets/css/main.css'],
})
