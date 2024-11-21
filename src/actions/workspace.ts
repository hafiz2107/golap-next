/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        status: 403,
      };

    const workspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });

    return { status: 200, data: { workspace } };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: { workspace: null } };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    if (isFolders && isFolders.length) return { status: 200, data: isFolders };

    return { status: 404, data: [] };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return { status: 500, data: [] };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        status: 401,
      };

    const videos = await client.video.findMany({
      where: {
        OR: [
          {
            workSpaceId,
          },
          {
            folderId: workSpaceId,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (videos && videos.length) return { status: 200, data: videos };
    return { status: 404, data: [] };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return { status: 500, data: [] };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const workspaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) return { status: 200, data: workspaces };

    return { status: 404, data: [] };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return { status: 500, data: [] };
  }
};

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const autherized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (autherized?.subscription?.plan === 'PRO') {
      const workSpace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: 'PUBLIC',
            },
          },
        },
      });
      if (workSpace) {
        return { status: 201, data: 'Workspace created' };
      }
    }

    return { status: 401, data: 'You are not autherised to create a user' };
  } catch (error) {
    return { status: 500, data: '' };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });

    if (folder) return { status: 200, data: 'Folder renamed' };
    return { status: 400, data: "Folder doesn't exist" };
  } catch (error) {
    return { status: 500, data: 'Oops something went wrong' };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const isNewFolders = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: {
            name: 'Unititled Folder',
          },
        },
      },
    });

    if (isNewFolders) return { status: 200, message: 'New folder created' };
    return { status: 400, message: "Couldn't create folder" };
  } catch (error) {
    return { status: 500, message: 'Something went wrong, Please try again' };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folder) return { status: 200, data: folder };
    return { status: 400, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  workSpaceId: string,
  folderId: string
) => {
  try {
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId,
      },
    });

    if (location) return { status: 200, data: 'Folder changed successfully' };
    return { status: 404, data: 'Workspace/Folder not found' };
  } catch (error) {
    return { status: 500, data: 'Something went wrong' };
  }
};
