import {defineField, defineType} from 'sanity'

export const category = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
    defineField({
        name: 'CategoryName',
        title: 'Category Name',
        type: 'string',
    validation: (rule) => rule.required(),
    })
  ],
})
