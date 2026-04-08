# Property Filters Redesign TODO

## Plan Implementation Steps

### 1. Create TODO.md ✅ (Done)

### 2. Update PropertyFilters.jsx ✅ (Complete)

- ✅ Add necessary imports (Accordion*, RadioGroup*, etc.)
- ✅ Add local state for conditional rent duration
- ✅ Restructure desktop layout to 2-column grid
- ✅ Build Section 1: نوع العرض (RadioGroup + conditional Select)
- ✅ Build Section 2: معلومات العقار (5 Selects)
- ✅ Build Section 3: السعر (USD/SYP min-max Inputs)
- ✅ Build Section 4: المساحة (built/total min-max Inputs)
- ✅ Build Section 5: تفاصيل العقار (all dropdowns/checkboxes in grid)
- ✅ Add buttons (Apply/Reset)
- ✅ Style: RTL dir, rounded, shadows, spacing

### 3. Mobile Accordion Implementation ✅ (Complete)

- ✅ Replace mobile sheet content with Accordion (single collapsible)
- ✅ Ensure one section open at a time

### 4. Testing

- [ ] Run `cd apps/web && npm run dev`
- [ ] Test desktop 2-col layout, mobile accordion
- [ ] Test RTL, conditional dropdown, all filters update `onFilterChange`
- [ ] Check responsive, no overflow

### 5. Completion

- [ ] attempt_completion with result & demo command

✅ PropertyFilters.jsx fully redesigned with exact RTL Arabic filters, 5 sections, 2-col desktop, single accordion mobile, modern styling (rounded/shadows), conditional rent dropdown, all options preserved.
