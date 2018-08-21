import React from 'react';
import { Card as AntCard } from 'antd';
import { BOX_SHADOW } from 'constants';


export const Card = (props) => {
  const {
    title, loading, style, children,
  } = props;

  const cardProps = {
    title,
    loading,
    bordered: false,
    style: { boxShadow: BOX_SHADOW, ...style },
  };

  return (
    <AntCard {...cardProps}>
      {children}
    </AntCard>
  );
};
