import Redis from 'ioredis';

const redis = new Redis(process.env['REDIS_URL'] || 'redis://localhost:6379');
console.log(process.env['REDIS_URL']);

export default redis;
