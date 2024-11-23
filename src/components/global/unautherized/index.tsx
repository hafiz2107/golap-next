import React from 'react';
type Status = 401 | 404 | 500 | 403;

type Props = {
  status: Status;
};

const ErrorHandler = ({ status }: Props) => {
  const statusMap = {
    401: {
      title: 'Unautherized',
      des: 'You are not autherised to access this content',
    },
    404: {
      title: 'Not found',
      des: 'The content you are searching cannot be found',
    },
    403: {
      title: 'Forbidden',
      des: "You can't access this content",
    },
    500: {
      title: 'Something went wrong',
      des: 'Something went wrong, please try again later',
    },
  };
  return (
    <div className="h-screen container flex flex-col gap-y-2 justify-center items-center">
      <h2 className="text-6xl font-bold text-white">
        {statusMap[status].title}
      </h2>
      <p>{statusMap[status].des}</p>
    </div>
  );
};

export default ErrorHandler;
