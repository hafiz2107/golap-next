import { clsx, type ClassValue } from 'clsx';
import { formatDistance } from 'date-fns';
import { twMerge } from 'tailwind-merge';

type DateDistanceProps = {
  start: Date;
  end: Date;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GetFormattedString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase;
};

export const CalculteDateDistance = ({ end, start }: DateDistanceProps) => {
  const dateDistance = formatDistance(end, start, {
    addSuffix: false,
  });

  return `${dateDistance.charAt(0).toUpperCase()}${dateDistance.slice(1)}`;
};

export const truncateString = (str: string, slice?: number) => {
  return str.slice(0, slice || 30) + '...';
};
