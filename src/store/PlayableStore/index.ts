import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Xtream } from "@iptv/xtream-api";

const categorySchema = z.enum(["livestreams", "vods", "series"]);

type TPlayableStore = {
  category: z.infer<typeof categorySchema> | null;
  setCategory: (category: TPlayableStore["category"]) => void;
};

export const usePlayableStore = create<TPlayableStore>()(
  persist(
    (set) => ({
      category: null,
      setCategory: (category) => set({ category }),
    }),
    {
      name: "playable-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
