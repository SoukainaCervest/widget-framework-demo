import { get } from 'axios';
import sumBy from 'lodash/sumBy';
import { format } from 'd3-format';

import Select from 'react-select';

import LineChart from 'components/charts/line-chart';
import DynamicSentence from 'components/sentence';
import Widget from 'components/widget';

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
    label: 'emissions stable by 2100',
    value: 'rcp4.5',
  },
  {
    label: 'business as usual',
    value: 'rcp8.5',
  },
];

const getData = async (params) => {
  const { data: historicalData } = await get(
    "https://cervest-science.carto.com/api/v2/sql?q=SELECT month, AVG(metric), STDDEV(metric) from hinc_signals WHERE scenario = 'historical' GROUP BY(month) ORDER BY(month)"
  );
  const { data: rcpData } = await get(
    `https://cervest-science.carto.com/api/v2/sql?q=SELECT month, AVG(metric), COUNT(metric) from hinc_signals WHERE year = ${params?.year} AND scenario = '${params?.scenario}' GROUP BY(month)`
  );

  return {
    historicalData: historicalData?.rows,
    rcpData: rcpData?.rows,
  };
};

const parseData = ({ historicalData, rcpData } = {}) => {
  const annualAvgTemp = sumBy(historicalData, 'avg') / 12;
  const annualAvgFutureTemp = sumBy(rcpData, 'avg') / 12;
  const chartData = historicalData?.map((d) => {
    const avg = d.avg - annualAvgTemp;

    return {
      ...d,
      avg,
      lowerStddev: avg - d.stddev,
      upperStddev: avg + d.stddev,
      rcp: rcpData?.find((r) => r.month === d.month)?.avg - annualAvgTemp,
    };
  });

  return {
    chartData,
    annualAvgTemp,
    annualAvgFutureTemp,
    statement: annualAvgFutureTemp > 0 ? 'warmer' : 'colder',
    tempChange: format('.1f')(annualAvgFutureTemp - annualAvgTemp),
  };
};

const WidgetAssetRisk = ({
  params = { scenario: 'historical' },
  onChangeParam,
}) => (
  <Widget
    name="asset-risk"
    getData={getData}
    parseData={parseData}
    params={params}
  >
    {({ data }) => (
      <div>
        <div className={styles.settings}>
          <Select
            options={rcpYears}
            value={rcpYears.find((y) => y.value === params?.year)}
            onChange={(value) => onChangeParam({ year: value?.value })}
          />
          <Select
            options={rcpOptions}
            value={rcpOptions.find((y) => y.value === params?.scenario)}
            onChange={(value) => onChangeParam({ scenario: value?.value })}
          />
        </div>
        <div className={styles.wrapper}>
          <DynamicSentence
            className={styles.sentence}
            template="Temperatures in {{year}}, in a scenario of {{scenario}}, will be {{statement}} than historical records by an average of {{tempChange}}°C across your asset portfolio."
            params={{
              ...params,
              scenario: rcpOptions?.find((r) => r.value === params?.scenario)
                ?.label,
              statement: data?.statement,
              tempChange: data?.tempChange,
            }}
          />
          <LineChart
            className={styles.chart}
            data={data?.chartData}
            config={{
              lines: [
                {
                  dataKey: 'avg',
                  stroke: 'black',
                },
                {
                  dataKey: 'rcp',
                  stroke: 'red',
                },
              ],
              areas: [
                {
                  dataKey: 'lowerStddev',
                  fill: '#555555',
                  stroke: '#555555',
                  opacity: 0.2,
                  strokeWidth: 0,
                  background: false,
                  activeDot: false,
                },
                {
                  dataKey: 'upperStddev',
                  fill: '#555555',
                  stroke: '#555555',
                  opacity: 0.2,
                  strokeWidth: 0,
                  background: false,
                  activeDot: false,
                },
              ],
              xAxis: {
                dataKey: 'month',
                interval: 0,
              },
              xReference: `${params?.year}`,
            }}
            onClick={(payload) =>
              onChangeParam({ year: payload?.year || params?.year })}
          />
        </div>
      </div>
    )}
  </Widget>
);

export default WidgetAssetRisk;
