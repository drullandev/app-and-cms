import React from 'react';

/**
 * Generic Looper component that iterates over an array of items and renders each one
 * using the provided render function. This is a flexible component that can handle 
 * any type of data and rendering logic.
 *
 * @template T - The type of the items in the array.
 * @param {T[]} items - The array of items to be iterated over.
 * @param {(item: T, index: number) => React.ReactNode} renderItem - A function that specifies how to render each item.
 * @param {React.ReactNode} [loadingComponent] - Optional custom loading component to be displayed when the items array is empty.
 * @returns {JSX.Element} A JSX element that contains the rendered items or a fallback component when the array is empty.
 */
interface ILooper<T> {
  items?: T[];  // Optional array of items of generic type T
  renderItem: (item: T, index: number) => React.ReactNode;  // Function that defines how each item is rendered
  loadingComponent?: React.ReactNode;  // Optional custom loading component
}

const Looper = <T,>({ items = [], renderItem, loadingComponent }: ILooper<T>): JSX.Element => {
  // If no items or the items array is empty, render a fragment or a custom loading component if provided
  if (items.length === 0) {
    return <>{loadingComponent || <></>}</>;
  }

  // Create an array to hold the rendered items
  const elements = items.map((item, index) => renderItem(item, index));

  // Return the rendered elements wrapped in a fragment
  return <>{elements}</>;
};

export default Looper;
