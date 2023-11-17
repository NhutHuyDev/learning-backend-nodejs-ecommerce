const app = require("./src/app");
const { app: { port } } = require("./src/configs");

const PORT = port

const server = app.listen(PORT, () => {
    console.log(`WSL eCommerce started with ${PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => console.log('Exit Server Express'))
})



