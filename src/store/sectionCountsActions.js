export const FETCH_SECTION_COUNTS_BEGIN = "FETCH_SECTION_COUNTS_BEGIN";
export const FETCH_SECTION_COUNTS_SUCCESS = "FETCH_SECTION_COUNTS_SUCCESS";
export const FETCH_SECTION_COUNTS_FAILURE = "FETCH_SECTION_COUNTS_FAILURE";
export const SAVE_SECTION_COUNTS_BEGIN = "SAVE_SECTION_COUNTS_BEGIN";
export const SAVE_SECTION_COUNTS_SUCCESS = "SAVE_SECTION_COUNTS_SUCCESS";
export const SAVE_SECTION_COUNTS_FAILURE = "SAVE_SECTION_COUNTS_FAILURE";
export const RESOLVE_CONFLICT = "RESOLVE_CONFLICT";
export const RESOLVE_ADMIN = "RESOLVE_ADMIN";
export const FINISH_INVENTORY = "FINISH_INVENTORY";

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchSectionCountsBegin = () => ({
  type: FETCH_SECTION_COUNTS_BEGIN
});
export const fetchSectionCountsSuccess = data => ({
  type: FETCH_SECTION_COUNTS_SUCCESS,
  payload: data
});
export const fetchSectionCountsFailure = error => ({
  type: FETCH_SECTION_COUNTS_FAILURE,
  payload: { error }
});

export const saveSectionCountsBegin = () => ({
  type: SAVE_SECTION_COUNTS_BEGIN
});
export const saveSectionCountsSuccess = data => ({
  type: SAVE_SECTION_COUNTS_SUCCESS,
  payload: data
});
export const saveSectionCountsFailure = error => ({
  type: SAVE_SECTION_COUNTS_FAILURE,
  payload: { error }
});

export function fetchSectionCounts(url) {
  return async dispatch => {
    dispatch(fetchSectionCountsBegin());
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchSectionCountsSuccess(data));
        return {
          data
        };
      })
      .catch(error => dispatch(fetchSectionCountsFailure(error)));
  };
}

export function saveSectionCounts(url, sections) {
  return async dispatch => {
    dispatch(saveSectionCountsBegin());
    // return await fetch(url)
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sections)
      // body: sections
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(saveSectionCountsSuccess(data));
        return {
          data
        };
      })
      .catch(error => dispatch(saveSectionCountsFailure(error)));
  };
}

export function resolveConflict(count, skuIndex, countsIndex) {
  return {
    type: RESOLVE_CONFLICT,
    count,
    skuIndex,
    countsIndex
  };
}

export function resolveAdmin(count, skuIndex) {
  return {
    type: RESOLVE_ADMIN,
    count,
    skuIndex
  };
}

export function finishInventory() {
  // /api/Inventory/{inventoryId}/export
  return {
    type: FINISH_INVENTORY
  };
}
