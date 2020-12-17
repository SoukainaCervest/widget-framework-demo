import ReactHtmlParser from 'react-html-parser';
import cx from 'classnames';

import styles from './styles.module.scss';

const DynamicSentence = ({ className, template, params }) => {
  let sentence = template;
  if (params && sentence) {
    Object.keys(params).forEach((p) => {
      const param = params[p];
      if (param) {
        const regex = new RegExp(`{{${p}}}`, 'g');
        sentence = sentence.replace(regex, `<b>${param}</b>`);
      }
    });
  }

  return (
    <p className={cx(className, styles.sentence)}>
      {ReactHtmlParser(sentence)}
    </p>
  );
};

export default DynamicSentence;
