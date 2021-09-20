CREATE TABLE IF NOT EXISTS reviews (
    id serial NOT NULL PRIMARY KEY,
    star_count numeric(2, 1) NOT NULL,
    review_text text NOT NULL
);

