import express from 'express';

import getConfig from './config.module';
import getMongoDB from './database.module';

import productRouter from './products/products.module';

getConfig();
getMongoDB();

const PORT = process?.env?.PORT ?? 8080;
const HOST = process?.env?.HOST ?? 8080;

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'test') console.log(`Server is running on ${PORT}`)
});

export default app;