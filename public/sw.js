if(!self.define){let e,i={};const s=(s,c)=>(s=new URL(s+".js",c).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let t={};const r=e=>s(e,a),o={module:{uri:a},exports:t,require:r};i[a]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-1b7837c0"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/243.746b84d7a90c9ca1.js",revision:"746b84d7a90c9ca1"},{url:"/_next/static/chunks/311-6ce20f73bd445bac.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/403-9ad3c5f97897717c.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/635.a1f08d4c8349ecf0.js",revision:"a1f08d4c8349ecf0"},{url:"/_next/static/chunks/app/_not-found/page-c6dbd7bc47d9b5de.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/app/layout-4aa1aef9fc8f0e61.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/app/page-0b2173104130dec4.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/d0deef33.afff9b3bf7059c8b.js",revision:"afff9b3bf7059c8b"},{url:"/_next/static/chunks/fd9d1056-90960e0a7e77703c.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/main-527912b3d9488a37.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/main-app-36ad40a6336129c0.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-4e075e6e19bda879.js",revision:"illB6rvGUPKId6w0Xa0LU"},{url:"/_next/static/css/857aa62baa17c894.css",revision:"857aa62baa17c894"},{url:"/_next/static/css/cb13fb87742c6a34.css",revision:"cb13fb87742c6a34"},{url:"/_next/static/css/fa766e5e6505d403.css",revision:"fa766e5e6505d403"},{url:"/_next/static/illB6rvGUPKId6w0Xa0LU/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/illB6rvGUPKId6w0Xa0LU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/icons/camp.png",revision:"e6fc486709af0e40d77095e338008664"},{url:"/icons/camp_click.png",revision:"d94b3c6652be67f6204d88b91f29eb44"},{url:"/icons/concert.png",revision:"c5502b4b09788c0cc37fdd0c976e6a11"},{url:"/icons/concert_click.png",revision:"d9be871f415fdb4d16dba72429118465"},{url:"/icons/culture.png",revision:"f5ad1b2d02bce5af532d0aa574688870"},{url:"/icons/culture_click.png",revision:"c140117eab3f9c8a0542d651833268ca"},{url:"/icons/dance.png",revision:"21cd43ab333f2d4fdb9994d7e633ee02"},{url:"/icons/dance_click.png",revision:"f1795f2d4f483df55a244356315c4024"},{url:"/icons/dramatic.png",revision:"9efaacef97f9df5874de77220493bc83"},{url:"/icons/dramatic_click.png",revision:"be5938fa16f41ab53d913a62a694260c"},{url:"/icons/election.png",revision:"8719014f6ec0d5c10a9ceb16460be8c7"},{url:"/icons/election_click.png",revision:"d64d97dcb9be6f93bf6b43c0bb9aa3a7"},{url:"/icons/exhibition.png",revision:"1ad3515a1716bad063a346a680157cfe"},{url:"/icons/exhibition_click.png",revision:"7881e7d7a6868517d1f15321a02f7404"},{url:"/icons/independent_music.png",revision:"424f4ee72652cc9ce228a00580fc9b59"},{url:"/icons/independent_music_click.png",revision:"ae9dc37452b8ded2a398557e225db8a2"},{url:"/icons/movie.png",revision:"681245e210427e42d55c85486996769c"},{url:"/icons/movie_click.png",revision:"97956b7f933ecec80a6f2cc7f2401961"},{url:"/icons/music.png",revision:"329d28a6b73f30614b75a48e2d3a4c2e"},{url:"/icons/music_click.png",revision:"942b2169092f98cb3141f50e4d71e717"},{url:"/icons/other.png",revision:"c023e8b6c34d53bff17f5e1aa33c8095"},{url:"/icons/other_click.png",revision:"a36a8e55657f830a00fcb631b2692644"},{url:"/icons/parenting.png",revision:"d60d85268b63c74e1858d6925063d27e"},{url:"/icons/parenting_click.png",revision:"736b09eb9231f40d0c852febf9ff312d"},{url:"/icons/research_class.png",revision:"7968c453b481ff0ef58b93edf9d29d0a"},{url:"/icons/research_class_click.png",revision:"2fe22e97b13d5502e4011f36bd8d9817"},{url:"/icons/talk.png",revision:"7c06d246088cfad8d7fbe2c7b2ce7f37"},{url:"/icons/talk_click.png",revision:"7506e7e85fd3c3c39d38346589aaa044"},{url:"/images/favicon.png",revision:"bd8c7fe660cc983b056829ecb85e4e8b"},{url:"/images/icon-192.png",revision:"d72e810b8be37010fe976089e22d896c"},{url:"/images/icon-512.png",revision:"f1aeee22e3425358c94d54a7c6250c8f"},{url:"/images/icon-maskable-192.png",revision:"0b702de4b33fe8e96c1553b2f70f3ae8"},{url:"/images/icon-maskable-512.png",revision:"0708d251b1a0316d2c06b684bf20c026"},{url:"/manifest.json",revision:"bb9d6a9fd49e8eed06f4addba0eaa2ac"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/point.png",revision:"578033d6077495d13dd571cdf39dcfb3"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:i}})=>!(!e||i.startsWith("/api/auth/callback")||!i.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:i},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!i.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:i},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!i.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:i})=>i&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
