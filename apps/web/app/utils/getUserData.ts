'use server';
import { IUser, UserModel } from '@/models/User';

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findOne(
      {
        email: email,
      },
      '-password',
    ).exec();
    return user;
  } catch (e) {
    return null;
  }
};

export const getUserByUsername = async (
  username: string,
): Promise<IUser | null> => {
  try {
    const user = await UserModel.findOne({
      username: username,
    }).exec();
    return user;
  } catch (e) {
    return null;
  }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findOne(
      {
        _id: id,
      },
      '-password',
    )
      .lean()
      .exec();
    return user;
  } catch (e) {
    return null;
  }
};
