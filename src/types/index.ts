export type { CategorySlug } from "@/data/categories";
export type { PlanId } from "@/data/plans";

export type WithClassName = {
  className?: string;
};

export type WithChildren = {
  children: React.ReactNode;
};

export type WithChildrenAndClassName = WithClassName & WithChildren;
