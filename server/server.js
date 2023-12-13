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

//add the gameRouter to express
app.use('/data',gameRouter)

//everything else should get res.sendFile
//I should take in the path and send/resend as /, thereby loading the page, then passing 'PasswordReset?key=###' or others
// as a internal variable to the client-side routing
app.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start listen
app.listen(process.env.PORT || 3000, () => {
  console.log('Server started at http://localhost:3000')
})
