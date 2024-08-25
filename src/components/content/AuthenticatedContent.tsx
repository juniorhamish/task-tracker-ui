import logo from '../../assets/logo.png';

interface User {
  givenName?: string;
  familyName?: string;
  name?: string;
  picture?: string;
}

export default function AuthenticatedContent({ user }: { user: User }) {
  return (
    <>
      <div>
        <img src={logo} alt="Task Tracker logo" />
      </div>
      <h2>{`${user.givenName ?? ''} ${user.familyName ?? ''}`}</h2>
      <img src={user.picture} alt={user.name} />
    </>
  );
}
