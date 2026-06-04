import {ImagesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const carouselSlide = defineType({
  name: 'carouselSlide',
  title: 'Carousel Slide',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'body',
        title: 'Body',
        type: 'blockContent'
    }),
    defineField({
        name: 'url',
        title: 'URL',
        type: 'object',
        fields: [
            defineField({
                name: 'current',
                title: 'Current',
                type: 'slug',
            }),
            defineField({
                name: 'buttonText',
                title: 'Button Text',
                type: 'string',
            })
        ]
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Is active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({title, media, order, isActive}) {
      return {
        title,
        media,
        subtitle: `Order: ${order ?? 0} ${isActive === false ? '(inactive)' : ''}`,
      }
    },
  },
})
