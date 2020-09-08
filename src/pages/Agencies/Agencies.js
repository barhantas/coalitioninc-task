import React, { useContext, useEffect } from "react";
import { Table } from "antd";

import { useFetch } from "../../hooks";
import { LayoutContext } from "../../contexts";
import { URLS } from "../../constants";

function Agencies() {
  const { setHeaderComponent } = useContext(LayoutContext);
  const { data, doFetch } = useFetch({ defaultValue: [] });

  useEffect(() => {
    setHeaderComponent(<b>Agencies</b>);

    doFetch({
      url: URLS.agencyList,
    });

    return () => {
      setHeaderComponent(null);
    };
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return <Table rowKey="id" dataSource={data} columns={columns} />;
}

export default Agencies;
