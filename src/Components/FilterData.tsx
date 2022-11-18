import { FC } from "react";

export enum Filter {
  ALL,
  DATE,
  FINANCE,
  PAYMENTS,
  MISC,
  CONCURRENCY
  
}

export type FilterProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

const FilterData: FC<FilterProps> = ({
  filter,
  onFilterChange,
}: FilterProps) => {
  const handleSelectChange = (event: any) => {
    onFilterChange(+event.target.value);
  };
  return (
    <div className="text-center">
      filters:
      <select value={filter} onChange={handleSelectChange}>
        {Object.entries(Filter)
          .filter(([index]) => !isNaN(Number(index)))
          .map(([value, label]) => {
            return <option value={value} key={value}>{label}</option>;
          })}
      </select>
    </div>
  );
};

export default FilterData;
