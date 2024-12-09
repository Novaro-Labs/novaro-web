// transform numbers to 1K, 2M, 3B

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ref: https://stackoverflow.com/a/2686098/2710165
export function humanizeNumber(number: number, decPlaces: number = 1) {
  if (number < 1000) {
    return number;
  }

  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  let abbrev = ["K", "M", "B", "T"];

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    let size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      // @ts-ignore
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 防抖
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// 生成六位随机数
export const generateRandomSourceId = (): string => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min + '';
};
