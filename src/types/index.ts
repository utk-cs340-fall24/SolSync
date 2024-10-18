import { User } from "firebase/auth";

// Discriminated union: both are numbers or both are null
type ValidLocation = {
  latitude: number;
  longitude: number;
};

type NullLocation = {
  latitude: null;
  longitude: null;
};

export type Location = ValidLocation | NullLocation;

export type SolSyncUser = User & {
  displayName: string;
  location: Location;
};

export type Habit = {
  id: string;
  userId: string;
  name: string;
  notificationPeriod: "sunrise" | "sunset";
  emailNotificationEnabled: boolean;
  hourOffset: number;
  minuteOffset: number;
  offsetDirection: "before" | "after";
};

export type History = {
  id: string;
  date: Date;
  habitId: string;
  userId: string;
};
