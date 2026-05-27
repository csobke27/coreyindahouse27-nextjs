import {defineField, defineType} from 'sanity'

export const dbdPerks = defineType({
  name: 'dbdPerk',
  title: 'DBD Perk',
  type: 'document',
  fields: [
    defineField({
      name: 'perkName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
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
      name: 'character',
      type: 'reference',
      to: [{type: 'dbdCharacter'}],
    //   validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'perkImage',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
