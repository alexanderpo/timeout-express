import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import apiRoutes from './routes/api.routes';
// import mongoose from 'mongoose';
// import { config } from './config';

const app = express();
const port = process.env.PORT || 3000;

// mongoose.connect(config.database);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use('/api', apiRoutes);

app.listen(port);

console.log('Server start at http://localhost:' + port);
