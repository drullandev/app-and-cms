/**
 * This is the common filter used allways to do a search on the database 
 * - Usefull to use Strapi as a graphql data provider; worth all the available rules :) 
 */
import i18n from 'i18next';

export const GraphQLFilter = {
    order : {
      default: 'desc',
      options: [ 
        {
          label: i18n.t('Descendant'),
          value: 'desc'
        },{
          label: i18n.t('Ascendant'),
          value: 'asc',
        }
      ]
    },
    fields: {
      default: 'published_at',
      options: [
        {
          label: i18n.t('Published at'),
          value: 'published_at',
          type: 'date'
        },{
          label: i18n.t('Created at'),
          value: 'created_at',
          type: 'date'
        },{
          label: i18n.t('Updated at'),
          value: 'updated_at',
          type: 'date'
        },{
          label: i18n.t('Content'),
          value: 'content',
          type: 'string'
        }
      ]    
    },
    conditions: {
      default: 'contains',
      options: [
        {
          label: i18n.t('Distinct'),
          value: 'ne',
          families: ['all']
        },
        {
          label: i18n.t('Lower than'),
          value: 'lt',
          families: ['all']
        },
        {
          label: i18n.t('Lower or equal'),
          value: 'lte',
          families: ['all']
        },
        {
          label: i18n.t('Greater than'),
          value: 'gt',
          families: ['all']
        },
        {
          label: i18n.t('Greater or equal'),
          value: 'gte',
          families: ['all']
        },
        {
          label: i18n.t('Contains'),
          value: 'contains',
          families: ['all']
        },
        {
          label: i18n.t('Contains sensitive'),
          value: 'containss',
          families: ['all']
        },
        {
          label: i18n.t('No Contains'),
          value: 'ncontains',
          families: ['all']
        },
        {
          label: i18n.t('No Contains sensitive'),
          value: 'ncontainss',
          families: ['all']
        },
        {
          label:i18n.t('In'),
          value: 'in',
          families: ['array']
        },
        {
          label: i18n.t('Not in'),
          value: 'nin',
          families: ['array'] 
        },
        {
          label: i18n.t('Equals null'),
          value: 'null',
          families: []
        },
        {
          label: i18n.t('Not equals null'),
          value: 'nnull',
          families: []
        }
      ]
    }
  }