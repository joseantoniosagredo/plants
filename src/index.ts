import * as express from 'express'
import routerApiRest from './routers/apiRest'
import fileRoute from './routers/file'
var path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')))
app.get('/', (req, res) => res.send('Hello Word'))

app.use(fileRoute)
app.use('/api/rest', routerApiRest)
app.use('/api/rest', routerApiRest.publishUiTree())
app.listen(80, () => {
    console.log('Start aplication')
})