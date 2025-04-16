import express from "express"
import "express-async-errors"
import { erroHandling } from "./middlewares/error-handling"

import { routes } from "./routes"

const app = express()
app.use(express.json())
app.use(erroHandling)

app.use(routes)

export {app}