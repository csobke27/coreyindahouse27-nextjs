import {defineField, defineType} from 'sanity'

export const dbdCharacters = defineType({
  name: 'dbdCharacter',
  title: 'DBD Character',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Survivor', value: 'survivor'},
          {title: 'Killer', value: 'killer'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})
