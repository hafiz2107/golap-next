export type WorkspaceProps = {
  status: number;
  data: {
    subscription: {
      plan: 'FREE' | 'PRO';
    } | null;
    workspace: {
      id: string;
      name: string;
      type: 'PUBLIC' | 'PERSONAL';
    }[];
    members: {
      WorkSpace: {
        id: string;
        name: string;
        type: 'PUBLIC' | 'PERSONAL';
      };
    }[];
  };
};

export type NotificationProps = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type UserSearchProps =
  | {
      id: string;
      subscription: { plan: 'FREE' | 'PRO' } | null;
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      email: string | null;
    }[]
  | undefined;

export type InfoBarSearchProps = {
  users?: {
    id?: string;
    firstname?: string;
    lastname?: string;
    image?: string;
    email?: string;
  }[];
  folders?: any[];
};

export type SearchReturnType<T> = T extends 'USERS'
  ? {
      onSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
      query: string;
      isFetching: boolean;
      onUsers: UserSearchProps;
    }
  : T extends 'INFOBAR'
  ? {
      onSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
      query: string;
      isFetching: boolean;
      onUsers: InfoBarSearchProps;
    }
  : T extends 'WORKSPACE'
  ? {
      onSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
      query: string;
      isFetching: boolean;
      onUsers: undefined;
    }
  : never;

export type FoldersProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
  })[];
};
export type FolderProps = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};

export type VideosProps = {
  status: number;
  data: Array<VideoInfoProps>;
};

export type VideoInfoProps = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
};

export type VideoProps = {
  status: number;
  data: {
    title: string | null;
    createdAt: Date;
    source: string;
    description: string | null;
    processing: boolean;
    views: number;
    summery: string;
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      clerkid: string;
      trial: boolean;
      subscription: {
        plan: 'PRO' | 'FREE';
      };
    };
  };
  author: boolean;
};

export type NotificationsProps = {
  status: number;
  data: {
    image: string;
    firstname: string;
    lastname: string;
    notification: {
      id: string;
      userId: string | null;
      content: string;
    }[];
  };
};

export type CommentRepliesProps = {
  id: string;
  comment: string;
  createdAt: string;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  User: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    createdAt: Date;
    clerkId: string;
    image: string;
    trial: boolean;
    firstView: boolean;
  };
};

export type VideoCommentProps = {
  status: number;
  data: {
    User: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      createdAt: Date;
      clerkId: string;
      image: string;
      trial: boolean;
      firstView: boolean;
    };
    reply: CommentRepliesProps[];
    id: string;
    comment: string;
    createdAt: Date;
    commentId: string | null;
    userId: string | null;
    videoId: string | null;
  }[];
};
