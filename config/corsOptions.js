import allowedOriginsArray from './allowedOriginsArray.js';
const corsOptions = {
    origin: allowedOriginsArray,
    optionsSuccessStatus: 200,
    method: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}
export default corsOptions;