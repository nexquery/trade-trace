try{process.loadEnvFile('.env');}catch(error){if(error.code!=='ENOENT')throw error;}
process.env.NODE_ENV='production';
await import('./server.js');
