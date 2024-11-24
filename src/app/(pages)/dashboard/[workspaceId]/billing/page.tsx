import { getPaymentInfo } from '@/actions/user';
import React from 'react';

const BillingPage = async () => {
  // TODO:Wire up payment methods and payment history once PG is integrated
  const payment = await getPaymentInfo();
  return (
    <div className="flex w-full gap-10">
      <div className="flex flex-col gap-2 w-[50%]">
        <div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Current plan</h2>
            <p className="text-[#9D9D9D]">Your payment history</p>
          </div>

          <div>
            <h2 className="text-2xl">
              ${payment.data?.subscription?.plan === 'PRO' ? '99' : '0'}/Month
            </h2>
            <p className="text-[#9D9D9D]">
              {payment.data?.subscription?.plan === 'PRO' ? 'Pro' : 'Free'} Plan
            </p>
          </div>
        </div>

        <div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Payment Method</h2>
            <p className="text-[#9D9D9D]">Your payment methods</p>
          </div>

          <div>
            <h2 className="text-2xl">
              ${payment.data?.subscription?.plan === 'PRO' ? '99' : '0'}/Month
            </h2>
            <p className="text-[#9D9D9D]">
              {payment.data?.subscription?.plan === 'PRO' ? 'Pro' : 'Free'} Plan
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl w-[50%]">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Payment history</h2>
          <p className="text-[#9D9D9D]">Your payment history</p>
        </div>

        <div>
          <h2 className="text-2xl">
            ${payment.data?.subscription?.plan === 'PRO' ? '99' : '0'}/Month
          </h2>
          <p className="text-[#9D9D9D]">
            {payment.data?.subscription?.plan === 'PRO' ? 'Pro' : 'Free'} Plan
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
