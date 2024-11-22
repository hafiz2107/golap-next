import { Loader } from 'lucide-react';

type Props = {
  text?: string;
};

export default function FullScreenLoading({ text }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
      <div className="flex items-center space-x-2">
        {/* <div className="w-6 h-6 bg-white rounded-full" />
        <div className="w-6 h-6 bg-white rounded-full" />
        <div className="w-6 h-6 bg-white rounded-full" /> */}
        <div className="flex items-center gap-2">
          <Loader
            size={50}
            className="text-black dark:text-white animate-spin-slow"
          />
          <span className="font-semibold">
            {text ? text : 'Loading your data'}
          </span>
        </div>
      </div>
    </div>
  );
}
