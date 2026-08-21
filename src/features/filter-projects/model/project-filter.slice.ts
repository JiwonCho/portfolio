import { createSelector, createSlice, type PayloadAction, type WithSlice } from '@reduxjs/toolkit';

import { projects, type ProjectBrandId, type ProjectCategoryId } from '@/entities/project';
import { rootReducer } from '@/shared/store';

interface ProjectFilterState {
  category: ProjectCategoryId;
  brand: ProjectBrandId;
  featuredOnly: boolean;
}

const initialState: ProjectFilterState = {
  category: 'all',
  brand: 'all',
  featuredOnly: false,
};

const projectFilterSlice = createSlice({
  name: 'projectFilter',
  initialState,
  reducers: {
    categorySelected(state, action: PayloadAction<ProjectCategoryId>) {
      state.category = action.payload;
    },
    brandSelected(state, action: PayloadAction<ProjectBrandId>) {
      state.brand = action.payload;
    },
    featuredOnlyToggled(state) {
      state.featuredOnly = !state.featuredOnly;
    },
    filtersReset() {
      return initialState;
    },
  },
  selectors: {
    selectCategory: (state) => state.category,
    selectBrand: (state) => state.brand,
    selectFeaturedOnly: (state) => state.featuredOnly,
  },
});

// 타입 선언 병합은 인터페이스가 실제로 선언된 모듈을 지정해야 한다 (런타임 import 아님)
declare module '@/shared/store/root-reducer' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface LazyLoadedSlices extends WithSlice<typeof projectFilterSlice> {}
}

const injectedProjectFilterSlice = projectFilterSlice.injectInto(rootReducer);

export const { categorySelected, brandSelected, featuredOnlyToggled, filtersReset } =
  projectFilterSlice.actions;

export const { selectCategory, selectBrand, selectFeaturedOnly } =
  injectedProjectFilterSlice.selectors;

export const selectFilteredProjects = createSelector(
  [selectCategory, selectBrand, selectFeaturedOnly],
  (category, brand, featuredOnly) =>
    projects.filter((project) => {
      if (featuredOnly && !project.featured) return false;
      if (brand !== 'all' && project.brand !== brand) return false;
      if (category !== 'all' && !project.tags.includes(category)) return false;
      return true;
    }),
);

export const selectHasActiveFilter = createSelector(
  [selectCategory, selectBrand, selectFeaturedOnly],
  (category, brand, featuredOnly) => category !== 'all' || brand !== 'all' || featuredOnly,
);
