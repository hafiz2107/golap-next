import CommentForm from '@/components/forms/comment-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CommentRepliesProps } from '@/types/index.type';
import { User } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  comment: string;
  author: { image: string; firstname: string; lastname: string };
  videoId: string;
  commentId?: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
};

const CommentCard = ({
  author,
  comment,
  reply,
  videoId,
  commentId,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState(false);

  const authorFullName = `${author.firstname} ${author.lastname}`;
  return (
    <Card
      className={cn(
        isReply
          ? 'bg-[#1D1D1D] pl-10 border-none'
          : 'border-[1px] bg-[#1D1D1D] p-5'
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex gap-x-2 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={author.image} alt="author" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <p className="capitalize text-sm text-[#BDBDBD]">{authorFullName}</p>
        </div>
        <div className="text-[#BDBDBD]">{comment}</div>
      </div>

      {!isReply && (
        <div className="flex justify-end mt-2">
          {!onReply ? (
            <Button
              onClick={() => setOnReply(true)}
              className="text-sm rounded-full bg-[#252525] text-white hover:text-black"
            >
              Reply
            </Button>
          ) : (
            <CommentForm
              close={() => setOnReply(false)}
              videoId={videoId}
              commentId={commentId}
              author={authorFullName}
            />
          )}
        </div>
      )}

      {!!reply.length && (
        <div className="flex flex-col gap-y-10 mt-5">
          {reply.map((r) => (
            <CommentCard
              isReply
              reply={[]}
              comment={r.comment}
              commentId={r.commentId!}
              videoId={videoId}
              key={r.id}
              author={{
                image: r.User?.image!,
                firstname: r.User?.firstname!,
                lastname: r.User?.lastname!,
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default CommentCard;
