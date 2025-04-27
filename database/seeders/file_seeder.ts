
import { BaseSeeder } from '@adonisjs/lucid/seeders'

import File from '../../app/models/file.js'

export default class extends BaseSeeder {
  async run() {
    await File.create()
  }
}
