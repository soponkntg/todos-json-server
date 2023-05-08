import React from "react";
import styled from "styled-components";

interface ProgressProps {
  percent: number;
  count: number;
}

const ProgressContainer = styled.div`
  background: #e07c7c;
  border-radius: 20px;
  height: 123px;
  padding: 18px 19px 0;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

const ProgressTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  color: #ffffff;
`;

const ProgressBar = styled.div<Pick<ProgressProps, "percent">>`
  position: relative;
  width: 100%;
  height: 8px;
  background: #3b3b3b;
  border-radius: 999px;
  overflow: hidden;

  :before {
    content: "";
    position: absolute;
    width: ${(props) => props.percent}%;
    height: 100%;
    background: #ffffff;
    border-radius: 999px;

    transition: width 0.5s ease-in-out;
  }
`;

const ProgressDetail = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ebb9b8;
`;

export const Progress: React.FC<ProgressProps> = ({ percent, count }) => {
  return (
    <ProgressContainer>
      <ProgressTitle>Progress</ProgressTitle>
      <ProgressBar percent={percent} />
      <ProgressDetail>{count} completed</ProgressDetail>
    </ProgressContainer>
  );
};
