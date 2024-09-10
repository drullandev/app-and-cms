import { ComponentProps } from 'react';

interface BaseAccessibleProps extends Omit<ComponentProps<any>, 'aria-label' | 'role' | 'tabIndex' | 'aria-checked' | 'aria-pressed' | 'aria-required' | 'aria-invalid' | 'aria-describedby' | 'aria-valuemin' | 'aria-valuemax' | 'aria-valuenow' | 'aria-valuetext'> {
  ariaLabel?: string;
  role?: string;
  tabIndex?: number;
  ariaChecked?: boolean;
  ariaPressed?: boolean;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  ariaValueMin?: number;
  ariaValueMax?: number;
  ariaValueNow?: number;
  ariaValueText?: string;
}

/**
 * Accessible version of IonButton.
 */
export interface AccessibleIonButton extends BaseAccessibleProps {
  ariaLabel: string;
  ariaPressed?: boolean;
}

/**
 * Accessible version of IonActionSheet.
 */
export interface AccessibleIonActionSheet extends BaseAccessibleProps {
  ariaLabel: string;
  role?: 'menu' | 'dialog';
}

/**
 * Accessible version of IonInput.
 */
export interface AccessibleIonInput extends BaseAccessibleProps {
  ariaLabel: string;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
}

/**
 * Accessible version of IonModal.
 */
export interface AccessibleIonModal extends BaseAccessibleProps {
  ariaLabel: string;
  ariaDescribedBy?: string;
}

/**
 * Accessible version of IonSelect.
 */
export interface AccessibleIonSelect extends BaseAccessibleProps {
  ariaLabel: string;
  ariaDescribedBy?: string;
}

/**
 * Accessible version of IonTabBar.
 */
export interface AccessibleIonTabBar extends BaseAccessibleProps {
  ariaLabel: string;
  ariaSelected?: boolean;
}

/**
 * Accessible version of IonRange.
 */
export interface AccessibleIonRange extends BaseAccessibleProps {
  ariaValueMin?: number;
  ariaValueMax?: number;
  ariaValueNow?: number;
  ariaValueText?: string;
}

/**
 * Accessible version of IonCheckbox.
 */
export interface AccessibleIonCheckbox extends BaseAccessibleProps {
  ariaLabel: string;
  ariaChecked: boolean;
}

/**
 * Accessible version of IonAlert.
 */
export interface AccessibleIonAlert extends BaseAccessibleProps {
  ariaLabel: string;
  role?: 'alert' | 'status';
}

/**
 * Accessible version of IonToggle.
 */
export interface AccessibleIonToggle extends BaseAccessibleProps {
  ariaLabel: string;
  ariaChecked: boolean;
}

/**
 * Accessible version of IonRadio.
 */
export interface AccessibleIonRadio extends BaseAccessibleProps {
  ariaLabel: string;
  ariaChecked: boolean;
}

/**
 * Accessible version of IonRadioGroup.
 */
export interface AccessibleIonRadioGroup extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonTextarea.
 */
export interface AccessibleIonTextarea extends BaseAccessibleProps {
  ariaLabel: string;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
}

/**
 * Accessible version of IonSegment.
 */
export interface AccessibleIonSegment extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonSegmentButton.
 */
export interface AccessibleIonSegmentButton extends BaseAccessibleProps {
  ariaLabel: string;
  ariaPressed: boolean;
}

/**
 * Accessible version of IonFab.
 */
export interface AccessibleIonFab extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonFabButton.
 */
export interface AccessibleIonFabButton extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonList.
 */
export interface AccessibleIonList extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonItem.
 */
export interface AccessibleIonItem extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonItemSliding.
 */
export interface AccessibleIonItemSliding extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonItemOption.
 */
export interface AccessibleIonItemOption extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonPopover.
 */
export interface AccessibleIonPopover extends BaseAccessibleProps {
  ariaLabel: string;
  ariaDescribedBy?: string;
}

/**
 * Accessible version of IonReorderGroup.
 */
export interface AccessibleIonReorderGroup extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonSearchbar.
 */
export interface AccessibleIonSearchbar extends BaseAccessibleProps {
  ariaLabel: string;
}

/**
 * Accessible version of IonBackdrop.
 */
export interface AccessibleIonBackdrop extends Omit<BaseAccessibleProps, 'ariaLabel' | 'role'> {
  ariaHidden?: 'true' | 'false';
}

/**
 * Accessible version of IonBadge.
 */
export interface AccessibleIonBadge extends BaseAccessibleProps {
  ariaLabel: string;
  role?: 'status' | 'alert';
}

/**
 * Accessible version of IonButtons.
 */
export interface AccessibleIonButtons extends BaseAccessibleProps {
  ariaLabel: string;
  role?: 'toolbar';
}

/**
 * Accessible version of IonCard.
 */
export interface AccessibleIonCard extends BaseAccessibleProps {
  ariaLabel: string;
  role?: 'article' | 'region';
}

/**
 * Accessible version of IonContent.
 */
export interface AccessibleIonContent extends BaseAccessibleProps {
  ariaLabel: string;
  role?: 'main' | 'region';
}

/**
 * Accessible version of IonDatetime.
 */
export interface AccessibleIonDatetime extends BaseAccessibleProps {
  ariaLabel: string;
  ariaRequired?: boolean;
}

/**
 * Accessible version of IonIcon.
 */
export interface AccessibleIonIcon extends BaseAccessibleProps {
  ariaLabel: string;
  role?: 'img';
}

/**
 * Accessible version of IonImg.
 */
export interface AccessibleIonImg extends Omit<BaseAccessibleProps, 'role'> {
  alt: string;
  role?: 'img';
}

/**
 * Accessible version of IonLabel.
 */
export interface AccessibleIonLabel extends Omit<BaseAccessibleProps, 'ariaLabel'> {
  ariaLabel: string;
}

/**
 * Accessible version of IonLoading.
 */
export interface AccessibleIonLoading extends Omit<BaseAccessibleProps, 'ariaLabel'> {
  ariaLabel?: string;
}

/**
 * Accessible version of IonMenu.
 */
export interface AccessibleIonMenu extends Omit<BaseAccessibleProps, 'ariaLabel' | 'role'> {
  ariaLabel?: string;
  role?: string;
}

/**
 * Accessible version of IonPicker.
 */
export interface AccessibleIonPicker extends Omit<BaseAccessibleProps, 'ariaLabel' | 'role'> {
  ariaLabel?: string;
  role?: string;
}

/**
 * Accessible version of IonProgressBar.
 */
export interface AccessibleIonProgressBar extends BaseAccessibleProps {
  ariaValueMin: number;
  ariaValueMax: number;
  ariaValueNow: number;
  ariaValueText?: string;
}

/**
 * Accessible version of IonRefresher.
 */
export interface AccessibleIonRefresher extends BaseAccessibleProps {
  ariaLabel?: string;
  role?: 'progressbar';
}

/**
 * Accessible version of IonSkeletonText.
 */
export interface AccessibleIonSkeletonText extends BaseAccessibleProps {
  ariaLabel?: string;
  role?: 'status' | 'alert';
}

/**
 * Accessible version of IonSpinner.
 */
export interface AccessibleIonSpinner extends BaseAccessibleProps {
  ariaLabel?: string;
  role?: 'status' | 'alert';
}

/**
 * Accessible version of IonToast.
 */
export interface AccessibleIonToast extends BaseAccessibleProps {
  ariaLabel?: string;
  role?: 'alert' | 'status';
}