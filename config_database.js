exports.knexDbConection = {
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5433,
    user : 'postgres',
    password : 'passpg',
    database : 'lambda_db'
  }
}