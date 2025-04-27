import app from '@adonisjs/core/services/app'
import edge from 'edge.js'
import env from '#start/env'

edge.global('app', {
  inDev: app.inDev,
  inProduction: app.inProduction,
})
edge.global('env', env)

