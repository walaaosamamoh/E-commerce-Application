import { Model, hasMany, belongsTo } from 'miragejs';

export const models = {
  user: Model,
    // Define the user model with its attributes
  category: Model.extend({
    products: hasMany(),
  }),
  product: Model.extend({
    category: belongsTo(),
    comments: hasMany(),
  }),
  comment: Model.extend({
    product: belongsTo(),
    user: belongsTo(),
  }),
};




/**
 * 
 * 
 * 
users-> posts-> commnets 

users has many posts
id
namme
email

posts 
id 
title
content
userId

comments
id
text
userId
postId


user has many posts
post belongs to user


posts has many comments
comment belongs to post
user has many comments
comment belongs to user



hasOne 

student hasOne card 
card belongs to student



posts tags [progrmaing languages tags]


 posts belongsToMany tags
tag hasMany posts



 */
