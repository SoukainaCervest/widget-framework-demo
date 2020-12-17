import { get } from 'axios';

import LineChart from 'components/charts/line-chart';
import DynamicSentence from 'components/sentence';
import Widget from 'components/widget';

import styles from './styles.module.scss';

const getData = async () => {
  const { data } = await get('https://jsonplaceholder.typicode.com/posts');

  return data;
};

const parseData = (data) =>
  data?.map((d) => ({
    ...d,
    year: 2000 + d.id,
    riskPct: d.id,
  }));

export default ({ params, onChangeParam }) => (
  <Widget name="asset-risk" getData={getData} parseData={parseData}>
    {({ data }) => {
      const { riskPct } = data?.find((d) => d.year === params?.year) || {};

      return (
        <div className={styles.wrapper}>
          <DynamicSentence
            className={styles.sentence}
            template="Your hotel portfolio in San Francisco, CA, USA is composed of 53 assets. In {{year}} under the {{scenario}}, {{riskPct}}% of them will be at <span>{{risk}}</span> of critical disruption."
            params={{
              ...params,
              riskPct: riskPct || '0',
            }}
          />
          <LineChart
            className={styles.chart}
            data={data}
            config={{
              dataKey: 'riskPct',
              xAxis: 'year',
              xReference: `${params?.year}`,
            }}
            onClick={(payload) =>
              onChangeParam({ year: payload?.year || params?.year })}
          />
        </div>
      );
    }}
  </Widget>
);
