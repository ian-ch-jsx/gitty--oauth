const pool = require('../utils/pool');

module.exports = class Post {
  id;
  post;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.post = row.post;
    this.createdAt = row.created_at;
  }

  static async insert({ post }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            posts (post)
        VALUES
            ($1)
        RETURNING
            *
          `,
      [post]
    );

    return new Post(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            posts
          `
    );

    return rows.map((row) => new Post(row));
  }
};
