// Import everything from basic and advanced components
import * as Basic from './basic';
import * as Advanced from './advanced';

// Export all components for a full set using manual merging
export const AllComponents = {
  ...Basic,
  ...Advanced,
};

/**
 *
 * 
 * import { AllComponents } from './path/to/all';
 * const { Page, ActionSheet } = AllComponents;
 * 
 * - OR DIRECTLY
 *
 * import { Page, ActionSheet } from './path/to/all';
 */