import path from 'path';

// TODO: use UPLOADS_DIR from env variables later
export const UPLOADS_DIR = process.env.NODE_ENV === 'production' ? 
    '/app/uploads' :
    path.join(__dirname, '../../../../../uploads');

