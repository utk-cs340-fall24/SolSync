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

type ValidAvatar = {
  emoji: string;
  background: string;
};

type NullAvatar = {
  emoji: null;
  background: null;
};

export type Avatar = ValidAvatar | NullAvatar;

export type SolSyncUser = {
  id: string;
  email: string;
  displayName: string;
  location: Location;
  avatar: Avatar;
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
