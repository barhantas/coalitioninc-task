import React, { useContext, useEffect } from "react";

import { useFetch } from "../../hooks";

import { LayoutContext } from "../../contexts";

import { URLS } from "../../constants";

function Home() {
  const { setHeaderComponent } = useContext(LayoutContext);

  const { data, doFetch } = useFetch();

  useEffect(() => {
    setHeaderComponent(<b>Create new product</b>);
    doFetch({
      url: URLS.brokers,
    });

    return () => {
      setHeaderComponent(null);
    };
  }, []);

  // const brokerList = data;
  // console.log(brokerList);

  return (
    <div>
      Home Page
      {/* {brokerList &&
        brokerList.map((broker) => (
          <div
            style={{ padding: 16, borderBottom: 2, borderBottomColor: "gray" }}
          >
            <p>Broker ID: {broker.id}</p>
            <p>Broker Name: {broker.name}</p>
            <p>Broker Surname: {broker.surname}</p>
          </div>
        ))} */}
    </div>
  );
}

export default Home;
