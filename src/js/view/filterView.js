const filterForm = document.getElementById('filterForm');
function generateTemplate({ categories, brands, bounds, state }) {
  const cat = categories
    .map((c) => {
      const checked = (state.category || []).includes(c) ? 'checked' : '';
      return `<div class="form-check"><input class="form-check-input" type="checkbox" value="${c}" id="cat_${c}" name="category" ${checked}><label class="form-check-label" for="cat_${c}">${c}</label></div>`;
    })
    .join('');
  const br = brands
    .map((b) => {
      const checked = (state.brand || []).includes(b) ? 'checked' : '';
      return `<div class="form-check"><input class="form-check-input" type="checkbox" value="${b}" id="br_${b}" name="brand" ${checked}><label class="form-check-label" for="br_${b}">${b}</label></div>`;
    })
    .join('');
  const min = state.min ?? bounds.min;
  const max = state.max ?? bounds.max;
  return `
    
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="mb-0">Filters</h5>
        <button class="btn btn-sm btn-link" id="clearFilters" type="button">Clear</button>
      </div>
      <div class="mb-3">
        <label class="form-label">Price range ($)</label>
        <div class="d-flex gap-2">
          <input type="number" min="0" class="form-control" id="minPrice" name='minPrice' value="${min}" placeholder="Min">
          <input type="number" min="0" class="form-control" id="maxPrice" name='maxPrice' value="${max}" placeholder="Max">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Minimum rating</label>
        <select class="form-select" id="minRating">
          ${[0, 3, 3.5, 4, 4.5]
            .map(
              (r) =>
                `<option value="${r}" ${Number(state.rating || 0) === r ? 'selected' : ''}>${
                  r === 0 ? 'Any' : r + '+'
                }</option>`
            )
            .join('')}
        </select>
      </div>
      <div class="mb-3"><label class="form-label">Category</label><div class="vstack gap-1">${cat}</div></div>
      <div class="mb-3"><label class="form-label">Brand</label><div class="vstack gap-1">${br}</div></div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="inStock" ${state.instock ? 'checked' : ''}>
        <label class="form-check-label" for="inStock">In stock only</label>
      </div>
      <div class="mb-2">
        <label class="form-label">Sort by</label>
        <select class="form-select" id="sortBy">
          ${['relevance', 'price_asc', 'price_desc', 'rating_desc', 'name_asc', 'name_desc']
            .map((s) => {
              const map = {
                relevance: 'Relevance',
                price_asc: 'Price (low to high)',
                price_desc: 'Price (high to low)',
                rating_desc: 'Rating (high to low)',
                name_asc: 'Name (A-Z)',
                name_desc: 'Name (Z-A)',
              };
              return `<option value="${s}" ${state.sort === s ? 'selected' : ''}>${map[s]}</option>`;
            })
            .join('')}
        </select>
      </div>
    
  `;
}

export function render({ categories, brands, bounds, state }) {
  filterForm.innerHTML = generateTemplate({ categories, brands, bounds, state });
}
