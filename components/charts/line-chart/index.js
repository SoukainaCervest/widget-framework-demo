import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Tooltip,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';

const CustomLineChart = ({ className, data, config, onClick }) => (
  <div style={{ height: config?.height || 300 }} className={className}>
    <ResponsiveContainer>
      <ComposedChart
        margin={{ left: -10 }}
        data={data}
        onClick={(payload) => {
          onClick(payload?.activePayload?.[0]?.payload);
        }}
      >
        <Tooltip />
        {config.lines?.map((l) => (
          <Line key={l.dataKey} dot={false} type="natural" {...l} />
        ))}
        {config.areas?.map((l) => (
          <Area key={l.dataKey} dot={false} type="natural" {...l} />
        ))}
        <ReferenceLine x={config?.xReference} stroke="#FF8576" />
        <XAxis {...config?.xAxis} />
        <YAxis
          axisLine={false}
          tickLine={false}
          dataKey={config?.yAxis}
          tickMargin={10}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export default CustomLineChart;
