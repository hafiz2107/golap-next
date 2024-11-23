import CommentForm from '@/components/forms/comment-form';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import CommentCard from '../comment-card';
import { useQueryData } from '@/hooks/useQueryData';
import { QueryKeys } from '@/contants/query-keys';
import { getVideoComments } from '@/actions/user';
import { VideoCommentProps } from '@/types/index.type';

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  const { data } = useQueryData([QueryKeys.preview.videoComments], () =>
    getVideoComments(videoId)
  );

  const { data: comments } = data as VideoCommentProps;

  return (
    <div>
      <TabsContent
        value="Activity"
        className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-5 data-[state=inactive]:hidden"
      >
        <div className="max-h-[45vh] overflow-auto">
          {comments.length ? (
            comments.map((comment) => (
              <CommentCard
                author={{
                  image: comment.User?.image,
                  firstname: comment.User?.firstname,
                  lastname: comment.User?.lastname,
                }}
                comment={comment.comment}
                key={comment.id}
                reply={comment.reply}
                videoId={videoId}
                commentId={comment.id}
              />
            ))
          ) : (
            <p className="self-center">No comments yet</p>
          )}
        </div>
        <div className=" bottom-0  sticky z-20 bg-[#1D1D1D] py-2 ">
          <CommentForm author={author} videoId={videoId} />
        </div>
      </TabsContent>
    </div>
  );
};

export default Activities;
