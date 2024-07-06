import { create } from 'zustand';
//로그 카테고리변경시 searchParams 유지를 위한 store
type State = {
  searchParamsStore: { [key: string]: string };
};

type Action = {
  updateCategory: (category: string) => void;
  updatePeriod: (period: string) => void;
};

export const useSearchParamsStore = create<State & Action>(set => ({
  searchParamsStore: {},
  updateCategory: category =>
    set(state => ({
      searchParamsStore: {
        ...state.searchParamsStore,
        category: category,
      },
    })),
  updatePeriod: period =>
    set(state => ({
      searchParamsStore: {
        ...state.searchParamsStore,
        period: period,
      },
    })),
}));
