DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
email TEXT NOT NULL,
password_hash TEXT NOT NULL,
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
    post VARCHAR(255)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO
    posts (post)
VALUES
    ('I wish I could have, like, 400 kittens.'),
    (`We only have one more week of instruction and I'm gonna vomit!`),
    (`Don't get excited, Trump, you're preemtively banned here, too`);