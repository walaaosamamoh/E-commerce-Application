import { faker } from '@faker-js/faker';

export function seeds(server) {
  // Users
  //default admin and test user
  server.create('user', {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: faker.image.avatar(),
    roleID: 'admin',
  });
  server.create('user', {
    id: '2',
    name: 'Test User',
    email: 'user@example.com',
    avatar: faker.image.avatar(),
    roleID: 'user',
  });
// Create additional users
  // Create 8 more users with unique IDs from 3 to 10

  for (let i = 3; i <= 10; i++) {
    server.create('user', {
      id: String(i),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      roleID: 'user',
    });
  }

  // Categories
const categories = [
  server.create('category', { id: 1, name: 'Men' }),
  server.create('category', { id: 2, name: 'Women' }),
  server.create('category', { id: 3, name: 'Kids' }),
  // server.create('category', { id: 4, name: 'Perfume' }),
  // server.create('category', { id: 5, name: 'Shirts' }),
  // server.create('category', { id: 6, name: 'T-Shirts' }),
  // server.create('category', { id: 7, name: 'Shoes' }),
];

  // Products
  const products = [];
  for (let i = 1; i <= 10; i++) {
    products.push(server.create('product', {
      id: String(i),
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
      description: faker.lorem.paragraph(2),
      image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
      category: categories[i % categories.length],
    }));
  }

  // Comments
  for (let i = 1; i <= 20; i++) {
    server.create('comment', {
      id: String(i),
      text: faker.lorem.sentence(),
      product: products[i % products.length],
      user: server.schema.users.find(String((i % 10) + 1)),
    });
  }
}



