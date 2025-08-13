import clsx from "clsx";

// Optional: if you're not using `clsx`, use a simple joiner
export function cn(...inputs) {
  return clsx(inputs);
}

// OR if no external library
// export function cn(...inputs) {
//   return inputs.filter(Boolean).join(" ");
// }
