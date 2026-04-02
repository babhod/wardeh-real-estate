import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard.jsx';
import PropertyFilters from '@/components/PropertyFilters.jsx';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';

const mockRentProperties = [
  {
    id: 21,
    title: 'شقة للإيجار في حي راقي',
    type: 'شقة',
    city: 'دمشق',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f01c0a7?w=800',
    price: '15 مليون/شهر',
    rooms: 2,
    baths: 1,
    area: 120,
    address: 'المزة، دمشق',
    status: 'جيد',
  },
  {
    id: 22,
    title: 'مكتب للإيجار في وسط المدينة',
    type: 'مكتب',
    city: 'حلب',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    price: '25 مليون/شهر',
    rooms: 4,
    baths: 2,
    area: 160,
    address: 'السوق القديم، حلب',
    status: 'جيد',
  },
  {
    id: 23,
    title: 'محل تجاري للإيجار',
    type: 'محل تجاري',
    city: 'حمص',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    price: '8 مليون/شهر',
    rooms: 1,
    baths: 1,
    area: 60,
    address: 'شارع الراستان، حمص',
    status: 'جيد',
  },
  {
    id: 24,
    title: 'شقة جديدة للإيجار',
    type: 'شقة',
    city: 'طرطوس',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
    price: '12 مليون/شهر',
    rooms: 3,
    baths: 2,
    area: 130,
    address: 'الساحل، طرطوس',
    status: 'جيد',
  },
  {
    id: 25,
    title: 'مستودع للإيجار',
    type: 'مستودع',
    city: 'حماة',
    image: 'https://images.unsplash.com/photo-1571896349840-0d6f76f864d6?w=800',
    price: '35 مليون/شهر',
    rooms: 0,
    baths: 1,
    area: 500,
    address: 'المنطقة الصناعية، حماة',
    status: 'يحتاج صيانة',
  },
  {
    id: 26,
    title: 'مكتب فاخر للإيجار',
    type: 'مكتب',
    city: 'اللاذقية',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    price: '30 مليون/شهر',
    rooms: 5,
    baths: 2,
    area: 200,
    address: 'وسط المدينة، اللاذقية',
    status: 'جيد',
  },
  {
    id: 27,
    title: 'شقة استثمارية للإيجار',
    type: 'شقة',
    city: 'درعا',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800',
    price: '10 مليون/شهر',
    rooms: 2,
    baths: 1,
    area: 100,
    address: 'وسط درعا، درعا',
    status: 'جيد',
  },
  {
    id: 28,
    title: 'محل للإيجار في شارع تجاري',
    type: 'محل تجاري',
    city: 'إدلب',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    price: '18 مليون/شهر',
    rooms: 2,
    baths: 1,
    area: 90,
    address: 'سوق المدينة، إدلب',
    status: 'جيد',
  },
];

const ForRentPage = () => {
  const [filters, setFilters] = useState({});

  const filteredProperties = useMemo(() => {
    return mockRentProperties.filter((property) => {
      // Same filtering logic as ForSalePage
      if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.types?.length && !filters.types.includes(property.type)) return false;
      if (filters.city && property.city !== filters.city) return false;
      if (filters.rooms && filters.rooms !== 'أي' && property.rooms !== parseInt(filters.rooms)) return false;
      // Price for rent (parse millions/month)
      const priceNum = parseInt(property.price.replace(/[^\d]/g, ''));
      if (filters.priceMin && priceNum < filters.priceMin) return false;
      if (filters.priceMax && priceNum > filters.priceMax) return false;
      if (filters.areaMin && property.area < filters.areaMin) return false;
      if (filters.areaMax && property.area > filters.areaMax) return false;
      if (filters.condition && property.status !== filters.condition) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      <Helmet>
        <title>عقارات للإيجار - الوردة للوساطة العقارية</title>
        <meta name="description" content="عقارات للإيجار في سوريا. شقق، مكاتب، محلات، مستودعات بأسعار إيجار شهرية مناسبة." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-background">
        {/* Header */}
        <section className="py-16 bg-[radial-gradient(circle_at_top,_rgba(44,173,231,0.16),_transparent_65%)]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <Badge className="inline-flex px-6 py-2 text-base font-semibold bg-secondary/90 text-secondary-foreground">
                عقارات للإيجار
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
                ابحث عن عقار للإيجار المناسب
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                مجموعة متنوعة من العقارات للإيجار الشهري في جميع المدن السورية بأسعار تنافسية وإجراءات مبسطة
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <PropertyFilters filters={filters} onFilterChange={setFilters} />

            {/* Properties Grid */}
<div className="lg:col-span-3 space-y-8 pt-8 lg:pt-12">
              {filteredProperties.length === 0 ? (
                <Card className="glass-card border-border/50">
                  <CardContent className="py-16 text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد عقارات للإيجار</h3>
                    <p className="text-muted-foreground mb-6">لم يتم العثور على عقارات مطابقة لمعايير البحث</p>
                    <Button onClick={() => setFilters({})} variant="outline">
                      إظهار جميع العقارات
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-foreground font-bold text-xl">
                      {filteredProperties.length} عقار للإيجار
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
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
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

export default ForRentPage;

