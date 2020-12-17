import Head from 'next/head';

import WidgetsLayout from 'layouts/widgets';

const Home = () => (
  <div>
    <Head>
      <title>Widget framework demo</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <WidgetsLayout />
  </div>
);

export default Home;
