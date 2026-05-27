import {defineArrayMember, defineType, defineField} from 'sanity'
import {set, PatchEvent} from 'sanity'
import type {Link} from '../../../sanity.types'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'linkType',
                title: 'Link Type',
                type: 'string',
                initialValue: 'href',
                options: {
                  list: [
                    {title: 'URL', value: 'href'},
                    {title: 'Page', value: 'page'},
                    {title: 'Post', value: 'post'},
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as Link
                    if (parent?.linkType === 'href' && !value) {
                      return 'URL is required when Link Type is URL'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'page',
                title: 'Page',
                type: 'reference',
                to: [{type: 'page'}],
                hidden: ({parent}) => parent?.linkType !== 'page',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as Link
                    if (parent?.linkType === 'page' && !value) {
                      return 'Page reference is required when Link Type is Page'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'post',
                title: 'Post',
                type: 'reference',
                to: [{type: 'post'}],
                hidden: ({parent}) => parent?.linkType !== 'post',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as Link
                    if (parent?.linkType === 'post' && !value) {
                      return 'Post reference is required when Link Type is Post'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          },
          {
            name: 'textColor',
            type: 'object',
            title: 'Text Color',
            fields: [
              defineField({
                name: 'hex',
                title: 'Color',
                type: 'string',
                initialValue: '#ffffff',
                components: {
                  input: (props) => {
                    const presetColors = [
                      {title: 'White', value: '#ffffff'},
                      {title: 'Orange', value: '#ff6900'},
                      {title: 'Green', value: '#00d084'}
                    ]

                    const selectedColor = typeof props.value === 'string' ? props.value : '#ffffff'

                    return (
                      <div style={{display: 'grid', gap: 8}}>
                        <select
                          value={selectedColor}
                          onChange={(e) => props.onChange?.(PatchEvent.from(set(e.target.value)))}
                          style={{width: '100%', padding: '8px 10px'}}
                        >
                          {presetColors.map((color) => (
                            <option key={color.value} value={color.value}>
                              {color.title}
                            </option>
                          ))}
                        </select>
                        <input
                          type="color"
                          value={selectedColor}
                          onChange={(e) => props.onChange?.(PatchEvent.from(set(e.target.value)))}
                          style={{width: '100%', height: 40, cursor: 'pointer', border: 'none', padding: 0, background: 'none'}}
                        />
                        <p style={{marginTop: 4, fontSize: 12, color: '#888'}}>{props.value ?? 'No color selected'}</p>
                      </div>
                    )
                  },
                },
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
