import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`[LOGVACINAS SYRINGE CLASSIFIER] Running on ${PORT} 🚀`);
});