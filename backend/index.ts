// pool.query('DELETE FROM users WHERE email = $1', ['ivanushka@gmail.com']);
// pool.query('DELETE FROM users WHERE email = $1', [
//   'alexeiisgrogrammer@gmail.com',
// ]);
// pool.query('DELETE FROM users WHERE email = $1', ['V1ADD@mail.ru']);

// pool.query(
//   "INSERT INTO users (name, email, password, role, status) VALUES($1, $2, $3, 'user', 'active') RETURNING *",
//   ['Ivan', 'ivanushka@gmail.com', 'qwerty12345'],
// );
// pool.query(
//   "INSERT INTO users (name, email, password, role, status) VALUES($1, $2, $3, 'admin', 'blocked') RETURNING *",
//   ['Alex', 'alexeiisgrogrammer@gmail.com', 'Aboba2000'],
// );
// pool.query(
//   "INSERT INTO users (name, email, password, role, status) VALUES($1, $2, $3, 'admin', 'active') RETURNING *",
//   ['Vlad', 'V1ADD@mail.ru', 'chips'],
// );
