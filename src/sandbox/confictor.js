import React from "react";
import sectionsData from "./sectionsData";
import sec_005 from "./sec_005_count";
import "./conflict.css";

export default function Conflictor() {
  const sections = sectionsData;
  const sec_005_count = sec_005;

  const SectionList = () =>
    sections.map(sec => (
      <li key={sec.num}>
        <span className="sec-num">
          <b>{sec.num}</b>
        </span>
        <div>
          {sec.counts.length > 1 ? (
            sec.counts.map((count, i) => (
              <div key={i} className="conflict">
                <b>{count.counter}</b>
                <b>
                  {count.timeOut} | {count.timeIn}
                </b>
              </div>
            ))
          ) : (
            <div>
              <b>{sec.counts[0].counter}</b>
              <b>
                {sec.counts[0].timeOut} | {sec.counts[0].timeIn}
              </b>
            </div>
          )}
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
          {sku.counts.map((count, i) => (
            <div className="count" key={i}>
              <b>{count.qty}</b>
              <b>{count.counter}</b>
            </div>
          ))}
        </div>
        <b>{sku.resolve}</b>
      </li>
    ));

  return (
    <div>
      <h1>Conflictor</h1>
      <div className="container">
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
