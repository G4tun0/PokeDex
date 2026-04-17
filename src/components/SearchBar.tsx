import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchBar = ({
  onSearch,
  onClear,
  placeholder = 'Buscar pokémon...',
}: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === '') onClear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  const handleClear = () => {
    setValue('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg
                     text-sm outline-none focus:border-blue-500 focus:ring-1
                     focus:ring-blue-500 transition-colors"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2
                       text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg
                   hover:bg-blue-600 active:scale-95 transition-all"
      >
        Buscar
      </button>
    </form>
  );
};