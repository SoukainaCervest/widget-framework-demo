import dynamic from 'next/dynamic';
import { useState } from 'react';

import Select from 'react-select';

import styles from './styles.module.scss';

const rcpYears = [
  {
    label: '2030',
    value: '2030',
  },
  {
    label: '2040',
    value: '2040',
  },
  {
    label: '2050',
    value: '2050',
  },
];

const rcpOptions = [
  {
    label: 'Emissions stable by 2100',
    value: 'rcp4.5',
  },
  {
    label: 'Business as usual',
    value: 'rcp8.5',
  },
];

const widgets = {
  AssetRiskWidget: dynamic(() => import('../../components/widgets/asset-risk')),
};

const WidgetsLayout = () => {
  const [year, setYear] = useState('2030');
  const [scenario, setScenario] = useState('rcp4.5');

  const Widgets = Object.keys(widgets)?.map((w) => ({
    key: w,
    Component: widgets[w],
  }));

  return (
    <div className={styles.wrapper}>
      <h1>Widgets Demo</h1>
      <div className={styles.settings}>
        <Select
          options={rcpYears}
          value={rcpYears.find((y) => y.value === year)}
          onChange={(value) => setYear(value?.value)}
        />
        <Select
          options={rcpOptions}
          value={rcpOptions.find((y) => y.value === scenario)}
          onChange={(value) => setScenario(value?.value)}
        />
      </div>
      {Widgets.map((Widget) => (
        <Widget.Component key={Widget.key} params={{ scenario, year }} />
      ))}
    </div>
  );
};

export default WidgetsLayout;
