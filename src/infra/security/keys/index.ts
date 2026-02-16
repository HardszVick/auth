import fs from 'fs';
import path from 'path';

const basePath = path.resolve(process.cwd(), 'src/infra/security/keys');

export const publicKey = fs.readFileSync(path.join(basePath, 'public.pem'));

export const privateKey = fs.readFileSync(path.join(basePath, 'private.pem'));
