// 「N-DEV」により作成されました。
import {defineNuxtConfig} from 'nuxt/config'
import {transformAssetUrls} from 'vite-plugin-vuetify'

let title: string = "NEXS-DEV";
let description: string = "NEXSの「Nエコシステム」は，それぞれのシステムが連動し，より柔軟で便利なシステムとしてエコシステムを提供します";

export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
            titleTemplate: title,
            title: title,
            htmlAttrs: {
                lang: 'ja',
            },
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'description', content: description},
                {name: 'format-detection', content: 'telephone=no'},
                {name: 'content-language', content: 'ja'},
                {name: 'apple-mobile-web-app-capable', content: 'yes'},
                {name: 'mobile-web-app-capable', content: 'yes'},
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: `/favicon.ico`},
            ]
        },
    },
    build: {
        transpile: ['vuetify', '@vuepic/vue-datepicker'],
    },
    nitro: {
        routeRules: {
            '/__/auth/**': {
                proxy: process.env.NODE_ENV === "development" ? "" : "https://sample.firebaseapp.com/__/auth/**",
            },
        },
    },
    modules: [],
    vite: {
        vue: {
            script: {
                defineModel: true,
            },
            template: {
                transformAssetUrls,
            },
        },
    },
    css: [
        '@/assets/main.scss',
    ],
})
