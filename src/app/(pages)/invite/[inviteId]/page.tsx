import { acceptInvite } from '@/actions/user';
import ErrorHandler from '@/components/global/unautherized';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: Promise<{
    inviteId: string;
  }>;
};

const InvitePage = async ({ params }: Props) => {
  const { inviteId } = await params;
  const invite = await acceptInvite(inviteId);

  if (invite.status === 404) return redirect('/auth/sign-in');
  if (invite.status === 401) return <ErrorHandler status={401} />;
  if (invite.status === 500) return <ErrorHandler status={500} />;
  if (invite?.status === 200) return redirect('/auth/callback');
};

export default InvitePage;
