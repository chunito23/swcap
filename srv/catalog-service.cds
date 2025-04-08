using { com.starwars as starwars } from '../db/schema';

service CatalogService {
  entity Categories as projection on starwars.Categories;
  entity Subcategories as projection on starwars.Subcategories;
  entity Products as projection on starwars.Products;
  entity ProductDetails as projection on starwars.ProductDetails;
  entity ProductTags as projection on starwars.ProductTags;
  entity ProductVariants as projection on starwars.ProductVariants;


  @requires: 'authenticated-user'
  entity Cart as projection on starwars.Cart;
  
  // Acciones para el carrito
  action addToCart(productId: String, variantId: String, quantity: Integer) returns Cart;
  action updateCartItem(cartItemId: UUID, quantity: Integer) returns Cart;
  action removeFromCart(cartItemId: UUID) returns Boolean;
  function getCart() returns array of Cart;
}