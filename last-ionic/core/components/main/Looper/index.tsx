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
 * @returns {JSX.Element} A JSX element that contains the rendered items.
 */
interface ILooper<T> {
  items: T[];  // Array of items of generic type T
  renderItem: (item: T, index: number) => React.ReactNode;  // Function that defines how each item is rendered
  loadingComponent?: React.ReactNode;  // Optional custom loading component
}

const Looper = <T,>({ items, renderItem, loadingComponent }: ILooper<T>): JSX.Element => {
  // If items array is empty, show the custom loading component or a default message
  if (items.length === 0) {
    return <>{loadingComponent || <>Loading...</>}</>;
  }

  const elements = [];  // Array to hold the rendered items
  let i = 0;

  // Loop through the items array and apply the render function to each element
  while (i < items.length) {
    elements.push(renderItem(items[i], i));
    i++;
  }

  // Return the rendered elements wrapped in a fragment
  return <>{elements}</>;
};

export default Looper;
