
const config = {

  //database on localhost
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'tooltrackingdb',
  connectionLimit: 10,

  statusCode: { notExist: "NE", exist: "AE", notMatch: "NM", match: "M", inserted: "I", notInserted: "NI", error: "E", success: true, "failed": true }
}

module.exports = config

