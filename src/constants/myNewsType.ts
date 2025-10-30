export const MyNewsType = {
  SCRAP: "/my/scrap",
  CUSTOM: "/my/custom",
} as const;

export type MyNewsType =
  (typeof MyNewsType)[keyof typeof MyNewsType];
