import { createServer } from 'miragejs';
import { models } from './mirage/models';
import { seeds } from './mirage/seeds';
import { routes } from './mirage/routes';

export function makeServer() {
  console.log('MirageJS server starting...');
  return createServer({
    models,
    seeds,
    routes(){
      this.passthrough([
        'https://identitytoolkit.googleapis.com/**',
        'https://securetoken.googleapis.com/**',
        'https://e-commerce-a83c7.firebaseapp.com/**',
        'https://e-commerce-a83c7.firebaseio.com/**',
        'https://firestore.googleapis.com/**',
      ]);

      routes.call(this);
    },
    trackRequests: true
  });
}
