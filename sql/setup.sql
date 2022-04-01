DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  username TEXT NOT NULL PRIMARY KEY,
  email TEXT,
  avatar TEXT
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username TEXT REFERENCES github_users(username)
);

INSERT INTO
    posts (post)
VALUES
    ('I wish I could have, like, 400 kittens.'),
    ('We only have one more week of instruction and Im gonna vomit!'),
    ('Dont get excited, Trump, youre preemtively banned here, too');