import { atom } from "recoil";

export const toggleAtomstate = atom({
  key: "togglesidebaratom",
  default: false,
});

export const elapsedTimeAtom = atom({
  key: "elapsedTimeAtom",
  default: 0,
});

export const micPermissionAtom = atom({
  key: "micpermission",
  default: false,
});
