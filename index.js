const server = require('./src/server');

const port = process.env.PORT || 4500;

server.listen(port, () => console.log(`-[***]- LISTENING on PORT ${port} -[***]-`));