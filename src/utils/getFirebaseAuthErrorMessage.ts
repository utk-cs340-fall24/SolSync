const getFirebaseAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/email-already-exists":
    case "auth/email-already-in-use":
      return "Email already exists";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/invalid-password":
      return "Invalid password";
    case "auth/invalid-credential":
      return "Invalid credentials";
    case "auth/too-many-requests":
      return "Too many requests";
    default:
      return "There was an error signing in";
  }
};

export default getFirebaseAuthErrorMessage;
