export const environment = {
  production: true,
  server: {
    host: 'http://localhost',
    port: '8080'
  },
  context: '/sismed',
  api: {
    user: '/user',
    signature: '/signature',
    login: '/auth/login',
    file: '/file/upload',
    fileGet: '/file',
    register: '/auth/register',
    download: '/file/download',
    error: '/errors',
    report: '/file/report'
  }
};
