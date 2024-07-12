import React from "react";
import Title from "./Title";

const Section = ({ title, classNames, children }) => {
  return (
    <section className={`clean-block ${classNames} h-100`}>
      <div className="container">
        <Title text={title} />
        {children}
      </div>
    </section>
  );
};

export default Section;
