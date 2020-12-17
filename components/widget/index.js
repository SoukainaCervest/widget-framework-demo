import { useQuery } from 'react-query';

import styles from './styles.module.scss';

const WidgetWrapper = ({ name, children, params, getData, parseData }) => {
  const { data, isLoading } = useQuery([name, params], () => getData(params));
  const parsedData = parseData(data);

  return (
    <div className={styles.wrapper}>
      {isLoading && <div className={styles.loading}>loading...</div>}
      {children({ rawData: data, data: parsedData, params })}
    </div>
  );
};

export default WidgetWrapper;
