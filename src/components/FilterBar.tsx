interface FilterBarProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const TYPES = [
  'all', 'fire', 'water', 'grass', 'electric',
  'psychic', 'ice', 'dragon', 'dark', 'fairy',
  'fighting', 'poison', 'bug', 'normal', 'ghost',
];

const TYPE_STYLES: Record<string, string> = {
  all:      'bg-gray-100 text-gray-700 border-gray-300',
  fire:     'bg-red-100 text-red-700 border-red-300',
  water:    'bg-blue-100 text-blue-700 border-blue-300',
  grass:    'bg-green-100 text-green-700 border-green-300',
  electric: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  psychic:  'bg-pink-100 text-pink-700 border-pink-300',
  ice:      'bg-cyan-100 text-cyan-700 border-cyan-300',
  dragon:   'bg-purple-100 text-purple-700 border-purple-300',
  dark:     'bg-gray-700 text-gray-100 border-gray-600',
  fairy:    'bg-pink-100 text-pink-600 border-pink-200',
  fighting: 'bg-orange-100 text-orange-700 border-orange-300',
  poison:   'bg-purple-100 text-purple-600 border-purple-300',
  bug:      'bg-lime-100 text-lime-700 border-lime-300',
  normal:   'bg-gray-100 text-gray-600 border-gray-300',
  ghost:    'bg-purple-100 text-purple-800 border-purple-300',
};

export const FilterBar = ({ selectedType, onTypeChange }: FilterBarProps) => {
  return (
    <div className="flex gap-2 flex-wrap justify-center my-4">
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`px-3 py-1 rounded-full text-xs font-medium border
                      transition-all capitalize
                      ${TYPE_STYLES[type]}
                      ${selectedType === type
                        ? 'scale-105 shadow-md ring-2 ring-offset-1 ring-current'
                        : 'opacity-60 hover:opacity-100'
                      }`}
        >
          {type === 'all' ? 'Todos' : type}
        </button>
      ))}
    </div>
  );
};