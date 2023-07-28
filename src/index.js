import server from './app.js'
import dbconection from './database/conection.js'
import findAvailablePort from './libs/freePort.js'

async function main () {
  try {
    await dbconection()
    console.log(`Environment: ${process.env.NODE_ENV}`)
    findAvailablePort(process.env.PORT).then(port => {
      server.listen(port, () => {
        console.log(`server listening on port: http://localhost:${port}`)
      })
    })
  } catch (error) {
    console.error(error)
  }
}

main()
