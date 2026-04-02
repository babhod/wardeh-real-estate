import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockProperties = [
  {
    id: 1,
    title: 'شقة فاخرة في قلب دمشق',
    type: 'شقة',
    city: 'دمشق',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    price: '2,500 مليون',
    rooms: 3,
    baths: 2,
    area: 150,
    address: 'ميدان الحرية، دمشق',
    status: 'جيد',
  },
  {
    id: 2,
    title: 'فيلا مستقلة مع مسبح',
    type: 'فيلا',
    city: 'حلب',
    image: 'https://images.unsplash.com/photo-1571896349840-0d6f76f864d6?w=800',
    price: '5,200 مليون',
    rooms: 5,
    baths: 4,
    area: 350,
    address: 'المنصورة، حلب',
    status: 'جيد',
  },
  {
    id: 3,
    title: 'منزل عائلي واسع',
    type: 'منزل',
    city: 'حمص',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
    price: '1,800 مليون',
    rooms: 4,
    baths: 3,
    area: 220,
    address: 'الخالدية، حمص',
    status: 'يحتاج صيانة',
  },
  {
    id: 4,
    title: 'مكتب تجاري متميز',
    type: 'مكتب',
    city: 'دمشق',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    price: '3,200 مليون',
    rooms: 6,
    baths: 2,
    area: 180,
    address: 'برزة، دمشق',
    status: 'جيد',
  },
  {
    id: 5,
    title: 'محل تجاري في موقع استراتيجي',
    type: 'محل تجاري',
    city: 'طرطوس',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    price: '1,200 مليون',
    rooms: 1,
    baths: 1,
    area: 80,
    address: 'الساحل، طرطوس',
    status: 'جيد',
  },
  {
    id: 6,
    title: 'أرض استثمارية كبيرة',
    type: 'أرض',
    city: 'إدلب',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800',
    price: '4,800 مليون',
    rooms: 0,
    baths: 0,
    area: 2000,
    address: 'سرمدا، إدلب',
    status: 'جيد',
  },
  {
    id: 7,
    title: 'شقة جديدة جاهزة للسكن',
    type: 'شقة',
    city: 'اللاذقية',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
    price: '2,200 مليون',
    rooms: 3,
    baths: 2,
    area: 140,
    address: 'رمل العلية، اللاذقية',
    status: 'جيد',
  },
  {
    id: 8,
    title: 'مستودع صناعي',
    type: 'مستودع',
    city: 'حماة',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    price: '6,500 مليون',
    rooms: 0,
    baths: 1,
    area: 800,
    address: 'منطقة صناعية، حماة',
    status: 'يحتاج صيانة',
  },
];

const typesOptions = ['اختر نوع العقار', 'شقة', 'منزل', 'فيلا', 'مكتب', 'محل تجاري', 'أرض', 'مستودع'];
const citiesOptions = ['اختر المدينة', 'دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'إدلب'];
const roomsOptions = ['عدد الغرف', '1', '2', '3', '4', '5+'];

const ForSalePage = () => {
  const [filters, setFilters] = useState({});

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // Search
      if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      
      // Type
      if ((filters.type && property.type !== filters.type) || (filters.types?.length && !filters.types.includes(property.type))) return false;
      
      // City
      if (filters.city && property.city !== filters.city) return false;
      
      // Rooms
      if (filters.rooms && filters.rooms !== 'عدد الغرف') {
        const roomNum = parseInt(filters.rooms);
        if (filters.rooms === '5+' ? property.rooms < 5 : property.rooms !== roomNum) return false;
      }
      
      // Price (in millions)
      const priceNum = parseInt(property.price.replace(/[^\d]/g, '')) || 0;
      if (filters.priceMin && priceNum < filters.priceMin) return false;
      if (filters.priceMax && priceNum > filters.priceMax) return false;
      
      // Area
      if (filters.areaMin && property.area < filters.areaMin) return false;
      if (filters.areaMax && property.area > filters.areaMax) return false;
      
      // Condition
      if (filters.condition && property.status !== filters.condition) return false;
      
      return true;
    });
  }, [filters]);

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Helmet>
        <title>عقارات للبيع - الوردة للوساطة العقارية</title>
        <meta name="description" content="عقارات للبيع في مختلف المدن السورية. شقق، فلل، مكاتب، أراضي بأسعار مناسبة مع صور وتفاصيل كاملة." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="sticky top-[5.5rem] z-50 w-full">
          <div className="w-full px-4">
            <div className="bg-background/95 backdrop-blur-md border border-border/40 rounded-none p-4 mb-0 w-full">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <Input
                  value={filters.search || ''}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="أدخل كلمات بحث -  موقع، نوع، سعر"
                  className="flex-1"
                />
                <Button onClick={() => setFilters({})} className="w-full md:w-auto">
                  مسح الكل
                </Button>
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2">
                <Select dir="rtl" value={filters.city || 'اختر المدينة'} onValueChange={(value) => setFilters({ ...filters, city: value === 'اختر المدينة' ? undefined : value })}>
                  <SelectTrigger className="w-full text-right" dir="rtl">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {citiesOptions.map((city) => (
                      <SelectItem key={city} value={city} dir="rtl" className="text-right">{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select dir="rtl" value={filters.type || 'اختر نوع العقار'} onValueChange={(value) => setFilters({ ...filters, type: value === 'اختر نوع العقار' ? undefined : value })}>
                  <SelectTrigger className="w-full text-right" dir="rtl">
                    <SelectValue placeholder="اختر نوع العقار" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {typesOptions.map((type) => (
                      <SelectItem key={type} value={type} dir="rtl" className="text-right">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select dir="rtl" value={filters.rooms || 'عدد الغرف'} onValueChange={(value) => setFilters({ ...filters, rooms: value === 'عدد الغرف' ? undefined : value })}>
                  <SelectTrigger className="w-full text-right" dir="rtl">
                    <SelectValue placeholder="عدد الغرف" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {roomsOptions.map((rooms) => (
                      <SelectItem key={rooms} value={rooms} dir="rtl" className="text-right">{rooms}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    min={0}
                    placeholder="من (مليون)"
                    value={filters.priceMin ?? ''}
                    onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) || undefined })}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    min={0}
                    placeholder="إلى (مليون)"
                    value={filters.priceMax ?? ''}
                    onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) || undefined })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-8 lg:pt-4">
          <div className="space-y-6">
            {filteredProperties.length === 0 ? (
              <Card className="glass-card border-border/50">
                <CardContent className="py-16 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد عقارات</h3>
                  <p className="text-muted-foreground mb-6">لم يتم العثور على عقارات مطابقة لفلاتر البحث</p>
                  <Button onClick={() => setFilters({})} variant="outline">
                    إظهار جميع العقارات
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="text-foreground font-bold text-xl">
                    {filteredProperties.length} عقار متاح
                  </div>
                </div>

                <motion.div
                  key="properties-grid"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                >
                  {filteredProperties.map((property) => (
                    <motion.div key={property.id} variants={itemVariants} className="h-full">
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForSalePage;

