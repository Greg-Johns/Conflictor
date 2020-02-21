export const FETCH_INVENTORYLOG_BEGIN = "FETCH_INVENTORYLOG_BEGIN";
export const FETCH_INVENTORYLOG_SUCCESS = "FETCH_INVENTORYLOG_SUCCESS";
export const FETCH_INVENTORYLOG_FAILURE = "FETCH_INVENTORYLOG_FAILURE";

import sectionData from "./data/sectionsData";

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchInventoryLogBegin = () => ({
  type: FETCH_INVENTORYLOG_BEGIN
});

export const fetchInventoryLogSuccess = data => ({
  type: FETCH_INVENTORYLOG_SUCCESS,
  payload: data
});

export const fetchInventoryLogFailure = error => ({
  type: FETCH_INVENTORYLOG_FAILURE,
  payload: { error }
});

export function fetchInventoryLog(url) {
  return async dispatch => {
    dispatch(fetchInventoryLogBegin());
    return fetch(sectionData)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        data.manualTypes = [];
        data.scannerTypes = [];
        data.sections.map(section => {
          section.sectionCounts.map(count => {
            if (count.sectionCountType === "Manual") {
              data.manualTypes.push(count);
            } else {
              data.scannerTypes.push(count);
            }
          });
        });
        switch (data.inventoryStatusId) {
          case "Active":
            data.statusIndicator = "orange";
            break;
          case "Completed":
            data.statusIndicator = "green";
          default:
            data.statusIndicator = "grey";
            break;
        }
        dispatch(fetchInventoryLogSuccess(data));
        return {
          data
        };
      })
      .catch(error => dispatch(fetchInventoryLogFailure(error)));
  };
}
