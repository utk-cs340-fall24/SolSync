import Profile from "@/components/Profile";
import AuthorizedProfile from "@/components/Profile/AuthorizedProfile";
import useUser from "@/hooks/useUser";

export default function ProfileScreen() {
  // const user = useUser();

  // if (user) {
  //   return <AuthorizedProfile />;
  // }

  // return <UnauthorizedProfile />; --> stack navigator lives here

  return <Profile isAuthed={false} />;
}
