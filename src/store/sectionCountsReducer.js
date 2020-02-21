import {
  FETCH_SECTION_COUNTS_BEGIN,
  FETCH_SECTION_COUNTS_SUCCESS,
  FETCH_SECTION_COUNTS_FAILURE,
  SAVE_SECTION_COUNTS_BEGIN,
  SAVE_SECTION_COUNTS_SUCCESS,
  SAVE_SECTION_COUNTS_FAILURE,
  RESOLVE_CONFLICT,
  RESOLVE_ADMIN,
  FINISH_INVENTORY
} from "./sectionCountsActions";

const initialState = {
  loading: true,
  sectionCounts: [],
  error: null
};

export default function sectionCountsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SECTION_COUNTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SECTION_COUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        sectionId: action.payload.sectionId,
        sectionCounts: action.payload
      };
    case FETCH_SECTION_COUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case SAVE_SECTION_COUNTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_SECTION_COUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        sectionId: action.payload.sectionId,
        sectionCounts: action.payload
      };
    case SAVE_SECTION_COUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case RESOLVE_CONFLICT:
      return Object.assign({}, state, {
        ...state,
        sectionCounts: state.sectionCounts.map((sec, i) => {
          if (i === action.skuIndex) {
            return Object.assign({}, sec, {
              status: "Validated",
              validatedCount: action.count,
              counts: state.sectionCounts[action.skuIndex].counts.map(
                (skuCount, ix) => {
                  if (ix === action.countsIndex) {
                    return Object.assign({}, skuCount, {
                      validationStatus: "Validated"
                    });
                  } else {
                    return Object.assign({}, skuCount, {
                      validationStatus: "NotValidated"
                    });
                  }
                }
              )
            });
          } else {
            return Object.assign({}, sec);
          }
        })
      });

    case RESOLVE_ADMIN:
      return Object.assign({}, state, {
        ...state,
        sectionCounts: state.sectionCounts.map((sec, i) => {
          if (i === action.skuIndex) {
            return Object.assign({}, sec, {
              status: "Validated",
              validatedCount: action.count,
              // check to see if admin count is already present
              // counts: [...state.sectionCounts[action.skuIndex].counts,
              counts: [
                ...state.sectionCounts[action.skuIndex].counts,
                {
                  validationStatus: "Validated",
                  counter: "admin",
                  count: action.count,
                  sectionId: "fac71aad-f917-44d7-5fd9-08d793b2323a",
                  sectionCountType: "Scanner",
                  countedOn: "2020-02-18T13:47:53.4994068-06:00",
                  physicalCountId: "c5e785fb-0ac0-42cc-432c-08d7b4ab5d88",
                  sectionCountId: "89b89f58-e7a4-43e5-b83c-08d7b4ab4fb3",
                  sku: "SS550",
                  scanned: "SKU",
                  description: "SILL SEALER 5.5 X 50'",
                  uom: "EA"
                }
              ]
            });
          } else {
            return Object.assign({}, sec);
          }
        })
      });

    case FINISH_INVENTORY:
      return state;

    default:
      return state;
  }
}
