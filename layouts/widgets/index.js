import dynamic from 'next/dynamic';
import { useState } from 'react';

import styles from './styles.module.scss';

const widgets = {
  AssetRiskWidget: dynamic(() => import('../../components/widgets/asset-risk')),
};

const WidgetsLayout = () => {
  const [state, setState] = useState({
    year: '2035',
    scenario: 'business as usual',
    risk: 'high risk',
  });

  const Widgets = Object.keys(widgets)?.map((w) => ({
    key: w,
    Component: widgets[w],
  }));

  return (
    <div className={styles.wrapper}>
      <h1>Widgets</h1>
      {Widgets.map((Widget) => (
        <Widget.Component
          key={Widget.key}
          params={state}
          onChangeParam={(params) => setState({ ...state, ...params })}
        />
      ))}
    </div>
  );
};

export default WidgetsLayout;
