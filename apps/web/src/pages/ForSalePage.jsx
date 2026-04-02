import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard.jsx';
import PropertyFilters from '@/components/PropertyFilters.jsx';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';

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

const ForSalePage = () => {
  const [filters, setFilters] = useState({});

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // Search
      if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      
      // Type
      if (filters.types?.length && !filters.types.includes(property.type)) return false;
      
      // City
      if (filters.city && property.city !== filters.city) return false;
      
      // Rooms
      if (filters.rooms && filters.rooms !== 'أي' && property.rooms !== parseInt(filters.rooms)) return false;
      
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

  return (
    <>
      <Helmet>
        <title>عقارات للبيع - الوردة للوساطة العقارية</title>
        <meta name="description" content="عقارات للبيع في مختلف المدن السورية. شقق، فلل، مكاتب، أراضي بأسعار مناسبة مع صور وتفاصيل كاملة." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-background">
        {/* Header */}
        <section className="py-16 bg-[radial-gradient(circle_at_top,_rgba(7,107,87,0.18),_transparent_60%)]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <Badge className="inline-flex px-6 py-2 text-base font-semibold bg-accent/90">
                عقارات للبيع
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                ابحث عن عقارك المثالي للشراء
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                اكتشف مجموعة واسعة من العقارات للبيع في مختلف المدن السورية بأسعار تنافسية وخدمة متميزة
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 pt-8 lg:pt-12 -mt-12 lg:-mt-20 lg:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Filters */}
            <PropertyFilters filters={filters} onFilterChange={setFilters} />

            {/* Properties Grid */}
            <div className="lg:col-span-3 space-y-8 pt-8 lg:pt-4">
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
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-foreground font-bold text-xl">
                      {filteredProperties.length} عقار متاح
                    </div>
                    <Button variant="outline" onClick={() => setFilters({})} className="gap-2">
                      <X className="h-4 w-4" />
                      مسح الفلاتر
                    </Button>
                  </div>

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                  >
                    {filteredProperties.map((property) => (
                      <motion.div
                        key={property.id}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        className="h-full"
                      >
                        <PropertyCard property={property} />
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForSalePage;

