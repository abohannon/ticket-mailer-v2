import React from 'react';
import { Card as AntCard } from 'antd';
import { BOX_SHADOW } from 'constants';


export const Card = (props) => {
  const {
    title, loading, style, bodyStyle, headStyle, children,
  } = props;

  const cardProps = {
    title,
    loading,
    bordered: false,
    style: { boxShadow: BOX_SHADOW, ...style },
    bodyStyle: { padding: '1px 0px', ...bodyStyle },
    headStyle: {
      padding: '0px 16px',
      ...headStyle,
    },
  };

  return (
    <AntCard {...cardProps}>
      {children}
    </AntCard>
  );
};
