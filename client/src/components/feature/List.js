import React from 'react';
import FeatureCurrentItem from "../../containers/feature/CurrentItem"

export default function FeatureList(props) {
  return (
    <div className="FeatureList">
      {props.features.items.map((feature) =>
        <FeatureCurrentItem key={feature.id.toString()} feature={feature}/>
      )}
    </div>
  );
}
