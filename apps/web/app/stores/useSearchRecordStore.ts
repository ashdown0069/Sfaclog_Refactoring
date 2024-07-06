import { create } from 'zustand';
//검색기록을 저장하는 store
type State = {
  records: string[];
};

type Action = {
  updateRecord: (record: string) => void;
  deleteRecord: (record: string) => void;
  deleteAllRecord: () => void;
};

export const useRecordStore = create<State & Action>(set => ({
  records: [],
  updateRecord: record =>
    set(state => ({ records: [...state.records, record] })),
  deleteRecord: record =>
    set(state => ({ records: state.records.filter(el => el !== record) })),
  deleteAllRecord: () => set(() => ({ records: [] })),
}));
