import {defineField, defineType} from 'sanity'

export const gameExtensionGames = defineType({
  name: 'gameExtensionGames',
  title: 'Game Extension Games',
  type: 'document',
  fields: [
    defineField({
      name: 'gameName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gameCoverImage',
      type: 'image',
      validation: (rule) => rule.required(),
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
      title: 'gameName',
      media: 'gameCoverImage',
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
