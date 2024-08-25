import type { Schema, Attribute } from '@strapi/strapi';

export interface RowTypeSection extends Schema.Component {
  collectionName: 'components_row_type_sections';
  info: {
    displayName: 'section';
    icon: 'align-justify';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface RowTypeMenu extends Schema.Component {
  collectionName: 'components_row_type_menus';
  info: {
    displayName: 'menu';
    icon: 'align-center';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    icon: Attribute.Relation<
      'row-type.menu',
      'oneToOne',
      'api::ionicon.ionicon'
    >;
    menus: Attribute.Relation<'row-type.menu', 'oneToMany', 'api::menu.menu'>;
    extra: Attribute.JSON;
    access: Attribute.Relation<
      'row-type.menu',
      'oneToOne',
      'api::access.access'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'row-type.section': RowTypeSection;
      'row-type.menu': RowTypeMenu;
    }
  }
}
