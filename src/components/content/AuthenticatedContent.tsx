interface User {
  givenName?: string;
  familyName?: string;
  name?: string;
  picture?: string;
}

export default function AuthenticatedContent({ user }: { user: User }) {
  return <h2>{`${user.givenName ?? ''} ${user.familyName ?? ''}`}</h2>;
}
