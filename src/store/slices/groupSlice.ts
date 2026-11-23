import type { AppSlice, GroupSlice } from "../types";
import mockData from "../../data/mockData.json";
import type { Group } from "../../types";

const initialGroups = mockData as Group[];

export const createGroupSlice: AppSlice<GroupSlice> = (set) => ({
  groups: initialGroups,
  activeGroupId: initialGroups[0]?.id ?? null,
  currentUserId: "m-alex",

  setActiveGroupId: (id) => set({ activeGroupId: id }),
  setCurrentUserId: (id) => set({ currentUserId: id }),

  addGroup: ({ name, description, members }) => {
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name,
      description,
      members,
      expenses: [],
      settlements: [],
    };
    set((state) => ({
      groups: [newGroup, ...state.groups],
      activeGroupId: newGroup.id,
    }));
  },

  deleteGroup: (groupId) => {
    set((state) => {
      const filtered = state.groups.filter((g) => g.id !== groupId);
      return {
        groups: filtered,
        activeGroupId: filtered.length > 0 ? filtered[0].id : null,
      };
    });
  },
});
