CREATE DATABASE collections_db;

CREATE TYPE roleType AS ENUM ('admin', 'user');
CREATE TYPE statusType AS ENUM ('blocked', 'active');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  role roleType,
  status statusType
);

CREATE TABLE collections(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  user_id INT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  category VARCHAR(255)
);

CREATE TYPE fieldType AS ENUM ('boolean', 'string', 'number', 'text', 'date');

CREATE TABLE custom_fields(
  id SERIAL PRIMARY KEY,
  collection_id INT REFERENCES collections(id) ON DELETE CASCADE ON UPDATE CASCADE,
  type fieldType,
  name VARCHAR(255),
  state VARCHAR(255)
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE
);

CREATE TABLE collection_items(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  collection_id INT REFERENCES collections(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE likes(
  id SERIAL PRIMARY KEY,
  item_id INT REFERENCES collection_items(id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  text TEXT,
  item_id INT REFERENCES collection_items(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE collection_item_tags (
    collection_item_id INT REFERENCES collection_items(id) ON DELETE CASCADE ON UPDATE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (collection_item_id, tag_id)
);

CREATE TABLE collection_item_custom_fields(
  value TEXT,
  collection_item_id INT REFERENCES collection_items(id) ON DELETE CASCADE ON UPDATE CASCADE,
  custom_field_id INT REFERENCES custom_fields(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (collection_item_id, custom_field_id)
);

-- SELECT collection_items.name, tags.name
-- FROM collection_items
-- JOIN collection_item_tags ON collection_items.id = collection_item_tags.collection_item_id
-- JOIN tags ON collection_item_tags.tag_id = tags.id;



-- SELECT ci.name AS collection_item_name,
--        cf.name AS custom_field_name,
--        cif.value AS custom_field_value
-- FROM collection_items ci
-- JOIN collection_item_custom_fields cif ON ci.id = cif.collection_item_id
-- JOIN custom_fields cf ON cif.custom_field_id = cf.id
-- WHERE ci.collection_id = 15;
