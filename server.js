import config from './config.js';
import apiRouter from './api/index.js';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const server = express();

server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

import serverRender from './serverRender.js';
server.get('/', (req, res) => {
    serverRender()
        .then(content => {
            res.render('index');
        })
});
server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, () => {
    console.info('Express listening on port ', config.port);
});