// satnaing/shadcn-admin @ e16c87f; Copyright (c) 2024 Sat Naing; MIT.
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
