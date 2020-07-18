import 'reflect-metadata'
import { createConnection } from 'typeorm'

import app from './app'

const PORT = process.env.PORT || 3333

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log('Running on port ' + PORT)
  })
})
