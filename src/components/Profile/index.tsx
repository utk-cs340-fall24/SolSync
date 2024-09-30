import React from "react";
import UnauthorizedProfile from "./UnauthorizedProfile";
import AuthorizedProfile from "./AuthorizedProfile";

interface SettingsProps {
  isAuthed: boolean;
}

export default function Settings({ isAuthed }: SettingsProps) {
  return isAuthed ? <AuthorizedProfile /> : <UnauthorizedProfile />;
}
