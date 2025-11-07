import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  return (
    <SearchBar 
      placeholder="Search by Patient ID..."
      onSearch={(value) => console.log('Search:', value)}
    />
  );
}
