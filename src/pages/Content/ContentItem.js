/**
 * @Author : Duanjl
 * @Date: 9/10/2018
 * @Last Modified by：Duanjl
 * @Last modified time： 9/10/2018
 **/
import React from 'react';

const ContentItem = (props) => {
  console.log(props);
  const { match } = props;
  return (
    <div>
      content/contentItem:
      {match.params.id}
    </div>
  );
};

export default ContentItem;
