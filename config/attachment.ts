import { defineConfig } from '@jrmc/adonis-attachment'
import { InferConverters } from '@jrmc/adonis-attachment/types/config'

const attachmentConfig = defineConfig({
  converters: {
    thumbnail: {
      converter: () => import('@jrmc/adonis-attachment/converters/image_converter'),
      options: {
        resize: 300,
        format: 'webp',
        blurhash: {
          enabled: true,
          componentX: 4,
          componentY: 4
        }
      },
    },

    pdf: {
      converter: () => import('@jrmc/adonis-attachment/converters/pdf_thumbnail_converter'),
      options: {
        resize: 300,
        format: 'webp'
      },
    },

    document: {
      converter: () => import('@jrmc/adonis-attachment/converters/document_thumbnail_converter'),
      options: {
        resize: 300,
        format: 'webp'
      },
    },

    video: {
      converter: () => import('@jrmc/adonis-attachment/converters/video_thumbnail_converter'),
      options: {
        resize: 300,
        format: 'webp'
      },
    },
  }
})

export default attachmentConfig

declare module '@jrmc/adonis-attachment' {
  interface AttachmentVariants extends InferConverters<typeof attachmentConfig> {}
}
