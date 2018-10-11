import * as express from 'express'
import * as Path from 'path'
import * as Bundler from 'parcel-bundler'

const port = 3184 // pick a non standard port since want to try out service workers (which can be scoped to url)

async function makeParcelBundler() {
  const clientEntryPoint = Path.join(__dirname, '../client/index.html')
  const options = {}
  const bundler = new Bundler(clientEntryPoint, options)   
  return bundler
}

async function start() {
  const app = express()
  const r = express.Router()
  r.use(express.json())
  
  const bundler = await makeParcelBundler()
  r.use('/',bundler.middleware())
  app.use('/',r)

  app.listen(port, () => {
    console.log('app listening on port ' + port)
  })
}

start()