import React from "react";
import sectionsData from "./sectionsData";
import dat from "./dat";
import "./conflict.css";

export default function Conflictor() {
  const sections = sectionsData;
  const sec_005_count = dat;

  setBg = e => {
    e.target.setAttribute("style", "background: #ccc;");
    console.log("sets");
  };

  const SectionList = () =>
    sections.map(sec => (
      <li key={sec.num} className="on" onClick={setBg}>
        <span className={sec.counts.length > 1 ? "sec-num-cx" : "sec-num"}>
          <b>{sec.num}</b>
        </span>
        <div>
          {sec.counts.map((count, i) => (
            <div key={i}>
              <b>{count.counter}</b>
              <b>
                {count.timeOut} | {count.timeIn}
              </b>
            </div>
          ))}
        </div>
      </li>
    ));

  const CountList = () =>
    sec_005_count.map(sku => (
      <li
        className={sku.counts.length > 1 ? "conflict" : "noncon"}
        key={sku.num}
      >
        <b className={sku.counts.length > 1 ? "cf-desc" : "desc"}>{sku.desc}</b>
        <div>
          {sku.counts.length > 1 ? (
            sku.counts.map((count, i) => (
              <div className="count" key={i}>
                <b>{count.qty}</b>
                <b>{count.counter}</b>
              </div>
            ))
          ) : (
            <b />
          )}
        </div>
        <b>
          <input value={sku.resolve} />
        </b>
      </li>
    ));

  return (
    <div>
      <h1>• Conflictor •</h1>
      <div className="container">
        <header>
          <div className="sections-sec">
            <h4>Sections:</h4>
            <div>No.</div>
            <div>Counter</div>
            <div>In | Out</div>
          </div>
          <div className="counts-sec">
            <h4>Counts</h4>
            <div>Description</div>
            <div>Conflict</div>
            <div>Resolve</div>
          </div>
        </header>
        <ul className="col-sections">
          <SectionList />
        </ul>
        <ul className="col-count">
          <CountList />
        </ul>
      </div>
    </div>
  );
}
