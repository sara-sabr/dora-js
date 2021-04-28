import { GetterTree } from "vuex";
import { RootState } from "@/store/state";
import isEmpty from "lodash.isempty";
import { Section } from "@/store/state";
import { PageModel, SurveyModel } from "survey-vue";

export type Getters = {
  /**
   * Checks whether the store has any user data saved.
   * @returns Returns true if data is saved, false if not
   */
  inProgress(state: RootState): boolean;
  /**
   * Returns all app sections by name
   * @returns An array of strings containing the sections names, an empty array if there no sections are available.
   * */
  returnSectionsNames(state: RootState): string[];
  /**
   * @param state The store state
   * @param sectionName A string containining the section name to evaluate
   * @returns A Section object if the sectionName is found, undefined if not found.
   */
  returnSectionByName(
    state: RootState
  ): (sectionName: string) => Section | undefined;
  returnSectionsByPrefix(
    state: RootState
  ): (surveyData: SurveyModel, prefix: string) => PageModel[];
  returnCurrentSection(state: RootState): Section | undefined;
  resultsDataSections(state: RootState): any;
  returnSurveyModel(state: RootState): SurveyModel | undefined;
  returnCurrentPageNumber(state: RootState): number;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  inProgress(state: RootState) {
    return !isEmpty(state.toolData);
  },
  returnSectionsNames(state: RootState) {
    let sectionsNames: string[] = [];
    if (state.surveyModel !== undefined) {
      state.surveyModel.pages.forEach(page => {
        if (page.name.includes(state.sectionsPrefix)) {
          sectionsNames.push(page.name);
        }
      });
    }
    return sectionsNames;
  },
  returnSectionByName(state: RootState) {
    return (sectionName: string) => {
      return state.sections.find(
        section => section.sectionName === sectionName
      );
    };
  },
  returnSectionsByPrefix(state: RootState) {
    return (surveyData: SurveyModel, prefix: string) => {
      let sections: PageModel[] = [];
      surveyData.pages.forEach(page => {
        if (page.name.includes(prefix)) {
          sections.push(page);
        }
      });
      return sections;
    };
  },
  returnCurrentSection(state: RootState) {
    return state.sections.find(section => {
      return section.sectionName === state.currentPageName;
    });
  },
  /**
   * Following functions were kept during refactor to avoid breaking
   * functionalities but should be removed and replaced by
   * mapState instead*/
  resultsDataSections(state: RootState) {
    let allResults = [];
    if (state.toolData === undefined) return {};
    allResults = state.toolData;
    return allResults;
  },
  returnSurveyModel(state: RootState) {
    if (state.surveyModel === undefined) {
      return undefined;
    } else {
      return state.surveyModel;
    }
  },
  returnCurrentPageNumber(state: RootState) {
    return state.currentPageNo;
  }
};