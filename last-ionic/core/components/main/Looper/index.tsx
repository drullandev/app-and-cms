import React from 'react';

/**
 * Generic Looper component that iterates over an array of items and renders each one
 * using the provided render function. This is a flexible component that can handle 
 * any type of data and rendering logic.
 *
 * @template T - The type of the items in the array.
 * @param {T[]} items - The array of items to be iterated over.
 * @param {(item: T, index: number) => React.ReactNode} renderItem - A function that specifies how to render each item.
 * @returns {JSX.Element} A JSX element that contains the rendered items.
 */
interface ILooper<T> {
  items: T[];  // Array of items of generic type T
  renderItem: (item: T, index: number) => React.ReactNode;  // Function that defines how each item is rendered
}

const Looper = <T,>({ items, renderItem }: ILooper<T>): JSX.Element => {
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
