import { ComponentProps } from 'react';

// Base for interactive components (buttons, toggles, inputs, etc.)
interface BaseAccessibleInteractiveProps extends Omit<ComponentProps<any>, 'aria-label' | 'role'> {
  ariaLabel?: string;
  role?: string;
  tabIndex?: number;
  ariaPressed?: boolean;
  ariaChecked?: boolean;
  ariaDescribedBy?: string;
}

// Base for visual (decorative) components (icons, images, skeleton texts, etc.)
interface BaseAccessibleVisualProps extends Omit<ComponentProps<any>, 'aria-label' | 'role'> {
  ariaHidden?: boolean;
}

// Base for structural components (headers, footers, content, etc.)
interface BaseAccessibleStructuralProps extends Omit<ComponentProps<any>, 'aria-label' | 'role'> {
  ariaLabel?: string;
  role?: string;
  ariaDescribedBy?: string;
}

// Base for range inputs or progress bars (like sliders, progress bars)
interface BaseAccessibleRangeProps extends Omit<ComponentProps<any>, 'aria-label' | 'role'> {
  ariaValueMin?: number;
  ariaValueMax?: number;
  ariaValueNow?: number;
  ariaValueText?: string;
}

/**
 * Accessible version of IonButton.
 * Enforces accessibility attributes on IonButton.
 */
export interface AccessibleIonButton extends BaseAccessibleInteractiveProps {
  ariaLabel: string;
  ariaPressed?: boolean;
}

/**
 * Accessible version of IonActionSheet.
 * Enforces accessibility attributes on IonActionSheet.
 */
export interface AccessibleIonActionSheet extends BaseAccessibleStructuralProps {
  role?: 'menu' | 'dialog';
}

/**
 * Accessible version of IonInput.
 * Enforces accessibility attributes on IonInput.
 */
export interface AccessibleIonInput extends BaseAccessibleInteractiveProps {
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
}

/**
 * Accessible version of IonModal.
 * Enforces accessibility attributes on IonModal.
 */
export interface AccessibleIonModal extends BaseAccessibleStructuralProps {
  ariaDescribedBy?: string;
}

/**
 * Accessible version of IonSelect.
 * Enforces accessibility attributes on IonSelect.
 */
export interface AccessibleIonSelect extends BaseAccessibleInteractiveProps {
  ariaDescribedBy?: string;
}

/**
 * Accessible version of IonTabBar.
 * Enforces accessibility attributes on IonTabBar.
 */
export interface AccessibleIonTabBar extends BaseAccessibleStructuralProps {
  ariaSelected?: boolean;
}

/**
 * Accessible version of IonRange.
 * Enforces accessibility attributes on IonRange.
 */
export interface AccessibleIonRange extends BaseAccessibleRangeProps {}

/**
 * Accessible version of IonCheckbox.
 * Enforces accessibility attributes on IonCheckbox.
 */
export interface AccessibleIonCheckbox extends BaseAccessibleInteractiveProps {
  ariaChecked: boolean;
}

/**
 * Accessible version of IonAlert.
 * Enforces accessibility attributes on IonAlert.
 */
export interface AccessibleIonAlert extends BaseAccessibleStructuralProps {
  role?: 'alert' | 'status';
}

/**
 * Accessible version of IonToggle.
 * Enforces accessibility attributes on IonToggle.
 */
export interface AccessibleIonToggle extends BaseAccessibleInteractiveProps {
  ariaChecked: boolean;
}

/**
 * Accessible version of IonRadio.
 * Enforces accessibility attributes on IonRadio.
 */
export interface AccessibleIonRadio extends BaseAccessibleInteractiveProps {
  ariaChecked: boolean;
}

/**
 * Accessible version of IonRadioGroup.
 * Enforces accessibility attributes on IonRadioGroup.
 */
export interface AccessibleIonRadioGroup extends BaseAccessibleStructuralProps {}

/**
 * Accessible version of IonTextarea.
 * Enforces accessibility attributes on IonTextarea.
 */
export interface AccessibleIonTextarea extends BaseAccessibleInteractiveProps {
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
}

/**
 * Accessible version of IonSegment.
 * Enforces accessibility attributes on IonSegment.
 */
export interface AccessibleIonSegment extends BaseAccessibleInteractiveProps {}

/**
 * Accessible version of IonSegmentButton.
 * Enforces accessibility attributes on IonSegmentButton.
 */
export interface AccessibleIonSegmentButton extends BaseAccessibleInteractiveProps {
  ariaPressed: boolean;
}

/**
 * Accessible version of IonFab.
 * Enforces accessibility attributes on IonFab.
 */
export interface AccessibleIonFab extends BaseAccessibleInteractiveProps {}

/**
 * Accessible version of IonFabButton.
 * Enforces accessibility attributes on IonFabButton.
 */
export interface AccessibleIonFabButton extends BaseAccessibleInteractiveProps {}

/**
 * Accessible version of IonList.
 * Enforces accessibility attributes on IonList.
 */
export interface AccessibleIonList extends BaseAccessibleStructuralProps {}

/**
 * Accessible version of IonItem.
 * Enforces accessibility attributes on IonItem.
 */
export interface AccessibleIonItem extends BaseAccessibleStructuralProps {}

/**
 * Accessible version of IonItemSliding.
 * Enforces accessibility attributes on IonItemSliding.
 */
export interface AccessibleIonItemSliding extends BaseAccessibleStructuralProps {}

/**
 * Accessible version of IonItemOption.
 * Enforces accessibility attributes on IonItemOption.
 */
export interface AccessibleIonItemOption extends BaseAccessibleStructuralProps {}

/**
 * Accessible version of IonPopover.
 * Enforces accessibility attributes on IonPopover.
 */
export interface AccessibleIonPopover extends BaseAccessibleStructuralProps {
  ariaDescribedBy?: string;
}

/**
 * Accessible version of IonReorderGroup.
 * Enforces accessibility attributes on IonReorderGroup.
 */
export interface AccessibleIonReorderGroup extends BaseAccessibleStructuralProps {}

/**
 * Accessible version of IonSearchbar.
 * Enforces accessibility attributes on IonSearchbar.
 */
export interface AccessibleIonSearchbar extends BaseAccessibleStructuralProps {}

/**
 * Accessible version of IonBackdrop.
 * Enforces accessibility attributes on IonBackdrop.
 */
export interface AccessibleIonBackdrop extends BaseAccessibleVisualProps {}

/**
 * Accessible version of IonBadge.
 * Enforces accessibility attributes on IonBadge.
 */
export interface AccessibleIonBadge extends BaseAccessibleStructuralProps {
  role?: 'status' | 'alert';
}

/**
 * Accessible version of IonButtons.
 * Enforces accessibility attributes on IonButtons.
 */
export interface AccessibleIonButtons extends BaseAccessibleStructuralProps {
  role?: 'toolbar';
}

/**
 * Accessible version of IonCard.
 * Enforces accessibility attributes on IonCard.
 */
export interface AccessibleIonCard extends BaseAccessibleStructuralProps {
  role?: 'article' | 'region';
}

/**
 * Accessible version of IonContent.
 * Enforces accessibility attributes on IonContent.
 */
export interface AccessibleIonContent extends BaseAccessibleStructuralProps {
  role?: 'main' | 'region';
}

/**
 * Accessible version of IonDatetime.
 * Enforces accessibility attributes on IonDatetime.
 */
export interface AccessibleIonDatetime extends BaseAccessibleInteractiveProps {
  ariaRequired?: boolean;
}

/**
 * Accessible version of IonIcon.
 * Enforces accessibility attributes on IonIcon.
 */
export interface AccessibleIonIcon extends BaseAccessibleVisualProps {
  role?: 'img';
}

/**
 * Accessible version of IonImg.
 * Enforces accessibility attributes on IonImg.
 */
export interface AccessibleIonImg extends BaseAccessibleVisualProps {
  alt: string;
  role?: 'img';
}

/**
 * Accessible version of IonLabel.
 * Enforces accessibility attributes on IonLabel.
 */
export interface AccessibleIonLabel extends Omit<BaseAccessibleStructuralProps, 'ariaLabel'> {
  ariaLabel: string;
}

/**
 * Accessible version of IonLoading.
 * Enforces accessibility attributes on IonLoading.
 */
export interface AccessibleIonLoading extends Omit<BaseAccessibleStructuralProps, 'ariaLabel'> {
  ariaLabel?: string;
}

/**
 * Accessible version of IonMenu.
 * Enforces accessibility attributes on IonMenu.
 */
export interface AccessibleIonMenu extends Omit<BaseAccessibleStructuralProps, 'ariaLabel' | 'role'> {
  ariaLabel?: string;
  role?: string;
}

/**
 * Accessible version of IonPicker.
 * Enforces accessibility attributes on IonPicker.
 */
export interface AccessibleIonPicker extends Omit<BaseAccessibleStructuralProps, 'ariaLabel' | 'role'> {
  ariaLabel?: string;
  role?: string;
}

/**
 * Accessible version of IonProgressBar.
 * Enforces accessibility attributes on IonProgressBar.
 */
export interface AccessibleIonProgressBar extends BaseAccessibleRangeProps {}

/**
 * Accessible version of IonRefresher.
 * Enforces accessibility attributes on IonRefresher.
 */
export interface AccessibleIonRefresher extends BaseAccessibleStructuralProps {
  role?: 'progressbar';
}

/**
 * Accessible version of IonSkeletonText.
 * Enforces accessibility attributes on IonSkeletonText.
 */
export interface AccessibleIonSkeletonText extends BaseAccessibleVisualProps {
  role?: 'status' | 'alert';
}

/**
 * Accessible version of IonSpinner.
 * Enforces accessibility attributes on IonSpinner.
 */
export interface AccessibleIonSpinner extends BaseAccessibleVisualProps {
  role?: 'status' | 'alert';
}

/**
 * Accessible version of IonToast.
 * Enforces accessibility attributes on IonToast.
 */
export interface AccessibleIonToast extends BaseAccessibleStructuralProps {
  role?: 'alert' | 'status';
}

/**
 * Accessible version of IonPage.
 * Enforces accessibility attributes on IonPage.
 */
export interface AccessibleIonPage extends BaseAccessibleStructuralProps {
  role?: 'main' | 'region';
  children?: React.ReactNode;
  className?: string;
}

/**
 * Accessible version of IonHeader.
 * Enforces accessibility attributes on IonHeader.
 */
export interface AccessibleIonHeader extends BaseAccessibleStructuralProps {
  role?: 'banner';
}

/**
 * Accessible version of IonFooter.
 * Enforces accessibility attributes on IonFooter.
 */
export interface AccessibleIonFooter extends BaseAccessibleStructuralProps {
  role?: 'contentinfo';
}

/**
 * Accessible version of IonToolbar.
 * Enforces accessibility attributes on IonToolbar.
 */
export interface AccessibleIonToolbar extends BaseAccessibleStructuralProps {
  role?: 'toolbar';
}

/**
 * Accessible version of IonText.
 * Enforces accessibility attributes on IonText.
 */
export interface AccessibleIonText extends Omit<BaseAccessibleStructuralProps, 'ariaLabel'> {
  role?: string;
  ariaHidden?: boolean;
}
