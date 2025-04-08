namespace com.starwars;

entity Categories {
  key id     : String;
  name       : String;
  subcategories : Association to many Subcategories on subcategories.category = $self;
}

entity Subcategories {
  key id     : String;
  name       : String;
  category   : Association to one Categories;
  products   : Association to many Products on products.subcategory = $self;
}

entity Products {
  key id     : String;
  name       : String;
  price      : Decimal(10,2);
  currency   : String;
  description : String;
  image      : String;
  stock      : Integer;
  rating     : Decimal(2,1);
  subcategory : Association to one Subcategories;
  details    : Association to one ProductDetails on details.product = $self;
  tags       : Association to many ProductTags on tags.product = $self;
  variants   : Association to many ProductVariants on variants.product = $self;
}

entity ProductDetails {
  key product : Association to one Products;
  height     : String;
  length     : String;
  dimensions : String;
  capacity   : String;
  material   : String;
  manufacturer : String;
  weight     : String;
  scale      : String;
}

entity ProductTags {
  key product : Association to one Products;
  key tag    : String;
}

entity ProductVariants {
  key variantId : String;
  product     : Association to one Products;
  color       : String;
  price       : Decimal(10,2);
  stock       : Integer;
}

entity Cart {
  key id     : UUID;
  user       : String;
  product    : Association to one Products;
  variant    : Association to one ProductVariants;
  quantity   : Integer;
  createdAt  : Timestamp;
}