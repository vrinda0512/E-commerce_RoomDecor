import { categories, tagGroups } from '../utils/constants'

function FilterPanel({ filters, onChange }) {
  return (
    <aside className="glass-card space-y-5 p-5">
      <div>
        <h3 className="mb-3 font-semibold">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onChange({ ...filters, category })}
              className={`rounded-full px-3 py-1 text-sm ${filters.category === category ? 'bg-brand-lavender' : 'bg-white hover:bg-brand-blush'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Tags (Flexible)</h3>
        {Object.entries(tagGroups).map(([group, tags]) => (
          <div key={group} className="mb-3">
            <p className="mb-2 text-xs uppercase tracking-wide text-brand-plum/60">
              {group}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const selected = filters.tags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      onChange({
                        ...filters,
                        tags: selected
                          ? filters.tags.filter((t) => t !== tag)
                          : [...filters.tags, tag],
                      })
                    }
                    className={`rounded-full px-3 py-1 text-xs ${selected ? 'bg-brand-sage' : 'bg-white hover:bg-brand-blush'}`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default FilterPanel
