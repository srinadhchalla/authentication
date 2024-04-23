let express = require('express')

let app = express()

let path = require('path')

const {open} = require('sqlite')

const sqlite3 = require('sqlite3')

let dbpath = path.join(__dirname, 'todoApplication.db')

const connectingdbandserver = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`error: ${e.message}`)
    process.exit(1)
  }
}
connectingdbandserver()

app.get('/todos/', async (request, responce) => {
  const {status} = request.query
  console.log(status)
  const dbquery = `
   SELECT 
   * 
   FROM
   todo;
  `
  const dbresponce = await db.all(dbquery)

  responce.send(dbresponce)
})
