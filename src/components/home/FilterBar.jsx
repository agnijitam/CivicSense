import React from 'react';
import { Search, X, Map, LayoutGrid, Columns2 } from 'lucide-react';
import { CATEGORIES, STATUS_LIST, DELHI_NCR_HUBS } from '../../data/mockData';

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedHub,
  setSelectedHub,
  viewMode,
  setViewMode,
  totalResults,
}) => {
  const hasFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    selectedHub.name !== 'All NCR';

  return (
    <div className="space-y-3 mb-6">
      {/* Row 1: Search Input & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A8A8A8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, localities, or ID..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#333333] bg-[#181818] text-sm text-white placeholder:text-[#888888] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Region Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <select
            value={selectedHub.name}
            onChange={(e) => {
              const hub = DELHI_NCR_HUBS.find((h) => h.name === e.target.value);
              if (hub) setSelectedHub(hub);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-[#181818] border border-[#333333] text-white text-xs font-bold focus:outline-none focus:border-[#F97316] cursor-pointer"
          >
            {DELHI_NCR_HUBS.map((hub) => (
              <option key={hub.name} value={hub.name} className="bg-[#181818] text-white">
                📍 {hub.name}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#181818] p-1 rounded-xl border border-[#333333]">
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'split' ? 'bg-[#2E2E2E] text-[#F97316]' : 'text-[#888888] hover:text-white'
              }`}
              title="Split View"
            >
              <Columns2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'map' ? 'bg-[#2E2E2E] text-[#F97316]' : 'text-[#888888] hover:text-white'
              }`}
              title="Map View"
            >
              <Map className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'grid' ? 'bg-[#2E2E2E] text-[#F97316]' : 'text-[#888888] hover:text-white'
              }`}
              title="Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Category Pills & Status Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full font-bold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#F97316] text-white shadow-md'
                : 'bg-[#181818] text-[#A8A8A8] border border-[#333333] hover:text-white hover:border-[#555555]'
            }`}
          >
            All Categories
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#F97316] text-white shadow-md'
                    : 'bg-[#181818] text-[#A8A8A8] border border-[#333333] hover:text-white hover:border-[#555555]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isSelected ? '#FFFFFF' : cat.color }}
                />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 bg-[#181818] p-1 rounded-xl border border-[#333333] text-xs shrink-0 self-start md:self-auto">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              selectedStatus === 'all'
                ? 'bg-[#2E2E2E] text-white'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            All Status
          </button>
          {STATUS_LIST.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStatus(s.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedStatus === s.id
                  ? 'bg-[#2E2E2E] text-white'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSelectedHub(DELHI_NCR_HUBS[0]);
              }}
              className="text-xs text-[#F97316] hover:text-white font-bold px-2 py-1 ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
