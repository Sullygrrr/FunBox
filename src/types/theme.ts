export interface Theme {
  primary: string;
  hover: string;
  gradient: string;
  ring: string;
  borderColor: string;
}

export const THEMES: Theme[] = [
  {
    primary: 'bg-amber-600',
    hover: 'hover:bg-amber-700',
    gradient: 'from-amber-900 via-amber-800 to-orange-700',
    ring: 'ring-amber-500',
    borderColor: 'amber-200'
  },
  {
    primary: 'bg-indigo-600',
    hover: 'hover:bg-indigo-700',
    gradient: 'from-indigo-900 via-indigo-800 to-blue-700',
    ring: 'ring-indigo-500',
    borderColor: 'indigo-200'
  },
  {
    primary: 'bg-emerald-600',
    hover: 'hover:bg-emerald-700',
    gradient: 'from-emerald-900 via-emerald-800 to-green-700',
    ring: 'ring-emerald-500',
    borderColor: 'emerald-200'
  },
  {
    primary: 'bg-purple-600',
    hover: 'hover:bg-purple-700',
    gradient: 'from-purple-900 via-purple-800 to-fuchsia-700',
    ring: 'ring-purple-500',
    borderColor: 'purple-200'
  },
  {
    primary: 'bg-rose-600',
    hover: 'hover:bg-rose-700',
    gradient: 'from-rose-900 via-rose-800 to-red-700',
    ring: 'ring-rose-500',
    borderColor: 'rose-200'
  }
];