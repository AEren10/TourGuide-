-- Insert Categories
INSERT INTO categories (name, icon) VALUES
  ('Cultural', 'library'),
  ('Food', 'restaurant'),
  ('Nature', 'leaf'),
  ('Adventure', 'fitness');

-- Insert Tours
INSERT INTO tours (id, title, description, image_url, duration, distance, difficulty, price, rating, category_id, badge)
SELECT
  'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d'::uuid,
  'Discover Kyoto''s Hidden Alleys',
  'Immerse yourself in the ancient whispers of Gion and find peace away from the crowds. Walk through traditional streets, visit hidden temples, and experience authentic tea ceremonies.',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
  180,
  5.2,
  'easy',
  29.99,
  4.8,
  (SELECT id FROM categories WHERE name = 'Cultural'),
  'Daily Pick'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d'::uuid);

INSERT INTO tours (id, title, description, image_url, duration, distance, difficulty, price, rating, category_id, badge)
SELECT
  'b2c3d4e5-f6a7-4b5c-8d7e-9f0a1b2c3d4e'::uuid,
  'Tokyo After Dark',
  'Experience the neon-lit streets and bustling nightlife of Shibuya and Shinjuku. Discover hidden izakayas, karaoke bars, and the best late-night ramen spots.',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
  240,
  8.5,
  'moderate',
  39.99,
  4.9,
  (SELECT id FROM categories WHERE name = 'Adventure'),
  'Popular'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 'b2c3d4e5-f6a7-4b5c-8d7e-9f0a1b2c3d4e'::uuid);

INSERT INTO tours (id, title, description, image_url, duration, distance, difficulty, price, rating, category_id, badge)
SELECT
  'c3d4e5f6-a7b8-4c5d-8e7f-9a0b1c2d3e4f'::uuid,
  'Osaka Food Paradise',
  'Taste your way through Dotonbori''s incredible street food scene and local delicacies. Try takoyaki, okonomiyaki, kushikatsu, and more from the best vendors.',
  'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800',
  210,
  6.3,
  'easy',
  34.99,
  4.7,
  (SELECT id FROM categories WHERE name = 'Food'),
  'Trending'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 'c3d4e5f6-a7b8-4c5d-8e7f-9a0b1c2d3e4f'::uuid);

INSERT INTO tours (id, title, description, image_url, duration, distance, difficulty, price, rating, category_id, badge)
SELECT
  'd4e5f6a7-b8c9-4d5e-8f7a-9b0c1d2e3f4a'::uuid,
  'Mount Fuji Adventure',
  'Journey to Japan''s most iconic mountain and explore the stunning surrounding lakes. Visit Chureito Pagoda, Lake Kawaguchi, and capture breathtaking views.',
  'https://images.unsplash.com/photo-1576677612481-52d6f44c5f54?w=800',
  480,
  45.0,
  'hard',
  79.99,
  4.9,
  (SELECT id FROM categories WHERE name = 'Nature'),
  'New'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 'd4e5f6a7-b8c9-4d5e-8f7a-9b0c1d2e3f4a'::uuid);

-- Insert Stops for Kyoto Tour
INSERT INTO stops (tour_id, name, description, latitude, longitude, order_index, duration) VALUES
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'Yasaka Shrine', 'Historic Shinto shrine at the heart of Gion district', 35.003674, 135.778450, 1, 30),
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'Hanami-koji Street', 'Traditional geisha district with wooden machiya houses', 35.002742, 135.776516, 2, 45),
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'Kodai-ji Temple', 'Beautiful zen temple with stunning gardens', 35.000058, 135.781483, 3, 60),
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'Ninenzaka & Sannenzaka', 'Preserved historic streets with traditional shops', 34.996799, 135.780167, 4, 45);

-- Insert Stops for Tokyo Tour
INSERT INTO stops (tour_id, name, description, latitude, longitude, order_index, duration) VALUES
  ('b2c3d4e5-f6a7-4b5c-8d7e-9f0a1b2c3d4e', 'Shibuya Crossing', 'World''s busiest pedestrian crossing', 35.659517, 139.700454, 1, 30),
  ('b2c3d4e5-f6a7-4b5c-8d7e-9f0a1b2c3d4e', 'Shinjuku Omoide Yokocho', 'Narrow alley filled with tiny izakayas', 35.694389, 139.700336, 2, 90),
  ('b2c3d4e5-f6a7-4b5c-8d7e-9f0a1b2c3d4e', 'Kabukicho', 'Tokyo''s entertainment and red-light district', 35.694508, 139.701965, 3, 60),
  ('b2c3d4e5-f6a7-4b5c-8d7e-9f0a1b2c3d4e', 'Golden Gai', 'Collection of over 200 tiny bars', 35.694611, 139.704056, 4, 60);

-- Insert Stops for Osaka Tour
INSERT INTO stops (tour_id, name, description, latitude, longitude, order_index, duration) VALUES
  ('c3d4e5f6-a7b8-4c5d-8e7f-9a0b1c2d3e4f', 'Dotonbori Bridge', 'Iconic neon-lit street food paradise', 34.668579, 135.501389, 1, 45),
  ('c3d4e5f6-a7b8-4c5d-8e7f-9a0b1c2d3e4f', 'Kuromon Market', 'Osaka''s kitchen with fresh seafood and produce', 34.665531, 135.506683, 2, 60),
  ('c3d4e5f6-a7b8-4c5d-8e7f-9a0b1c2d3e4f', 'Hozenji Yokocho', 'Hidden alley with traditional restaurants', 34.667969, 135.503281, 3, 45),
  ('c3d4e5f6-a7b8-4c5d-8e7f-9a0b1c2d3e4f', 'Shinsekai', 'Retro district famous for kushikatsu', 34.652500, 135.506389, 4, 60);

-- Insert Stops for Mount Fuji Tour
INSERT INTO stops (tour_id, name, description, latitude, longitude, order_index, duration) VALUES
  ('d4e5f6a7-b8c9-4d5e-8f7a-9b0c1d2e3f4a', 'Chureito Pagoda', 'Five-storied pagoda with Mt. Fuji view', 35.500278, 138.791667, 1, 60),
  ('d4e5f6a7-b8c9-4d5e-8f7a-9b0c1d2e3f4a', 'Lake Kawaguchi', 'One of the Fuji Five Lakes with stunning reflections', 35.509722, 138.763611, 2, 120),
  ('d4e5f6a7-b8c9-4d5e-8f7a-9b0c1d2e3f4a', 'Oshino Hakkai', 'Eight spring-fed ponds with crystal clear water', 35.458611, 138.844444, 3, 90),
  ('d4e5f6a7-b8c9-4d5e-8f7a-9b0c1d2e3f4a', 'Arakurayama Sengen Park', 'Best cherry blossom viewing spot', 35.498889, 138.793611, 4, 90);
