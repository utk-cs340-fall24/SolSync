import Profile from "@/components/Profile";

export default function ProfileScreen() {
  // const user = useUser();

  // if (user) {
  //   return <AuthorizedProfile />;
  // }

  // return <UnauthorizedProfile />; --> stack navigator lives here

  return <Profile isAuthed={true} />;
}
