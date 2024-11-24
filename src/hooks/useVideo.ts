import { QueryKeys } from '@/contants/query-keys';
import { useQueryData } from './useQueryData';
import { useMutationData } from './useMutationData';
import useZodForm from './useZodForm';
import { CommentSchema } from '@/components/forms/comment-form/schema';
import { createCommentAndReply, getUserProfile } from '@/actions/user';

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data } = useQueryData([QueryKeys.user.userProfile], () =>
    getUserProfile()
  );

  const { data: user } = data as {
    status: number;
    data: { id: string; image: string };
  };

  const { isPending, mutate } = useMutationData(
    [QueryKeys.comments.newComment],
    (data: { comment: string }) =>
      createCommentAndReply(user.id, data.comment, videoId, commentId),
    QueryKeys.comments.videoComments,
    () => reset()
  );

  const { errors, onFormSubmit, register, reset } = useZodForm(
    CommentSchema,
    mutate
  );

  return { register, errors, onFormSubmit, isPending };
};
