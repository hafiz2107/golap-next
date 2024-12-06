import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import React from "react";
import Modal from "../modal";
import EditVideoForm from "@/components/forms/edit-video";

type Props = {
  videoId: string;
  title: string;
  description: string;
};

const EditVideo = ({ description, title, videoId }: Props) => {
  return (
    <Modal
      title={title}
      description={description}
      trigger={
        <Button variant={"ghost"}>
          <EditIcon className="text-[#6c6c6c]" />
        </Button>
      }
    >
      <EditVideoForm
        videoId={videoId}
        title={title}
        description={description}
      />
    </Modal>
  );
};

export default EditVideo;
