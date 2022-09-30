'use strict';

module.exports = plugin => {
  // Get current `MenuItem` attributes.
  const defaultAttrs = plugin.contentTypes[ 'menu-item' ].schema.attributes;

  // Define custom attributes for `MenuItem` the same way they would be defined
  // on any other schema.
  const customAttrs = {
    example_bool: {
      type: 'boolean',
    },
    example_text: {
      type: 'string',
    },
    example_email: {
      type: 'email',
    },
    example_password: {
      type: 'password',
    },
    example_richtext: {
      type: 'richtext',
    },
    example_date: {
      type: 'date',
    },
    example_time: {
      type: 'time',
    },
    example_datetime: {
      type: 'datetime',
    },
    example_integer: {
      type: 'integer',
    },
    example_biginteger: {
      type: 'biginteger',
    },
    example_decimal: {
      type: 'decimal',
    },
    example_float: {
      type: 'float',
    },
    example_enum: {
      type: 'enumeration',
      enum: [
        'option1',
        'option2',
        'option3',
      ],
    },
    example_media: {
      type: 'media',
      allowedTypes: [ 'images' ],
      multiple: false,
    }/*,
    example_relation_one: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'api::example-one.example-one',
    },
    example_relation_many: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::example-many.example-many',
    },*/
  };

  // Extend the `MenuItem` content type with custom attributes.
  plugin.contentTypes[ 'menu-item' ].schema.attributes = {
    ...defaultAttrs,
    ...customAttrs,
  };

  return plugin;
};