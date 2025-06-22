import { createServer } from 'miragejs';
import { models } from './mirage/models';
import { seeds } from './mirage/seeds';
import { routes } from './mirage/routes';

export function makeServer() {
  return createServer({
    models,
    seeds,
    routes,
  });
}
