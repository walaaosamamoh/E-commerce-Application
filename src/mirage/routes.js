export function routes() {
  this.namespace = 'api';

  // Users (read-only)
  this.get('/users', (schema) => schema.users.all());
  this.get('/users/:id', (schema, request) => schema.users.find(request.params.id));

  // Categories CRUD
  this.get('/categories', (schema) => schema.categories.all()); // Get all categories
  this.get('/categories/:id', (schema, request) => schema.categories.find(request.params.id)); // Get a specific category by ID
  this.post('/categories', (schema, request) => schema.categories.create(JSON.parse(request.requestBody)));// Create a new category no need to add for now
  this.put('/categories/:id', (schema, request) => { // Update a specific category by ID no need to add for now
    let attrs = JSON.parse(request.requestBody);
    let category = schema.categories.find(request.params.id);
    return category.update(attrs);
  });
  this.del('/categories/:id', (schema, request) => schema.categories.find(request.params.id).destroy()); // Delete a specific category by ID no need to add for now

  // Products CRUD
  this.get('/products', (schema) => schema.products.all()); // Get all products
  this.get('/products/:id', (schema, request) => schema.products.find(request.params.id)); // Get a specific product by ID
  this.post('/products', (schema, request) => schema.products.create(JSON.parse(request.requestBody))); // Create a new product
  this.put('/products/:id', (schema, request) => { // Update a specific product by ID
    let attrs = JSON.parse(request.requestBody);
    let product = schema.products.find(request.params.id);
    return product.update(attrs);
  });
  this.del('/products/:id', (schema, request) => schema.products.find(request.params.id).destroy()); // Delete a specific product by ID

  // Comments CRUD
  this.get('/comments', (schema) => schema.comments.all()); // Get all comments
  this.get('/comments/:id', (schema, request) => schema.comments.find(request.params.id)); // Get a specific comment by ID no need to add for now
  this.post('/comments', (schema, request) => schema.comments.create(JSON.parse(request.requestBody))); // Create a new comment
  this.put('/comments/:id', (schema, request) => { // Update a specific comment by ID as you like
    let attrs = JSON.parse(request.requestBody);
    let comment = schema.comments.find(request.params.id);
    return comment.update(attrs);
  });
  this.del('/comments/:id', (schema, request) => schema.comments.find(request.params.id).destroy()); // Delete a specific comment by ID as you like

  // Category products
  this.get('/categories/:id/products', (schema, request) => {
    let category = schema.categories.find(request.params.id);
    return category.products;
  });


  // Product comments
  this.get('/products/:id/comments', (schema, request) => {
    let product = schema.products.find(request.params.id);
    return product.comments;
  });
}
