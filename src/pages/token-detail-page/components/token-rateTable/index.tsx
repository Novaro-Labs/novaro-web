import { useState } from "react";
import NovButtonGroup from "../../../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
// import { Table } from "@web3uikit/core";
import "./index.less"
import { Table } from "antd"

const TokenRateTable = () => {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  const Columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        if (text === 'Sell') {
          return <span style={{ color: '#C3492F' }}>Sell</span>
        } else {
          return <span style={{ color: '#2DB83B' }}>Buy</span>
        }
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (_, {cost, eth}) => {
        return <span>{cost}<span style={{ color: '#bbb'}}> ({eth}ETH)</span></span>
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ]

  const data = [
    {
      user: '0x1d8...426e',
      type: 'Sell',
      amount: '1 minute',
      cost: '$0.70',
      eth: '0.001',
      date: '9 hours ago'
    },
    {
      user: '0x1d8...426e',
      type: 'Buy',
      amount: '1 minute',
      cost: '$0.70',
      eth: '0.001',
      date: '9 hours ago'
    },
    {
      user: '0x1d8...426e',
      type: 'Sell',
      amount: '1 minute',
      cost: '$0.70',
      eth: '0.001',
      date: '9 hours ago'
    },
    {
      user: '0x1d8...426e',
      type: 'Buy',
      amount: '1 minute',
      cost: '$0.70',
      eth: '0.001',
      date: '9 hours ago'
    },
    {
      user: '0x1d8...426e',
      type: 'Sell',
      amount: '1 minute',
      cost: '$0.70',
      eth: '0.001',
      date: '9 hours ago'
    },
    {
      user: '0x1d8...426e',
      type: 'Buy',
      amount: '1 minute',
      cost: '$0.70',
      eth: '0.001',
      date: '9 hours ago'
    },
    {
      user: '0x1d8...426e',
      type: 'Sell',
      amount: '1 minute',
      cost: '$0.70',
      eth: '0.001',
      date: '9 hours ago'
    },
    {
      user: '0x1d8...426e',
      type: 'Buy',
      amount: '1 minute',
      cost: '$0.70',
      eth: '0.001',
      date: '9 hours ago'
    }
  ]

  const tab = ['Activity', 'Top Holder']

  return (
    <div>
      <NovButtonGroup children={tab}/>
      {/* table */}
      <div className="mt-4">
        <Table
          rowClassName="even-row"
          columns={Columns}
          dataSource={data}
          loading={loading}
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>

    </div>
  )
}

export default TokenRateTable;