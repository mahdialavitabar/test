import React, { FC, useEffect, useState } from "react";

import FilterData, { Filter } from "../Components/FilterData";
import mockedData from "../Data/data.json";
import moment from "jalali-moment";
import DataList from "../Components/DataLIst";

const HomePage: FC = () => {
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [data, setData] = useState({});
  const [raw] = useState(ungroupData(mockedData));

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    switch (filter) {
      case Filter.DATE:
        setData(groupByDate([...raw]));
        break;
      case Filter.PAYMENTS:
        setData(
          groupByDate([...raw.filter((i: any) => i.type === "payments")])
        );
        break;
      case Filter.FINANCE:
        setData(
          groupByDate([...raw.filter((i: any) => i.type === "trip_financials")])
        );
        break;
      case Filter.CONCURRENCY:
        setData(
          groupByDate([
            ...raw.filter((i: any) => i.type === "concurrency_costs"),
          ])
        );
        break;
      case Filter.MISC:
        setData(
          groupByDate([...raw.filter((i: any) => i.type === "misc_expenses")])
        );
        break;
      default:
        setData({ all: raw });
        break;
    }
  }, [filter]);

  return (
    <div className="m-2">
      <FilterData filter={filter} onFilterChange={handleFilterChange} />
      <DataList data={data} />
    </div>
  );
};

export default HomePage;

function ungroupData(val: any): any {
  return Object.keys(val).reduce((a, v) => {
    const temp = val[v].map((element: any) => ({ ...element, type: v }));
    return a.concat(temp);
  }, []);
}

function groupByDate(val: any[]) {
  const temp = val.map((i) => ({
    ...i,
    date: moment(i["created_at" || "request_datetime" || "datetime"])
      .locale("fa")
      .format("YYYY/MM/DD"),
  }));
  return groupBy(temp, "date");
}

function groupBy(xs: any, key: any) {
  return xs.reduce((a: any, v: any) => {
    (a[v[key]] = a[v[key]] || []).push(v);
    return a;
  }, {});
}
