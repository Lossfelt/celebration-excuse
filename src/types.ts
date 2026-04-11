export interface HolidaySource {
  label: string;
  url: string;
}

export interface Holiday {
  name: string;
  description: string;
  type: "religious" | "national" | "cultural" | "international" | "fun";
  regions?: string[];
  url?: string;
  sources?: HolidaySource[];
}

export interface PersonalMilestone {
  name: string;
  description: string;
  value: number | bigint;
  unit: string;
}

export interface Celebration {
  name: string;
  description: string;
  category: "personal" | "global";
  type: string;
  icon: string;
  url?: string;
  linkLabel?: string;
}
