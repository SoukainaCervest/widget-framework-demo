import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';

const CustomLineChart = ({ className, data, config, onClick }) => (
  <div style={{ height: config?.height || 300 }} className={className}>
    <ResponsiveContainer>
      <LineChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        data={data}
        onClick={(payload) => {
          onClick(payload?.activePayload?.[0]?.payload);
        }}
      >
        <Tooltip />
        <Line type="natural" dataKey={config?.dataKey} stroke="#52616B" />
        <ReferenceLine x={config?.xReference} stroke="#FF8576" />
        <XAxis axisLine={false} tickLine={false} dataKey={config?.xAxis} />
        <YAxis
          axisLine={false}
          tickLine={false}
          dataKey={config?.yAxis}
          tickMargin={10}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default CustomLineChart;
