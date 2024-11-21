import { Links } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

type Props = {
  videoId: string;
  className?: string;
  varient?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
};

function CopyLink({ videoId, className, varient }: Props) {
  const onCopyClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`
    );

    return toast('Copied', {
      description: 'Link successfully copied',
    });
  };

  return (
    <Button variant={varient} onClick={onCopyClipboard} className={className}>
      <Links />
    </Button>
  );
}

export default CopyLink;
