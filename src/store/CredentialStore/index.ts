import { v4 } from "uuid";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const credentialTypeSchema = z.enum(["xtream"]);

export const credentialSchema = z.object({
  type: credentialTypeSchema,
  provider: z.object({
    name: z.string().optional(),
    url: z.string().url(),
  }),
  user: z.object({
    name: z.string(),
    password: z.string(),
  }),
});

export type TCredential = z.infer<typeof credentialSchema>;

export type TCredentialStore = {
  items: Record<string, TCredential>;
  addCredential: (credential: TCredential) => void;
  removeCredential: (id: string) => void;
  setActiveCredential: (id: string) => void;
  activeCredential: TCredential | null;
};

const useCredentialStore = create<TCredentialStore>()(
  persist(
    (set, get) => ({
      items: {},
      addCredential: (credential) => {
        set((state) => ({
          items: {
            ...state.items,
            [v4()]: credential,
          },
        }));
      },
      removeCredential: (id) => {
        const activeCredential = get().activeCredential;

        if (activeCredential && get().items[id] === activeCredential) {
          set({ activeCredential: null });
        }

        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...items } = state.items;
          return { items };
        });
      },
      setActiveCredential: (id) => {
        set({ activeCredential: get().items[id] });
      },
      activeCredential: null,
    }),
    {
      name: "credential-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useCredentialStore };
