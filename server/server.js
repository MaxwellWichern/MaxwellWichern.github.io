import Express from 'express'
import gameRouter from './serverAPI/Routing.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const modifiedPath = __filename.substring(0,__filename.lastIndexOf('\server'))
const __dirname = path.dirname(modifiedPath)

const app = new Express()

// Create a universal route
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// final static route
app.use(Express.static(path.join(__dirname, 'public')))

app.use('/data',gameRouter )
//app.use('/components', Express.static(path.join(__dirname, 'client', 'components')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start listen
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
