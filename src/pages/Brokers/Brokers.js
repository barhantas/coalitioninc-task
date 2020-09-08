import React, { useContext, useEffect } from "react";
import { Table } from "antd";

import { useFetch } from "../../hooks";
import { LayoutContext } from "../../contexts";
import { URLS } from "../../constants";

function Brokers() {
  const { setHeaderComponent } = useContext(LayoutContext);

  const { data, doFetch } = useFetch({ defaultValue: [] });

  useEffect(() => {
    setHeaderComponent(<b>Brokers</b>);

    doFetch({
      url: URLS.brokerList,
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Agency Name",
      dataIndex: "agency.title",
      key: "agency.title",
    },
    {
      title: "Agency Domain",
      dataIndex: "agency.domain",
      key: "agency.domain",
    },
  ];

  return <Table rowKey="_id" dataSource={data} columns={columns} />;
}

export default Brokers;
