import {defineField, defineType} from 'sanity'

export const gameExtensions = defineType({
  name: 'gameExtension',
  title: 'Game Extensions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'game',
      type: 'reference',
      to: [{type: 'gameExtensionGames'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'blockContent',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'note',
        title: 'Note',
        type: 'string',
    }),
    defineField({
        name: 'route',
        title: 'Route',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
