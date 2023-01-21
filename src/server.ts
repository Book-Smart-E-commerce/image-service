import { app } from '@src/app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env['PORT'] ?? 4700;

app.listen(PORT, () => console.log(`Listening in ${PORT} `));
