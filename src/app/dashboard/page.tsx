import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`);

  if (auth.status >= 400) return redirect('/auth/sign-in');

  //   Authentication
  //   If account exist redirect
  //   else redirect to login
};

export default DashboardPage;
