import { User } from '../../common/types';

export default function AuthenticatedContent({ user }: { user: User }) {
  return <h2>{`${user.givenName ?? ''} ${user.familyName ?? ''}`}</h2>;
}
