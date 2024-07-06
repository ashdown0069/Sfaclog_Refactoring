import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { LogModel } from '@/models/Log';
import { revalidatePath, revalidateTag } from 'next/cache';
import { auth } from '@/auth/auth';
/**
 * Client Side: POST /api/logs/write
 * @description'Content-Type': 'application/json'
 * @description 로그 등록하는 API
 * @description 로그인 필요
 * @param  userId
 * @param  logTitle
 * @param  logEditorContent
 * @param  logScope
 * @param  logCategory
 * @param  thumbnailUrl
 * @param  logHashtags
 * @returns logId
 */
export const POST = auth(async (req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.json(
      { success: false, message: 'unauthorized - not logged in' },
      { status: 401 },
    );
  }

  const data = await req.json();
  const { userId } = req.auth.user;
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: 'can not connect to database',
      },
      { status: 500 },
    );
  }

  const isVisibility = data.logScope === 'public' ? true : false;
  try {
    const newLog = new LogModel({
      author: userId,
      title: data.logTitle,
      content: data.logEditorContent,
      isVisibility: isVisibility,
      category: data.logCategory,
      thumbnail: data.thumbnailUrl,
      tags: data.logHashtags,
      logConentHTML: data.logConentHTML,
    });
    await newLog.save();

    //최신 로그 페이지 캐시 최신화
    revalidatePath('/latest', 'page');

    return NextResponse.json(
      {
        success: true,
        logId: newLog._id,
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message || 'unknown error occured while saving log',
      },
      { status: 500 },
    );
  }
});

/**
 * Client Side: PUT /api/logs/write
 * @description'Content-Type': 'application/json'
 * @description 로그 수정하는 API
 * @description 로그인 필요
 * @param  userId
 * @param  logTitle
 * @param  logEditorContent
 * @param  logScope
 * @param  logCategory
 * @param  thumbnailUrl
 * @param  logHashtags
 * @returns logId
 */
export async function PUT(req: NextRequest, res: NextResponse) {
  return auth(async () => {
    if (!req.auth) {
      return NextResponse.json(
        { success: false, message: 'unauthorized - not logged in' },
        { status: 401 },
      );
    }

    try {
      await connectDB();
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          message: 'can not connect to database',
        },
        { status: 500 },
      );
    }

    const data = await req.json();
    const { user } = req.auth;

    try {
      if (!data.logId) {
        throw new Error('logId is missing');
      }

      const log = await LogModel.findById(data.logId).exec();

      if (!log) {
        throw new Error('log not found');
      }

      if (!(log?.author.toString() === user.userId.toString())) {
        return NextResponse.json(
          {
            success: false,
            message: 'unauthorized - not the author of the log',
          },
          { status: 401 },
        );
      }

      const isVisibility = data.logScope === 'public' ? true : false;
      log.title = data.logTitle;
      log.content = data.logEditorContent;
      log.isVisibility = isVisibility;
      log.category = data.logCategory;
      log.thumbnail = data.thumbnailUrl;
      log.tags = data.logHashtags;
      log.logConentHTML = data.logConentHTML;

      await log.save();
      revalidateTag('modify');
      return NextResponse.json(
        {
          success: true,
          logId: log._id,
        },
        { status: 200 },
      );
    } catch (e: any) {
      return NextResponse.json(
        {
          success: false,
          message: e.message || 'unknown error occured while updating log',
        },
        { status: 500 },
      );
    }
  })(req, res);
}
