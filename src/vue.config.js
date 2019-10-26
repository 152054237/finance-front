module.exports = {
    baseUrl: process.env.baseUrl,
    devServer: {
        port: process.env.PORT,
        proxy: {
            '/casLogin': {
                target: process.env.PROXY_TARGET,
                ws: true,
                changeOrigin: true
            }
        }
    }
}
