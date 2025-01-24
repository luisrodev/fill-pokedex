import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ConfigurationStoreActions = {
  toggleSound: () => void;
};

type ConfigurationStore = {
  isSoundOn: boolean;

  actions: ConfigurationStoreActions;
};

const INITIAL_STORE_STATE = {
  isSoundOn: false,
};

const store: StateCreator<ConfigurationStore> = (
  set,
  get
): ConfigurationStore => ({
  ...INITIAL_STORE_STATE,
  actions: {
    toggleSound: () => set({ isSoundOn: !get().isSoundOn }),
  },
});

const configurationStore = create(
  persist(store, {
    name: "configuration",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) =>
      Object.fromEntries(
        Object.keys(INITIAL_STORE_STATE).map((key) => [
          key,
          state[key as keyof typeof state],
        ])
      ),
  })
);

export const useSoundOn = () => configurationStore((state) => state.isSoundOn);
export const useConfigurationActions = () =>
  configurationStore((state) => state.actions);
