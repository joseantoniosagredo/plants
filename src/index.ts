import * as express from 'express'
var path = require('path')
import routerApiRest from './routers/apiRest'
const app = express()
app.use(express.static(path.join(__dirname, '..','frontend', 'public')))
app.get('/', (req, res) => res.send('Hello Word'))
app.use('/api/rest', routerApiRest)
app.listen(80, () => {
    console.log('Start aplication')
})