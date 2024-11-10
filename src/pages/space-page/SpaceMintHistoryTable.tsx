import NovaroTable from "@/components/Basic/NovaroTable";

const records = [
  {
    id: 1,
    activity: "Collected daily ME",
    point: 550,
    data: "2024-08-18",
  },
  {
    id: 2,
    activity: "No check-ins for 7 consecutive days",
    point: -550,
    data: "2024-08-18",
  },
  {
    id: 3,
    activity: "Collected daily ME",
    point: -350,
    data: "2024-08-18",
  },
  {
    id: 4,
    activity: "Energy collected by",
    point: 450,
    data: "2024-08-18",
  },
  {
    id: 5,
    activity: "Another activity",
    point: 300,
    data: "2024-08-18",
  },
];

const columns = [
  { title: "Activity", dataIndex: "activity", key: "activity" },
  { title: "Point", dataIndex: "point", key: "point" },
  { title: "Date", dataIndex: "data", key: "data" },
];

const SpaceMintHistoryTable = () => {
  return (
    <div className="space-y-4 pt-6">
      <div className="text-xl font-semibold text-[#202226]">DST Credit Feed Activities</div>
      <NovaroTable
        dataSource={records}
        columns={columns}
        loading={false}
        pageSize={0}
      />
    </div>
  );
};

export default SpaceMintHistoryTable;
