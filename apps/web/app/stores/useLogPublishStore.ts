import { create } from 'zustand';
import { logsCategoryList } from '@/constant';
//제거예정
type State = {
  blogVisibility: 'public' | 'private';
  logCategory:
    | 'frontend'
    | 'backend'
    | 'data'
    | 'db'
    | 'ios'
    | 'android'
    | 'ai'
    | 'game'
    | 'embedded'
    | 'security'
    | 'etc';
  tumbnail: string;
  tags: string[];
};

type Action = {
  updateblogVisibility: (scope: string) => void;
  updateLogCategory: (category: string) => void;
  updateTumbnail: (url: string) => void;
  updateTags: (tags: string[]) => void;
  clear: () => void;
};

export const useRecordStore = create<State & Action>(set => ({}));
