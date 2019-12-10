import * as express from 'express'

const app = express()
app.get('/', (req, res) => res.send('Hello Word'))
app.listen(80, () => {
    console.log('Start aplication')
})