import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import apiRoutes from './routes/api.routes';
import mongoose from 'mongoose';
import { config } from './config';
import { fileLimitChecker } from './middlewares/fileLimit';

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(config.database, (err) => {
  if (err) throw err;
});
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(fileLimitChecker);

app.use('/api', apiRoutes);

app.listen(port);

console.log('Server start at http://localhost:' + port);
