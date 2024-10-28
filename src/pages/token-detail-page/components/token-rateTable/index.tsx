import { useState } from "react";
import NovButtonGroup from "../../../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import { Table } from "@web3uikit/core";

const TokenRateTable = () => {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const data = [
    [
      "0x1d8...426e",
      <span style={{ color: '#C3492F'}}>Sell</span>,
      "1 minute",
      "$0.70(0.001ETH)",
      "9 hours ago"
    ],
    [
      "0x1d8...426e",
      <span style={{ color: '#2DB83B'}}>Buy</span>,
      "1 minute",
      "$0.70(0.001ETH)",
      "9 hours ago"
    ],
    [
      "0x1d8...426e",
      "Sell",
      "1 minute",
      "$0.70(0.001ETH)",
      "9 hours ago"
    ],
    [
      "0x1d8...426e",
      "Sell",
      "1 minute",
      "$0.70(0.001ETH)",
      "9 hours ago"
    ],
    [
      "0x1d8...426e",
      "Sell",
      "1 minute",
      "$0.70(0.001ETH)",
      "9 hours ago"
    ],
    [
      "0x1d8...426e",
      "Sell",
      "1 minute",
      "$0.70(0.001ETH)",
      "9 hours ago"
    ],
    [
      "0x1d8...426e",
      "Sell",
      "1 minute",
      "$0.70(0.001ETH)",
      "9 hours ago"
    ]
  ]

  const tab = ['Activity', 'Top Holder']

  return (
    <div>
      <NovButtonGroup children={tab}/>
      {/* table */}
      <div className="mt-4">
        <Table
          columnsConfig="2fr 2fr 2fr 2fr 2fr"
          header={[
            <span>User</span>,
            <span>Type</span>,
            <span>Amount</span>,
            <span>Cost</span>,
            <span>Date</span>
          ]}
          maxPages={3}
          data={data}
          pageSize={5} />
      </div>

    </div>
  )
}

export default TokenRateTable;