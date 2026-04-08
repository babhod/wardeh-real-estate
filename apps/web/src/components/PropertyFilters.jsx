import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import {
  Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const PropertyFilters = ({ filters = {}, onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [listingType, setListingType] = useState(filters.listingType || 'all');
  const [accordionValue, setAccordionValue] = useState('');

  const setFilter = (payload) => {
    onFilterChange({ ...filters, ...payload });
  };

  const handleListingTypeChange = (value) => {
    setListingType(value);
    setFilter({ listingType: value, rentDuration: '' });
  };

  const clearFilters = () => {
    onFilterChange({});
    setListingType('all');
    setAccordionValue('');
    setOpen(false);
  };

  const applyFilters = () => {
    setOpen(false);
  };

  // Options data - easy to extend
  const propertyTypes = ['سكني', 'تجاري'];
  const categories = ['شقق', 'فلل', 'منازل', 'مكاتب', 'محلات'];
  const governorates = ['دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية'];
  const cities = ['دمشق', 'حلب', 'حمص'];
  const areas = ['المالكي', 'الميدان', 'الصالحية'];

  const roomsOptions = ['1', '2', '3', '4', '5+'];
  const bathroomsOptions = roomsOptions;
  const floorsOptions = ['أرضي', '1', '2', '3', '4+', 'بنتهاوس'];
  const ageOptions = ['0-5 سنوات', '5-10', '10-20', 'أكثر'];

  const constructionStatusOptions = ['قيد الإنشاء', 'تم', 'على العظم'];
  const heatingOptions = ['مركزي', 'مازوت', 'شمسية'];
  const coolingOptions = ['مكيف', 'لا يوجد'];
  const balconiesOptions = ['واحدة', 'اثنتين', 'أكثر'];
  const parkingOptions = ['تحت الأرض', 'كراج', 'لا يوجد'];
  const furnitureOptions = ['مفروش كامل', 'غير مفروش'];
  const elevatorOptions = ['يوجد', 'لا يوجد'];
  const occupancyOptions = ['شاغر', 'مشغول من المالك'];
  const buildingConditionOptions = ['جديد', 'قديم', 'مجدد'];
  const taboTypeOptions = [
    'طابو أخضر', 'طابو زراعي', 'حكم محكمة', 'وكالة كاتب عدل',
    'عقد بيع', 'أسهم / مشاع مؤجر', 'قيد الإنشاء'
  ];

  const rentDurations = ['شهري', 'سنوي', 'يومي', 'موسمي'];

  return (
    <>
      {/* Desktop Sidebar - 2 Column Layout */}
      <motion.aside
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        dir="rtl"
        className="hidden lg:block w-full space-y-4 p-5 rounded-2xl border border-border/60 bg-card shadow-md"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/40 border border-border/60">
          <Filter className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">فلاتر البحث</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-16">
          {/* Listing Type */}
          <section className="space-y-3 p-4 rounded-xl border border-border/60 bg-background">
            <h4 className="font-semibold text-base">نوع العرض</h4>
            <RadioGroup value={listingType} onValueChange={handleListingTypeChange} className="grid grid-cols-1 gap-2">
              <div className="flex flex-row-reverse items-center justify-end gap-3 p-2.5 rounded-lg border border-border/60 hover:bg-muted/50 cursor-pointer text-right">
                <RadioGroupItem value="sale" id="sale" />
                <Label htmlFor="sale" className="cursor-pointer text-base font-medium">للبيع</Label>
              </div>
              <div className="flex flex-row-reverse items-center justify-end gap-3 p-2.5 rounded-lg border border-border/60 hover:bg-muted/50 cursor-pointer text-right">
                <RadioGroupItem value="rent" id="rent" />
                <Label htmlFor="rent" className="cursor-pointer text-base font-medium">للإيجار</Label>
              </div>
              <div className="flex flex-row-reverse items-center justify-end gap-3 p-2.5 rounded-lg border border-border/60 hover:bg-muted/50 cursor-pointer text-right">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="cursor-pointer text-base font-medium">كل العقارات</Label>
              </div>
            </RadioGroup>
            {listingType === 'rent' && (
              <div className="pt-3 border-t border-border/40">
                <Label className="text-sm font-medium mb-1.5 block">مدة الإيجار</Label>
                <Select value={filters.rentDuration || ''} onValueChange={(v) => setFilter({ rentDuration: v })}>
                  <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60">
                    <SelectValue placeholder="اختر المدة" />
                  </SelectTrigger>
                  <SelectContent dir="rtl" className="text-right">
                    {rentDurations.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </section>

          {/* Property Information */}
          <section className="space-y-3 p-4 rounded-xl border border-border/60 bg-background">
            <h4 className="font-semibold text-base">معلومات العقار</h4>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Select value={filters.propertyType || ''} onValueChange={(v) => setFilter({ propertyType: v })}>
                  <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60">
                    <SelectValue placeholder="نوع العقار" />
                  </SelectTrigger>
                  <SelectContent dir="rtl" className="text-right">
                    {propertyTypes.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filters.category || ''} onValueChange={(v) => setFilter({ category: v })}>
                  <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60">
                    <SelectValue placeholder="فئة العقار" />
                  </SelectTrigger>
                  <SelectContent dir="rtl" className="text-right">{categories.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Select value={filters.governorate || ''} onValueChange={(v) => setFilter({ governorate: v })}>
                <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60">
                  <SelectValue placeholder="المحافظة" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="text-right">{governorates.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={filters.city || ''} onValueChange={(v) => setFilter({ city: v })}>
                <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60">
                  <SelectValue placeholder="المدينة" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="text-right">{cities.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={filters.area || ''} onValueChange={(v) => setFilter({ area: v })}>
                <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60">
                  <SelectValue placeholder="المنطقة" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="text-right">{areas.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </section>

          {/* Price Filters */}
          <section className="space-y-3 p-4 rounded-xl border border-border/60 bg-background">
            <h4 className="font-semibold text-base">السعر</h4>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">السعر بالدولار</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">الحد الأدنى</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.usdMin || ''}
                      onChange={(e) => setFilter({ usdMin: +e.target.value })}
                      className="rounded-[10px] text-right"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">الحد الأقصى</Label>
                    <Input
                      type="number"
                      placeholder="∞"
                      value={filters.usdMax || ''}
                      onChange={(e) => setFilter({ usdMax: +e.target.value })}
                      className="rounded-[10px] text-right"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">السعر بالليرة السورية</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.sypMin || ''}
                    onChange={(e) => setFilter({ sypMin: +e.target.value })}
                    className="rounded-[10px] text-right"
                  />
                  <Input
                    type="number"
                    placeholder="∞"
                    value={filters.sypMax || ''}
                    onChange={(e) => setFilter({ sypMax: +e.target.value })}
                    className="rounded-[10px] text-right"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Size Filters */}
          <section className="space-y-3 p-4 rounded-xl border border-border/60 bg-background">
            <h4 className="font-semibold text-base">المساحة</h4>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">المساحة المبنية</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="0 م²" value={filters.builtMin || ''} onChange={(e) => setFilter({ builtMin: +e.target.value })} className="rounded-[10px] text-right" />
                  <Input type="number" placeholder="∞ م²" value={filters.builtMax || ''} onChange={(e) => setFilter({ builtMax: +e.target.value })} className="rounded-[10px] text-right" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">المساحة الكلية</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="0 م²" value={filters.totalMin || ''} onChange={(e) => setFilter({ totalMin: +e.target.value })} className="rounded-[10px] text-right" />
                  <Input type="number" placeholder="∞ م²" value={filters.totalMax || ''} onChange={(e) => setFilter({ totalMax: +e.target.value })} className="rounded-[10px] text-right" />
                </div>
              </div>
            </div>
          </section>

          {/* Property Details */}
          <section className="space-y-3 p-4 rounded-xl border border-border/60 bg-background">
            <h4 className="font-semibold text-base">تفاصيل العقار</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select value={filters.rooms || ''} onValueChange={(v) => setFilter({ rooms: v })}>
                <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="عدد الغرف" /></SelectTrigger>
                <SelectContent dir="rtl" className="text-right">{roomsOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={filters.bathrooms || ''} onValueChange={(v) => setFilter({ bathrooms: v })}>
                <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="عدد الحمامات" /></SelectTrigger>
                <SelectContent dir="rtl" className="text-right">{bathroomsOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={filters.floor || ''} onValueChange={(v) => setFilter({ floor: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="الطابق" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{floorsOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.age || ''} onValueChange={(v) => setFilter({ age: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="عمر البناء" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{ageOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.constructionStatus || ''} onValueChange={(v) => setFilter({ constructionStatus: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="حالة الإنشاء" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{constructionStatusOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.heating || ''} onValueChange={(v) => setFilter({ heating: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="نوع التدفئة" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{heatingOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.cooling || ''} onValueChange={(v) => setFilter({ cooling: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="نوع التبريد" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{coolingOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.balconies || ''} onValueChange={(v) => setFilter({ balconies: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="عدد الشرفات" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{balconiesOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.parking || ''} onValueChange={(v) => setFilter({ parking: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="مواقف السيارات" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{parkingOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.furniture || ''} onValueChange={(v) => setFilter({ furniture: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="الفرش" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{furnitureOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.elevator || ''} onValueChange={(v) => setFilter({ elevator: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="المصعد" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{elevatorOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.occupancy || ''} onValueChange={(v) => setFilter({ occupancy: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="حالة الاستخدام" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{occupancyOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.buildingCondition || ''} onValueChange={(v) => setFilter({ buildingCondition: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="حالة البناء" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{buildingConditionOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
              <Select value={filters.taboType || ''} onValueChange={(v) => setFilter({ taboType: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="نوع الطابو" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{taboTypeOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
            </div>
          </section>
        </div>

        {/* Buttons */}
        <div className="mt-4 pt-3 border-t border-border/40 flex gap-2 justify-end">
          <Button onClick={applyFilters} className="bg-primary hover:bg-primary/90 rounded-[10px] px-6 py-2.5 text-base shadow-md order-1">
            تطبيق الفلاتر
          </Button>
          <Button variant="outline" onClick={clearFilters} className="rounded-[10px] px-4 py-2.5 text-base order-2">
            إعادة ضبط الفلاتر
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Sheet with Accordion */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden rounded-[10px] shadow-sm">
            <Filter className="mr-2 h-5 w-5" />
            فلاتر متقدمة
          </Button>
        </SheetTrigger>
        <SheetContent side="right" dir="rtl" className="w-[95vw] p-0 max-h-[90vh] flex flex-col">
          <SheetHeader className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <Filter className="h-6 w-6 text-primary" />
              <SheetTitle className="text-xl">فلاتر العقارات</SheetTitle>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <Accordion dir="rtl" type="single" collapsible value={accordionValue} onValueChange={setAccordionValue} className="w-full p-2 space-y-2">
              {/* Listing Type */}
              <AccordionItem value="section1" className="border-b border-border/30 mx-2">
                <AccordionTrigger className="px-4 py-3 hover:no-underline data-[state=open]:bg-muted/50 rounded-xl">
                  <h4 className="font-semibold text-base flex items-center gap-2 justify-between w-full">
                    نوع العرض <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-0">
                  <RadioGroup value={listingType} onValueChange={handleListingTypeChange} className="grid gap-2">
                    <div className="flex flex-row-reverse items-center justify-end p-3 rounded-lg border hover:bg-muted gap-3 cursor-pointer text-right"><RadioGroupItem value="sale" id="msale" /><Label htmlFor="msale" className="cursor-pointer font-medium">للبيع</Label></div>
                    <div className="flex flex-row-reverse items-center justify-end p-3 rounded-lg border hover:bg-muted gap-3 cursor-pointer text-right"><RadioGroupItem value="rent" id="mrent" /><Label htmlFor="mrent" className="cursor-pointer font-medium">للإيجار</Label></div>
                    <div className="flex flex-row-reverse items-center justify-end p-3 rounded-lg border hover:bg-muted gap-3 cursor-pointer text-right"><RadioGroupItem value="all" id="mall" /><Label htmlFor="mall" className="cursor-pointer font-medium">كل العقارات</Label></div>
                  </RadioGroup>
                  {listingType === 'rent' && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <Label className="text-sm mb-2 block">مدة الإيجار</Label>
                      <Select value={filters.rentDuration || ''} onValueChange={(v) => setFilter({ rentDuration: v })}>
                        <SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="اختر المدة" /></SelectTrigger>
                        <SelectContent dir="rtl" className="text-right">{rentDurations.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Property Information */}
              <AccordionItem value="section2" className="border-b border-border/30 mx-2">
                <AccordionTrigger className="px-4 py-3 hover:no-underline data-[state=open]:bg-muted/50 rounded-xl"><h4 className="font-semibold text-base flex items-center gap-2 justify-between w-full">معلومات العقار <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /></h4></AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-0 space-y-2.5">
                  <Select value={filters.propertyType || ''} onValueChange={(v) => setFilter({ propertyType: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="نوع العقار" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{propertyTypes.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.category || ''} onValueChange={(v) => setFilter({ category: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="فئة العقار" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{categories.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.governorate || ''} onValueChange={(v) => setFilter({ governorate: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="المحافظة" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{governorates.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.city || ''} onValueChange={(v) => setFilter({ city: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="المدينة" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{cities.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.area || ''} onValueChange={(v) => setFilter({ area: v })}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="المنطقة" /></SelectTrigger><SelectContent dir="rtl" className="text-right">{areas.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                </AccordionContent>
              </AccordionItem>

              {/* Price Filters */}
              <AccordionItem value="section3">
                <AccordionTrigger className="px-4 py-3 mx-2 hover:no-underline data-[state=open]:bg-muted/50 rounded-xl"><h4 className="font-semibold text-base flex items-center gap-2 justify-between w-full">السعر <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /></h4></AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-0 space-y-3">
                  <div>
                    <Label className="text-sm font-medium mb-2">السعر بالدولار</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="$0" className="rounded-lg text-right" value={filters.usdMin || ''} onChange={e => setFilter({ usdMin: +e.target.value })} />
                      <Input type="number" placeholder="$∞" className="rounded-lg text-right" value={filters.usdMax || ''} onChange={e => setFilter({ usdMax: +e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2">الليرة السورية</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="0 SYP" className="rounded-lg text-right" value={filters.sypMin || ''} onChange={e => setFilter({ sypMin: +e.target.value })} />
                      <Input type="number" placeholder="∞ SYP" className="rounded-lg text-right" value={filters.sypMax || ''} onChange={e => setFilter({ sypMax: +e.target.value })} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Size Filters */}
              <AccordionItem value="section4">
                <AccordionTrigger className="px-4 py-3 mx-2 hover:no-underline data-[state=open]:bg-muted/50 rounded-xl"><h4 className="font-semibold text-base flex items-center gap-2 justify-between w-full">المساحة <ChevronDown className="h-4 w-4 shrink-0" /></h4></AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-0 space-y-3">
                  <div>
                    <Label>المساحة المبنية</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="0 م²" className="rounded-lg text-right" value={filters.builtMin||''} onChange={e=>setFilter({builtMin:+e.target.value})} />
                      <Input placeholder="∞ م²" className="rounded-lg text-right" value={filters.builtMax||''} onChange={e=>setFilter({builtMax:+e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <Label>المساحة الكلية</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="0 م²" className="rounded-lg text-right" value={filters.totalMin||''} onChange={e=>setFilter({totalMin:+e.target.value})} />
                      <Input placeholder="∞ م²" className="rounded-lg text-right" value={filters.totalMax||''} onChange={e=>setFilter({totalMax:+e.target.value})} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Property Details */}
              <AccordionItem value="section5">
                <AccordionTrigger className="px-4 py-3 mx-2 hover:no-underline data-[state=open]:bg-muted/50 rounded-xl"><h4 className="font-semibold text-base flex items-center gap-2 justify-between w-full">تفاصيل العقار <ChevronDown className="h-4 w-4 shrink-0" /></h4></AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-0 space-y-2.5 [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-2">
                  <Select value={filters.rooms||''} onValueChange={v=>setFilter({rooms:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="عدد الغرف"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{roomsOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.bathrooms||''} onValueChange={v=>setFilter({bathrooms:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="عدد الحمامات"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{bathroomsOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.floor||''} onValueChange={v=>setFilter({floor:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="الطابق"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{floorsOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.age||''} onValueChange={v=>setFilter({age:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="عمر البناء"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{ageOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.constructionStatus||''} onValueChange={v=>setFilter({constructionStatus:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="حالة الإنشاء"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{constructionStatusOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.heating||''} onValueChange={v=>setFilter({heating:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="نوع التدفئة"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{heatingOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.cooling||''} onValueChange={v=>setFilter({cooling:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="نوع التبريد"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{coolingOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.balconies||''} onValueChange={v=>setFilter({balconies:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="الشرفات"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{balconiesOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.parking||''} onValueChange={v=>setFilter({parking:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="مواقف"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{parkingOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.furniture||''} onValueChange={v=>setFilter({furniture:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="الفرش"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{furnitureOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.elevator||''} onValueChange={v=>setFilter({elevator:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="المصعد"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{elevatorOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.occupancy||''} onValueChange={v=>setFilter({occupancy:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="الاستخدام"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{occupancyOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.buildingCondition||''} onValueChange={v=>setFilter({buildingCondition:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="حالة البناء"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{buildingConditionOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  <Select value={filters.taboType||''} onValueChange={v=>setFilter({taboType:v})}><SelectTrigger className="w-full h-11 rounded-[10px] justify-between bg-background hover:bg-muted/30 border border-border/60"><SelectValue placeholder="نوع الطابو"/></SelectTrigger><SelectContent dir="rtl" className="text-right">{taboTypeOptions.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="p-4 border-t border-border/50 bg-background/50 flex gap-2 justify-end">
            <SheetClose asChild><Button className="bg-primary hover:bg-primary/90 rounded-[10px] shadow-md text-sm px-5 py-2.5 order-1">تطبيق الفلاتر</Button></SheetClose>
            <Button variant="outline" className="rounded-[10px] text-sm px-4 py-2.5 order-2" onClick={clearFilters}>إعادة ضبط الفلاتر</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PropertyFilters;

