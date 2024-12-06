import { EditVideoSchema } from "@/components/forms/edit-video/schema";
import useZodForm from "./useZodForm";
import { useMutationData } from "./useMutationData";
import { QueryKeys } from "@/contants/query-keys";
import { editVideoInfo } from "@/actions/workspace";

export const useEditVideo = (
  videoId: string,
  title: string,
  description: string
) => {
  const { isPending, mutate } = useMutationData(
    [QueryKeys.videos.editVideo],
    (data: { title: string; description: string }) => {
      return editVideoInfo(videoId, data.title, data.description);
    },
    QueryKeys.preview.previewVideo
  );

  const { errors, onFormSubmit, register } = useZodForm(
    EditVideoSchema,
    mutate,
    {
      title,
      description,
    }
  );

  return { errors, onFormSubmit, register, isPending };
};
