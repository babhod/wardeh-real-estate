import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Filter, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Label } from '@/components/ui/label.jsx';
import { cn } from '@/lib/utils.js';

const propertyTypes = ['شقة', 'منزل', 'فيلا', 'مكتب', 'محل تجاري', 'أرض', 'مستودع'];
const cities = ['دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'إدلب', 'درعا', 'السويداء', 'الحسكة', 'دير الزور', 'الرقة'];

const PropertyFilters = ({ filters, onFilterChange }) => {
  const [open, setOpen] = useState(false);

  const setFilter = (payload) => {
    onFilterChange({ ...filters, ...payload });
  };

  const clearFilters = () => {
    onFilterChange({});
    setOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        className="hidden lg:block w-full sticky top-32 h-fit space-y-6 p-6 rounded-2xl glass-card border-border/50 bg-card/80 shadow-xl mt-4"
      >
        <div className="flex items-center gap-3 mb-6 p-4 border-b border-border/50">
          <Filter className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-foreground">الفلاتر</h3>
        </div>

        <div className="space-y-8">
          {/* Search */}
          <div>
            <Label className="text-sm font-medium mb-2 block">البحث بالكلمات</Label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن عقار..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="pr-10"
              />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <Label className="text-sm font-medium mb-3 block">نوع العقار</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types?.includes(type) || false}
                    onCheckedChange={(checked) => {
                      const types = checked
                        ? [...(filters.types || []), type]
                        : (filters.types || []).filter(t => t !== type);
                      onFilterChange({ ...filters, types });
                    }}
                  />
                  <Label htmlFor={`type-${type}`} className="cursor-pointer text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* City */}
          <div>
            <Label className="text-sm font-medium mb-3 block">المدينة</Label>
            <Select value={filters.city || ''} onValueChange={(value) => onFilterChange({ ...filters, city: value })}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium mb-3 block">السعر (مليون ليرة)</Label>
            <Slider
              value={[filters.priceMin ?? 0, filters.priceMax ?? 8000]}
              onValueChange={([min, max]) => setFilter({ priceMin: min, priceMax: max })}
              min={0}
              max={8000}
              step={50}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>من {filters.priceMin ?? 0} مليون</span>
              <span>إلى {filters.priceMax ?? 8000} مليون</span>
            </div>
            <div className="flex gap-2 mt-1">
              <Input
                type="number"
                placeholder="الحد الأدنى"
                value={filters.priceMin ?? ''}
                onChange={(e) => setFilter({ priceMin: Number(e.target.value) || 0 })}
                className="w-full text-right"
              />
              <span className="text-muted-foreground self-center px-2">-</span>
              <Input
                type="number"
                placeholder="الحد الأقصى"
                value={filters.priceMax ?? ''}
                onChange={(e) => setFilter({ priceMax: Number(e.target.value) || 8000 })}
                className="w-full text-right"
              />
            </div>
          </div>

          {/* Rooms */}
          <div>
            <Label className="text-sm font-medium mb-3 block">عدد الغرف</Label>
            <Select value={filters.rooms || ''} onValueChange={(value) => onFilterChange({ ...filters, rooms: value })}>
              <SelectTrigger>
                <SelectValue placeholder="اختر عدد الغرف" />
              </SelectTrigger>
              <SelectContent>
                {['1', '2', '3', '4', '5+', 'أي'].map((num) => (
                  <SelectItem key={num} value={num}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area */}
          <div>
            <Label className="text-sm font-medium mb-3 block">المساحة (م²)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="الحد الأدنى"
                value={filters.areaMin || ''}
                onChange={(e) => onFilterChange({ ...filters, areaMin: +e.target.value })}
                className="text-right"
              />
              <Input
                type="number"
                placeholder="الحد الأقصى"
                value={filters.areaMax || ''}
                onChange={(e) => onFilterChange({ ...filters, areaMax: +e.target.value })}
                className="text-right"
              />
            </div>
          </div>

          {/* Condition */}
          <div>
            <Label className="text-sm font-medium mb-3 block">حالة العقار</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="condition-good"
                  checked={filters.condition === 'جيد'}
                  onCheckedChange={(checked) => setFilter({ condition: checked ? 'جيد' : undefined })}
                />
                <Label htmlFor="condition-good" className="cursor-pointer">جيد</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="condition-needs"
                  checked={filters.condition === 'يحتاج صيانة'}
                  onCheckedChange={(checked) => setFilter({ condition: checked ? 'يحتاج صيانة' : undefined })}
                />
                <Label htmlFor="condition-needs" className="cursor-pointer">يحتاج صيانة</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="condition-any"
                  checked={!filters.condition}
                  onCheckedChange={(checked) => setFilter({ condition: undefined })}
                />
                <Label htmlFor="condition-any" className="cursor-pointer">أي حالة</Label>
              </div>
            </div>
          </div>

          <Button onClick={clearFilters} variant="outline" className="w-full">
            مسح الفلاتر
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden">
            <Filter className="mr-2 h-4 w-4" />
            فلاتر
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[90vw] max-w-md p-0">
          <SheetHeader className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <Filter className="h-6 w-6 text-primary" />
              <SheetTitle>فلاتر العقارات</SheetTitle>
            </div>
          </SheetHeader>
          {/* Mobile filters - copy desktop content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
            {/* Search */}
            <div>
              <Label className="text-sm font-medium mb-2 block">البحث بالكلمات</Label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن عقار..."
                  value={filters.search || ''}
                  onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                  className="pr-10"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <Label className="text-sm font-medium mb-3 block">نوع العقار</Label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-muted/30 rounded-lg">
                {propertyTypes.map((type) => (
                  <div key={type} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.types?.includes(type) || false}
                      onCheckedChange={(checked) => {
                        const types = checked
                          ? [...(filters.types || []), type]
                          : (filters.types || []).filter(t => t !== type);
                        onFilterChange({ ...filters, types });
                      }}
                    />
                    <Label htmlFor={`type-${type}`} className="cursor-pointer text-sm leading-tight">{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <Label className="text-sm font-medium mb-3 block">المدينة</Label>
              <Select value={filters.city || ''} onValueChange={(value) => onFilterChange({ ...filters, city: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium mb-3 block">السعر (مليون ليرة)</Label>
              <Slider
                value={[filters.priceMin ?? 0, filters.priceMax ?? 8000]}
                onValueChange={([min, max]) => setFilter({ priceMin: min, priceMax: max })}
                min={0}
                max={8000}
                step={50}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>من {filters.priceMin ?? 0} مليون</span>
                <span>إلى {filters.priceMax ?? 8000} مليون</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="الحد الأدنى"
                  value={filters.priceMin ?? ''}
                  onChange={(e) => setFilter({ priceMin: Number(e.target.value) || 0 })}
                  className="text-right flex-1"
                />
                <span className="text-muted-foreground self-center px-2">-</span>
                <Input
                  type="number"
                  placeholder="الحد الأقصى"
                  value={filters.priceMax ?? ''}
                  onChange={(e) => setFilter({ priceMax: Number(e.target.value) || 8000 })}
                  className="text-right flex-1"
                />
              </div>
            </div>

            {/* Rooms */}
            <div>
              <Label className="text-sm font-medium mb-3 block">عدد الغرف</Label>
              <Select value={filters.rooms || ''} onValueChange={(value) => onFilterChange({ ...filters, rooms: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر عدد الغرف" />
                </SelectTrigger>
                <SelectContent>
                  {['1', '2', '3', '4', '5+', 'أي'].map((num) => (
                    <SelectItem key={num} value={num}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Area */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-medium mb-1 block">المساحة من (م²)</Label>
                <Input
                  type="number"
                  placeholder="الحد الأدنى"
                  value={filters.areaMin || ''}
                  onChange={(e) => onFilterChange({ ...filters, areaMin: +e.target.value })}
                  className="text-right"
                />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1 block">الحد الأقصى</Label>
                <Input
                  type="number"
                  placeholder="الحد الأقصى"
                  value={filters.areaMax || ''}
                  onChange={(e) => onFilterChange({ ...filters, areaMax: +e.target.value })}
                  className="text-right"
                />
              </div>
            </div>

            {/* Condition */}
            <div>
              <Label className="text-sm font-medium mb-3 block">حالة العقار</Label>
              <div className="space-y-2 p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 p-2 -m-2 rounded-lg hover:bg-muted">
                  <Checkbox
                    id="condition-good"
                    checked={filters.condition === 'جيد'}
                    onCheckedChange={(checked) => setFilter({ condition: checked ? 'جيد' : undefined })}
                  />
                  <Label htmlFor="condition-good" className="cursor-pointer text-sm">جيد</Label>
                </div>
                <div className="flex items-center gap-2 p-2 -m-2 rounded-lg hover:bg-muted">
                  <Checkbox
                    id="condition-needs"
                    checked={filters.condition === 'يحتاج صيانة'}
                    onCheckedChange={(checked) => setFilter({ condition: checked ? 'يحتاج صيانة' : undefined })}
                  />
                  <Label htmlFor="condition-needs" className="cursor-pointer text-sm">يحتاج صيانة</Label>
                </div>
                <div className="flex items-center gap-2 p-2 -m-2 rounded-lg hover:bg-muted">
                  <Checkbox
                    id="condition-any"
                    checked={!filters.condition}
                    onCheckedChange={(checked) => setFilter({ condition: undefined })}
                  />
                  <Label htmlFor="condition-any" className="cursor-pointer text-sm">أي حالة</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/30 pt-6">
              <Button className="flex-1" onClick={clearFilters} variant="outline">
                مسح الفلاتر
              </Button>
              <SheetClose asChild>
                <Button className="flex-1">تطبيق الفلاتر</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PropertyFilters;

