import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import File from '../models/file.js'

import { attachmentManager, RegenerateService } from '@jrmc/adonis-attachment'

export default class HomeController {

  async index({ view }: HttpContext) {
    const file = await File.first()

    return view.render('pages/home', {
      file
    })
  }

  async update({ request, response }: HttpContext) {
    const file = await File.first()

    const image = request.file('image')
    const pdf = request.file('pdf')
    const document = request.file('document')
    const video = request.file('video')

    if (file) {
      if (image) {
        file.image = await attachmentManager.createFromFile(image)
      }
      if (pdf) {
        file.pdf = await attachmentManager.createFromFile(pdf)
      }
      if (document) {
        file.document = await attachmentManager.createFromFile(document)
      }
      if (video) {
        file.video = await attachmentManager.createFromFile(video)
      }

      await file.save()
    }

    response.redirect().toRoute('home')
  }

  @inject()
  async destroy({ response }: HttpContext, regenerate: RegenerateService) {
    const file = await File.first()

    if (file) {

      file.image = null
      file.pdf = null
      file.document = null
      file.video = null
      await file.save()
      // await regenerate.row(file, {
      //   variants: [ 'thumbnail' ],
      //   attributes: [ 'image', 'pdf', 'document', 'video' ]
      // }).run()
    }

    response.redirect().toRoute('home')
  }
}
