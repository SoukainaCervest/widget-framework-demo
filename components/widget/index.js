import { useQuery } from 'react-query';

import styles from './styles.module.scss';

const WidgetWrapper = ({ name, children, params, getData, parseData }) => {
  const refetchParams = params && Object.values(params);
  const { data, isLoading, error } = useQuery(
    [name, ...(refetchParams || [])],
    getData
  );
  const parsedData = parseData(data);

  return (
    <div className={styles.wrapper}>
      {isLoading && <div>loading...</div>}
      {error && <div>error!</div>}
      {children({ rawData: data, data: parsedData, params })}
    </div>
  );
};

export default WidgetWrapper;
