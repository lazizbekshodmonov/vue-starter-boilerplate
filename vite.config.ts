import type {ClientRequest, IncomingMessage} from "node:http";
import type {TLSSocket} from "node:tls";
import vue from "@vitejs/plugin-vue";
import {defineConfig, HttpProxy, type ProxyOptions} from "vite";
import Components from "unplugin-vue-components/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import VueInspector from "vite-plugin-vue-inspector";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueInspector({
            launchEditor: "webstorm",
        }),
        vueDevTools({launchEditor: "webstorm"}),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: "less",
                }),
            ],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/globals" as *;`,
            },
        },
    },
    server: {
        port: 7070,
        host: true,
        proxy: {
            "/api": {
                target: "http://192.168.77.138:8093",
                changeOrigin: true,
                rewrite: (path) => {
                    return path.replace(/^\/api/, "/api");
                },
                configure: viteLogger,
            },
            "/e-imzo": {
                target: "https://staging.mening-tomorqam.uz",
                changeOrigin: true,
                rewrite: (path) => {
                    return path.replace(/^\/e-imzo/, "");
                },
                configure: viteLogger,
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString();
                    }
                },
            },
        },
    },
    define: {
        __VUE_PROD_DEVTOOLS__: false,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});

interface ProxyIncomingMessage extends IncomingMessage {
    originalUrl?: string;
    _parsedUrl?: { path?: string };
}

export function viteLogger(proxy: HttpProxy.Server, options: ProxyOptions) {
    // Request log
    proxy.on("proxyReq", (proxyReq: ClientRequest, req: ProxyIncomingMessage) => {
        const protocol = (req.socket as TLSSocket).encrypted ? "https" : "http";
        const host = req.headers.host;

        const originalPath =
            req.originalUrl ?? req._parsedUrl?.path ?? req.url ?? "";
        const originalUrl = `${protocol}://${host}${originalPath}`;
        const targetUrl = `${options.target}${proxyReq.path}`;

        console.log(
            `[PROXY REQ] ${req.method} ${originalUrl} -> ${req.method} ${targetUrl}`,
        );
    });

    // Response log
    proxy.on("proxyRes", (proxyRes: IncomingMessage, req: IncomingMessage) => {
        console.log(
            `[PROXY RES] ${req.method} ${req.url} -> ${proxyRes.statusCode} ${proxyRes.statusMessage}`,
        );
    });

    // Error log
    proxy.on("error", (err: Error, req: IncomingMessage) => {
        console.error(`[PROXY ERROR] ${req.method} ${req.url} -> ${err.message}`);
    });
}
