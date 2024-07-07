//@ts-nocheck
import { auth } from '@/auth/auth';
import { connectDB } from '@/lib/db';
import { CommentsModel } from '@/models/Comments';
import { NextRequest, NextResponse } from 'next/server';
/**
 * Server Side GET api/mypage/mycomments?page={number}
 * @description mypage 에서 나의 댓글들을 가져오는 api
 * @description  Server side에서 fetch사용시 헤더에 next/headers로 헤더를 불러와 첨부해야함
 * @description searchParams: page={number}
 * @returns user
 */
export const GET = auth(async (req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized - user not logged in',
      },
      { status: 401 },
    );
  }
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const userId = req.auth.user.userId;

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

  try {
    const foundComments = await CommentsModel.find({
      $or: [
        {
          author: userId,
        },
        { 'replies.author': userId },
      ],
    })
      .populate('log', 'title')
      .lean()
      .exec();

    let flatten = [];
    //답글 부분은 찾아도 댓글부분에 포함되어있어서 답글을 찾아서 push
    foundComments.forEach(comment => {
      if (comment.author.toString() === userId && comment.isDelete === false) {
        flatten.push(comment);
      }
      if (comment.replies.length > 0) {
        comment.replies.forEach(reply => {
          if (reply.author.toString() === userId && reply.isDelete === false) {
            //답글에는 log 정보가 없어서 추가해줌
            const newReply = { ...reply, log: { ...comment.log } };
            flatten.push(newReply);
          }
        });
      }
    });
    flatten = flatten.map(comment => {
      comment.replies = [];
      return comment;
    });

    return NextResponse.json(
      {
        success: true,
        comments: flatten,
        length: flatten.length,
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      { status: 500 },
    );
  }
});
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const searchParams = req.nextUrl.searchParams;
//   const page = searchParams.get('page') || '1';
//   if (!params.id || !page) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: `Invalid request - id or page params is required`,
//       },
//       { status: 400 },
//     );
//   }

//   try {
//     await connectDB();
//   } catch (err) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'can not connect to database',
//       },
//       { status: 500 },
//     );
//   }

//   const userId = params.id;
//   try {
//     const foundComments = await CommentsModel.find({
//       $or: [
//         {
//           author: userId,
//         },
//         { 'replies.author': userId },
//       ],
//     })
//       .populate('log', 'title')
//       .lean()
//       .exec();

//     let flatten = [];
//     //답글 부분은 찾아도 댓글부분에 포함되어있어서 답글을 찾아서
//     foundComments.forEach(comment => {
//       if (comment.author.toString() === userId && comment.isDelete === false) {
//         flatten.push(comment);
//       }
//       if (comment.replies.length > 0) {
//         comment.replies.forEach(reply => {
//           if (reply.author.toString() === userId && reply.isDelete === false) {
//             //답글에는 log 정보가 없어서 추가해줌
//             const newReply = { ...reply, log: { ...comment.log } };
//             flatten.push(newReply);
//           }
//         });
//       }
//     });
//     flatten = flatten.map(comment => {
//       comment.replies = [];
//       return comment;
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         comments: flatten,
//         length: flatten.length,
//       },
//       { status: 200 },
//     );
//   } catch (e: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: e.message,
//       },
//       { status: 500 },
//     );
//   }
// }
