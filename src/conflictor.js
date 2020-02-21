import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as inventoryLogActions from "./store/inventoryLogActions";
import "./styles/conflict.css";
import SectionCounts from "./components/sectionCounts";

import dayjs from "dayjs";
import * as actions from "./store/sectionCountsActions";

const Conflictor = ({ inventoryId }) => {
  const sectionData = useSelector(state => state.inventoryLogReducer);
  const dispatch = useDispatch();

  const [sections, setSections] = useState(sectionData.subItems);
  // const [section, setSection] = useState(sectionData.subItems);
  const [loading, setLoader] = useState(sectionData.loading);
  const [sectionId, setSectionId] = useState("");

  useEffect(() => {
    dispatch(inventoryLogActions.fetchInventoryLog(`${inventoryId}`));
  }, [dispatch, inventoryId]);

  useEffect(() => {
    setSections(sectionData.subItems);
    setLoader(sectionData.loading);
  }, [sectionData]);

  /**
   * @name handleClick
   */
  // keep in state
  const handleClick = (selected, id) => {
    setSectionId(id);
    let allSections = document.querySelectorAll("#sectionCounts");
    allSections.forEach(count => count.classList.remove("selected-section"));
    selected.classList.add("selected-section");
  };

  const SectionList = sections.map(section => {
    const noManCount = section.sectionCounts.filter(
      count => count.sectionCountType === "Scanner"
    );

    return (
      <li
        key={section.sectionId}
        id="sectionCounts"
        sectionname={`${section.sectionPrefix}${section.sectionName}`}
        onClick={e => handleClick(e.currentTarget, section.sectionId)}
      >
        <span className={noManCount.length > 2 ? "sec-num-cx" : "sec-num"}>
          <b>{section.sectionPrefix + section.sectionName}</b>
        </span>
        <div>
          {noManCount.map((count, i) => (
            <div key={i}>
              <b>{count.teamName}</b>
            </div>
          ))}
        </div>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="locInfo">
        <h1>{sectionData.location}</h1>
        <p>
          Start Date:
          <br />
          <strong>
            {dayjs(sectionData.startDate).format("dddd MMM DD YYYY")}
          </strong>
        </p>
        <button onClick={() => dispatch(actions.finishInventory())}>
          Complete Inventory
        </button>
      </div>
      {loading && <p>loading...</p>}
      <div>
        <header className="sections-sec">
          <div class="section-head">
            <h4>Sections:</h4>
          </div>
          <h5>No.</h5>
          <h5>Counter</h5>
        </header>
        <ul className="col-sections" hidden={loading}>
          {SectionList}
        </ul>
      </div>
      <SectionCounts sectionid={sectionId} />
    </div>
  );
};

export default Conflictor;
