import RecordFilter from '../RecordFilter';

export default function RecordFilterExample() {
  return (
    <RecordFilter 
      onFilterChange={(filters) => console.log('Filters changed:', filters)}
    />
  );
}
