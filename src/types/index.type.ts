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
      Workspace: {
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