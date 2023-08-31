import React from "react";
import styled from "./scss/card.module.scss";

/*
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string;
  title: string;
  description: any;
  smallText?: string;
}
*/

const Card = ({ header, title, description, smallText }) => (
  <div className={styled.styledCard}>
    {header && <div className="ch-header">{header}</div>}
    <div className="ch-body">
      <div className="ch-title">{title}</div>
      <div className="ch-description">{description}</div>
      {smallText && <small className={styled.smallText}>{smallText}</small>}
    </div>
  </div>
);

export default Card;
