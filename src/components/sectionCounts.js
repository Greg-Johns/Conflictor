import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/conflict.css";

import * as actions from "../store/sectionCountsActions";

const CountConflicts = ({ sectionid }) => {
  const data = useSelector(state => state.sectionCountsReducer);
  const dispatch = useDispatch();

  const [sectionCounts, setSectionCounts] = useState(data.sectionCounts);
  const [loading, setLoader] = useState(data.loading);

  useEffect(() => {
    if (sectionid) {
      dispatch(
        actions.fetchSectionCounts(
          // `http://dalwindev05:83/api/Counts/validations?sectionId=${sectionid}`
          `http://dalwindev05:83/api/Counts/validations?sectionId=8AB31D15-4BAF-4034-6E7B-08D7857F90D0`
        )
      );
    }
  }, [sectionid]);

  useEffect(() => {
    setSectionCounts(data.sectionCounts);
    setLoader(data.loading);
  }, [data]);

  const SkuList = function() {
    return sectionCounts ? (
      sectionCounts.map((sku, skuIndex) => (
        <li
          className={
            !sku.validatedCount && sku.counts.length > 1 ? "conflict" : "noncon"
          }
          key={sku.key}
          id={sku.key}
        >
          <b
            className={
              !sku.validatedCount && sku.counts.length > 1 ? "cf-desc" : "desc"
            }
          >
            {sku.description}
          </b>
          <div>
            {sku.counts.length > 1 ? (
              sku.counts.map((count, countsIndex) => (
                <div
                  className={
                    count.validationStatus === "Validated"
                      ? "count valid"
                      : "count unValid"
                  }
                  key={countsIndex}
                  onClick={() =>
                    dispatch(
                      actions.resolveConflict(
                        count.count,
                        skuIndex,
                        countsIndex
                      )
                    )
                  }
                >
                  <b>{count.count}</b>
                  <b>{count.counter}</b>
                </div>
              ))
            ) : (
              <div />
            )}
          </div>
          {sku.counts.length > 1 ? (
            <b>
              <input
                onBlur={e =>
                  dispatch(actions.resolveAdmin(e.target.value, skuIndex))
                }
                value={sku.validatedCount}
              />
            </b>
          ) : (
            <b>
              <input
                onChange={() => console.log("clicked")}
                defaultValue={sku.counts[0].count}
              />
            </b>
          )}
        </li>
      ))
    ) : (
      <li className="biggy">
        <h5>2 Sections with conflicts</h5>
        <p>Please resolve all conflicts before exporting.</p>
      </li>
    );
  };

  return loading ? (
    <div class="loader">
      <p>Loading...</p>
    </div>
  ) : (
    <div>
      <header className="counts-sec">
        <div class="section-head">
          <h4>Counts</h4>
          <button
            onClick={() =>
              dispatch(
                actions.saveSectionCounts(
                  `http://dalwindev05:83/api/Counts/validations`,
                  sectionCounts
                )
              )
            }
          >
            Save
          </button>
        </div>
        <h5>Description</h5>
        <h5>Conflict</h5>
        <h5>Resolve</h5>
      </header>
      <ul className="col-counts" hidden={loading}>
        <SkuList />
      </ul>
    </div>
  );
};

export default CountConflicts;
