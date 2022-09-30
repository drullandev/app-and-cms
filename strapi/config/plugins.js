module.exports = {
  menus: {
    config: {
      maxDepth: 3,
      layouts: {
        menuItem: {
          link: [
            {
              input: {
                label: 'Boolean',
                name: 'example_bool',
                type: 'bool',
              },
              grid: {
                col: 6,
              },
            },
          ],
          text: [
            {
              input: {
                label: 'Text',
                name: 'example_text',
                type: 'text',
              },
            },
            {
              input: {
                label: 'Email',
                name: 'example_email',
                type: 'email',
              },
            },
            {
              input: {
                label: 'Password',
                name: 'example_password',
                type: 'password',
              },
            },
            {
              input: {
                label: 'Rich Text',
                name: 'example_richtext',
                type: 'wysiwyg',
                description: 'This field type is not supported unless a custom plugin overrides the core WYSIWYG editor.',
              },
            },
          ],
          date: [
            {
              input: {
                label: 'Date',
                name: 'example_date',
                type: 'date',
              },
              grid: {
                col: 6,
              },
            },
            {
              input: {
                label: 'Time',
                name: 'example_time',
                type: 'time',
              },
              grid: {
                col: 6,
              },
            },
            {
              input: {
                label: 'Date and Time',
                name: 'example_datetime',
                type: 'datetime',
              },
            },
          ],
          number: [
            {
              input: {
                label: 'Integer',
                name: 'example_integer',
                type: 'number',
              },
              grid: {
                col: 6,
              },
            },
            {
              input: {
                label: 'Big Integer',
                name: 'example_biginteger',
                type: 'number',
              },
              grid: {
                col: 6,
              },
            },
            {
              input: {
                label: 'Decimal',
                name: 'example_decimal',
                type: 'number',
              },
              grid: {
                col: 6,
              },
            },
            {
              input: {
                label: 'Float',
                name: 'example_float',
                type: 'number',
              },
              grid: {
                col: 6,
              },
            },
          ],
          media: [
            {
              input: {
                label: 'Media',
                name: 'example_media',
                type: 'media',
              },
            },
          ],
          select: [
            {
              input: {
                label: 'Enumeration',
                name: 'example_enum',
                type: 'select',
                options: [
                  {
                    label: 'Option Label 1',
                    value: 'option1',
                  },
                  {
                    label: 'Option Label 2',
                    value: 'option2',
                  },
                  {
                    label: 'Option Label 3',
                    value: 'option3',
                  },
                ],
              },
            },
            {
              input: {
                label: 'Relation (hasOne)',
                name: 'example_relation_one',
                type: 'relation',
              },
            },
            {
              input: {
                label: 'Relation (hasMany)',
                name: 'example_relation_many',
                type: 'relation',
              },
            },
          ],
        },
      },
    },
  },
};