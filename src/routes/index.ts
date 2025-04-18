import { app } from '../server'
import UserRoutes from './home'

export default async function routes() {
  app.register(UserRoutes)
}
