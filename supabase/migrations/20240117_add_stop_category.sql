-- Add category column to stops table
ALTER TABLE stops
ADD COLUMN category TEXT;

-- Update existing stops with appropriate categories based on their tour
-- Kyoto stops (Cultural tour) -> landmark, historical
UPDATE stops SET category = 'landmark' WHERE name = 'Yasaka Shrine';
UPDATE stops SET category = 'historical' WHERE name = 'Hanami-koji Street';
UPDATE stops SET category = 'cultural' WHERE name = 'Kodai-ji Temple';
UPDATE stops SET category = 'historical' WHERE name = 'Ninenzaka & Sannenzaka';

-- Tokyo stops (Adventure tour) -> cultural, restaurant, viewpoint
UPDATE stops SET category = 'viewpoint' WHERE name = 'Shibuya Crossing';
UPDATE stops SET category = 'restaurant' WHERE name = 'Shinjuku Omoide Yokocho';
UPDATE stops SET category = 'cultural' WHERE name = 'Kabukicho';
UPDATE stops SET category = 'restaurant' WHERE name = 'Golden Gai';

-- Osaka stops (Food tour) -> restaurant
UPDATE stops SET category = 'restaurant' WHERE name = 'Dotonbori Bridge';
UPDATE stops SET category = 'restaurant' WHERE name = 'Kuromon Market';
UPDATE stops SET category = 'restaurant' WHERE name = 'Hozenji Yokocho';
UPDATE stops SET category = 'restaurant' WHERE name = 'Shinsekai';

-- Mount Fuji stops (Nature tour) -> viewpoint, park
UPDATE stops SET category = 'viewpoint' WHERE name = 'Chureito Pagoda';
UPDATE stops SET category = 'park' WHERE name = 'Lake Kawaguchi';
UPDATE stops SET category = 'park' WHERE name = 'Oshino Hakkai';
UPDATE stops SET category = 'viewpoint' WHERE name = 'Arakurayama Sengen Park';

-- Add constraint for valid categories
ALTER TABLE stops
ADD CONSTRAINT stops_category_check
CHECK (category IN ('landmark', 'museum', 'park', 'restaurant', 'viewpoint', 'historical', 'cultural'));
