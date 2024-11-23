/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    if (userExist) return { status: 200, user: userExist };

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s workspace`,
            type: 'PERSONAL',
          },
        },
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (newUser) return { status: 201, user: newUser };

    return { status: 400 };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const notifications = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        image: true,
        firstname: true,
        lastname: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notifications && notifications.notification.length)
      return { status: 200, data: notifications };

    return { status: 404, data: [] };
  } catch (err) {
    return { status: 500, data: [] };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401 };

    const users = await client.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { email: { contains: query } },
          {
            lastname: { contains: query },
          },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    });

    if (users && users.length) return { status: 200, data: users };
    return { status: 404, data: undefined };
  } catch (err) {
    return { status: 500, data: undefined };
  }
};

export const searchInfobar = async (query: string, workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401 };

    const users = await client.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { email: { contains: query } },
          {
            lastname: { contains: query },
          },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
      take: 3,
    });

    const folders = await client.folder.findMany({
      where: { workSpaceId: workspaceId, name: { contains: query } },
      select: {
        name: true,
        id: true,
      },
    });

    if ((users && users.length) || (folders && folders.length))
      return {
        status: 200,
        data: {
          users,
          folders,
        },
      };

    if (!users && !folders) {
      return {
        status: 404,
        data: [],
      };
    }
  } catch (err) {
    return {
      status: 500,
      data: [],
    };
  }
};

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401 };

    const payments = await client.user.findUnique({
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

    if (payments) return { status: 200, data: payments };
    return { status: 400, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, data: null };

    const firstview = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });

    if (firstview) return { status: 200, data: firstview };

    return { status: 400, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const enableFirstView = async (state: boolean) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 401 };

    const view = await client.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        firstView: state,
      },
      select: {
        firstView: true,
      },
    });

    if (view) return { status: 200, data: view };
    return { status: 400, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const createCommentAndReply = async (
  userId: string,
  comment: string,
  videoId: string,
  commentId: string | undefined
) => {
  try {
    if (commentId) {
      const reply = await client.comment.update({
        where: {
          id: commentId,
        },
        data: {
          reply: {
            create: {
              comment,
              userId,
              videoId,
            },
          },
        },
      });

      if (reply) return { status: 200, data: 'Reply posted' };
    } else {
      const newComment = await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          Comment: {
            create: {
              comment,
              userId,
            },
          },
        },
      });
      if (newComment) return { status: 200, data: 'New comment added' };
    }

    return { status: 400, data: 'Please add all required props' };
  } catch (error) {
    return { status: 500, data: 'Something went wrong' };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, data: null };

    const profileAndImage = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
    });

    if (user)
      return {
        status: 200,
        data: profileAndImage,
      };
    return {
      status: 400,
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
};

export const getVideoComments = async (id: string) => {
  try {
    const comments = await client.comment.findMany({
      where: {
        OR: [
          {
            videoId: id,
          },
          {
            commentId: id,
          },
        ],
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    });

    if (comments && comments.length) return { status: 200, data: comments };

    return { status: 400, data: [] };
  } catch (error) {
    return { status: 500, data: [] };
  }
};
