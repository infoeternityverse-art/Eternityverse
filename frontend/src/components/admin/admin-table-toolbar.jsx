import { SearchBar, Select } from '@/components/ui/index.js';

export function AdminTableToolbar({
  search,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  filters = [],
  sort,
  sortOptions = [],
  onSortChange,
}) {
  return (
    <div className="grid items-end gap-4 rounded-card border border-white/10 bg-[#080808] p-4 shadow-soft backdrop-blur-xl md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_repeat(3,200px)]">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        onClear={onSearchClear}
        placeholder="Search records"
      />
      {filters.map((filter) => (
        <Select
          key={filter.id}
          id={filter.id}
          label={filter.label}
          value={filter.value}
          onChange={(event) => filter.onChange(event.target.value)}
          options={filter.options}
        />
      ))}
      {sortOptions.length > 0 && (
        <Select
          id="sort"
          label="Sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          options={sortOptions}
        />
      )}
    </div>
  );
}
