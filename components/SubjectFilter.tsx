import { SubjectFilter as SubjectFilterType } from '@/types';

interface SubjectFilterProps {
  filters: SubjectFilterType[];
  onFilterChange: (filterId: number | null) => void;
  gradeSlug: string;
}

const SubjectFilter = ({ filters, onFilterChange, gradeSlug }: SubjectFilterProps) => {
  const bgClass = `bg-${gradeSlug}`;
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id === null ? 'all' : filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`${filter.active ? bgClass : 'bg-white'} ${filter.active ? 'text-white' : 'text-dark'} hover:${bgClass} hover:text-white font-heading font-bold px-4 py-2 rounded-full text-sm transition`}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default SubjectFilter;
