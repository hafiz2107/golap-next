import { completeSubscription } from '@/actions/user';
import ErrorHandler from '@/components/global/unautherized';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  searchParams: Promise<{
    session_id?: string;
    cancel?: boolean;
  }>;
};

const PaymentSuccessPage = async ({ searchParams }: Props) => {
  const searchParam = await searchParams;

  if (searchParam.session_id) {
    const customer = await completeSubscription(searchParam.session_id);

    if (customer.status === 200) return redirect('/auth/callback');
  }

  if (searchParam.cancel) <ErrorHandler status={404} />;

  return <ErrorHandler status={500} />;
};

export default PaymentSuccessPage;
