function generateTemplate(data, type) {
  return `<label class="filter-option">
            <input type="checkbox" value="${data}" name="${type}" />
            <span class="checkmark"></span>
            <span class="option-text">${data}</span>
          </label>`;
}
export function render({ categories, brands, bounds, state }) {
  const minSlider = document.getElementById('minPriceSlider');
  const maxSlider = document.getElementById('maxPriceSlider');
  const minInput = document.getElementById('minPrice');
  const maxInput = document.getElementById('maxPrice');
  const brandFilterContainer = document.querySelector('.brands-filter');
  const categoriesFilterContainer = document.querySelector('.categories-filter');
  const min = state?.min ?? bounds.min;
  const max = state?.max ?? bounds.max;

  minSlider.value = minInput.value = min;
  maxSlider.value = maxInput.value = max;
  brandFilterContainer.innerHTML = categoriesFilterContainer.innerHTML = '';
  brands.map((b) => brandFilterContainer.insertAdjacentHTML('beforeend', generateTemplate(b, 'brand')));
  categories.map((b) => categoriesFilterContainer.insertAdjacentHTML('beforeend', generateTemplate(b, 'category')));
}
