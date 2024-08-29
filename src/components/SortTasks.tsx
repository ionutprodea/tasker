interface Props {
  onSortChange: (sortOption: string) => void;
}

const SortTasks = ({ onSortChange }: Props) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };
  return (
    <div className="centered-container">
      <select className="form-select" onChange={handleSortChange}>
        <option value="">Sort Tasks</option>
        <option value="high-low">Importance High to Low</option>
        <option value="low-high">Importance Low to High</option>
        <option value="date-ascending">Date Ascending</option>
        <option value="date-descending">Date Descending</option>
      </select>
    </div>
  );
};

export default SortTasks;
