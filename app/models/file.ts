import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@adonisjs/lucid/orm'

import { attachment, attachments } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'

export default class File extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @attachment({
    folder: () => `images/:id/${DateTime.now().toFormat('yyyy/MM')}`,
    variants: ['thumbnail'],
    preComputeUrl: true,
    serialize: (value?: Attachment) => value?.url ?? null
  })
  declare image: Attachment | null

  @attachment({
    folder: `pdf/:id`,
    variants: ['pdf']
  })
  declare pdf: Attachment | null

  @attachment({
    folder: () => `documents/${DateTime.now().toFormat('yyyy/MM')}`,
    variants: ['document'],
    preComputeUrl: true,
    serializeAs: 'doc',
    serialize: (value?: Attachment) => value?.url ?? null
  })
  declare document: Attachment | null

  @attachment({
    variants: ['video']
  })
  declare video: Attachment | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Hooks

  @beforeCreate()
  static assignUuid(file: File) {
    file.id = crypto.randomUUID()
  }
}
