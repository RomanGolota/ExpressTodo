import makeApp from './app.js'
import DB from './database.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

const app = makeApp()

app.listen(PORT,  async () => {
    await DB()
    console.log(`Server running on port ${PORT}`);
})