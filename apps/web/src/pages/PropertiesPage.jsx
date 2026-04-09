import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const mockSaleProperties = [
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
    purpose: 'sale',
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
    purpose: 'sale',
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
    purpose: 'sale',
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
    purpose: 'sale',
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
    purpose: 'sale',
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
    purpose: 'sale',
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
    purpose: 'sale',
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
    purpose: 'sale',
  },
];

const mockRentProperties = [
  {
    id: 9,
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
    purpose: 'rent',
  },
  {
    id: 10,
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
    purpose: 'rent',
  },
  {
    id: 11,
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
    purpose: 'rent',
  },
  {
    id: 12,
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
    purpose: 'rent',
  },
  {
    id: 13,
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
    purpose: 'rent',
  },
  {
    id: 14,
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
    purpose: 'rent',
  },
  {
    id: 15,
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
    purpose: 'rent',
  },
  {
    id: 16,
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
    purpose: 'rent',
  },
  {
    id: 17,
    title: 'شقة مفروشة للإيجار',
    type: 'شقة',
    city: 'دمشق',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800',
    price: '20 مليون/شهر',
    rooms: 2,
    baths: 1,
    area: 110,
    address: 'أبو رمانة، دمشق',
    status: 'جيد',
    purpose: 'rent',
  },
  {
    id: 18,
    title: 'مكتب حديث للإيجار',
    type: 'مكتب',
    city: 'حلب',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    price: '28 مليون/شهر',
    rooms: 3,
    baths: 1,
    area: 140,
    address: 'الجميلية، حلب',
    status: 'جيد',
    purpose: 'rent',
  },
  {
    id: 19,
    title: 'محل تجاري للإيجار في سوق نشط',
    type: 'محل تجاري',
    city: 'طرطوس',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800',
    price: '16 مليون/شهر',
    rooms: 1,
    baths: 1,
    area: 75,
    address: 'الكورنيش، طرطوس',
    status: 'جيد',
    purpose: 'rent',
  },
  {
    id: 20,
    title: 'مستودع واسع للإيجار',
    type: 'مستودع',
    city: 'حماة',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    price: '40 مليون/شهر',
    rooms: 0,
    baths: 1,
    area: 650,
    address: 'المنطقة الصناعية، حماة',
    status: 'يحتاج صيانة',
    purpose: 'rent',
  },
  {
    id: 21,
    title: 'شقة للإيجار بإطلالة جميلة',
    type: 'شقة',
    city: 'اللاذقية',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800',
    price: '14 مليون/شهر',
    rooms: 3,
    baths: 2,
    area: 135,
    address: 'الشيخ ضاهر، اللاذقية',
    status: 'جيد',
    purpose: 'rent',
  },
];

const mapCategory = (type) => {
  if (type === 'شقة') return 'شقق';
  if (type === 'فيلا') return 'فلل';
  if (type === 'منزل') return 'منازل';
  if (type === 'مكتب') return 'مكاتب';
  if (type === 'محل تجاري') return 'محلات';
  return '';
};

const mapPropertyType = (type) => (['شقة', 'منزل', 'فيلا'].includes(type) ? 'سكني' : 'تجاري');

const normalizeAreaName = (address) => {
  if (!address) return '';
  const parts = address.split('،');
  return parts[0]?.trim() || address;
};

const parsePriceMillions = (price) => {
  const digits = price.replace(/[^\d]/g, '');
  return parseInt(digits, 10) || 0;
};

const enrichProperty = (property) => {
  const priceMillions = parsePriceMillions(property.price);
  const priceSYP = priceMillions * 1000;
  const priceUSD = Math.round(priceSYP / 500);
  const totalArea = property.area || 0;
  const builtArea = Math.max(0, Math.round(totalArea * 0.85));

  return {
    ...property,
    rentDuration: property.rentDuration || (property.purpose === 'rent' ? 'شهري' : ''),
    propertyType: mapPropertyType(property.type),
    category: mapCategory(property.type),
    governorate: property.governorate || property.city,
    areaName: property.areaName || normalizeAreaName(property.address),
    builtArea,
    totalArea,
    floor: property.floor || (property.type === 'شقة' || property.type === 'مكتب' ? '2' : 'أرضي'),
    age: property.age || '0-5 سنوات',
    constructionStatus: property.constructionStatus || 'تم',
    heating: property.heating || (property.type === 'مستودع' || property.type === 'أرض' ? 'لا يوجد' : 'مركزي'),
    cooling: property.cooling || (property.type === 'مستودع' || property.type === 'أرض' ? 'لا يوجد' : 'مكيف'),
    balconies: property.balconies || (property.type === 'شقة' ? 'واحدة' : 'لا يوجد'),
    parking: property.parking || 'كراج',
    furniture: property.furniture || 'غير مفروش',
    elevator: property.elevator || (property.type === 'شقة' || property.type === 'مكتب' ? 'يوجد' : 'لا يوجد'),
    occupancy: property.occupancy || 'شاغر',
    buildingCondition: property.buildingCondition || 'جديد',
    taboType: property.taboType || 'طابو أخضر',
    priceUSD,
    priceSYP,
  };
};

const allProperties = [...mockSaleProperties, ...mockRentProperties].map(enrichProperty);

const PropertiesPage = () => {
  const [filters, setFilters] = useState({ listingType: 'all' });

  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      // Listing type
      if (filters.listingType && filters.listingType !== 'all' && property.purpose !== filters.listingType) return false;
      if (filters.listingType === 'rent' && filters.rentDuration && property.rentDuration !== filters.rentDuration) return false;

      // Search
      if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase())) return false;

      // Property type
      if (filters.propertyType && property.propertyType !== filters.propertyType) return false;

      // Category
      if (filters.category && property.category !== filters.category) return false;

      // Governorate
      if (filters.governorate && property.governorate !== filters.governorate) return false;

      // City
      if (filters.city && property.city !== filters.city) return false;

      // Area
      if (filters.area && property.areaName !== filters.area) return false;

      // Price USD
      if (filters.usdMin && property.priceUSD < filters.usdMin) return false;
      if (filters.usdMax && property.priceUSD > filters.usdMax) return false;

      // Price SYP
      if (filters.sypMin && property.priceSYP < filters.sypMin) return false;
      if (filters.sypMax && property.priceSYP > filters.sypMax) return false;

      // Built area
      if (filters.builtMin && property.builtArea < filters.builtMin) return false;
      if (filters.builtMax && property.builtArea > filters.builtMax) return false;

      // Total area
      if (filters.totalMin && property.totalArea < filters.totalMin) return false;
      if (filters.totalMax && property.totalArea > filters.totalMax) return false;

      // Rooms
      const roomsNum = parseInt(filters.rooms, 10);
      if (filters.rooms && roomsNum && (roomsNum >= 5 ? property.rooms < 5 : property.rooms !== roomsNum)) return false;

      // Bathrooms
      const bathsNum = parseInt(filters.bathrooms, 10);
      if (filters.bathrooms && bathsNum && property.baths !== bathsNum) return false;

      // Floor
      if (filters.floor && property.floor !== filters.floor) return false;

      // Age
      if (filters.age && property.age !== filters.age) return false;

      // Construction status
      if (filters.constructionStatus && property.constructionStatus !== filters.constructionStatus) return false;

      // Heating
      if (filters.heating && property.heating !== filters.heating) return false;

      // Cooling
      if (filters.cooling && property.cooling !== filters.cooling) return false;

      // Balconies
      if (filters.balconies && property.balconies !== filters.balconies) return false;

      // Parking
      if (filters.parking && property.parking !== filters.parking) return false;

      // Furniture
      if (filters.furniture && property.furniture !== filters.furniture) return false;

      // Elevator
      if (filters.elevator && property.elevator !== filters.elevator) return false;

      // Occupancy
      if (filters.occupancy && property.occupancy !== filters.occupancy) return false;

      // Building condition
      if (filters.buildingCondition && property.buildingCondition !== filters.buildingCondition) return false;

      // Tabo type
      if (filters.taboType && property.taboType !== filters.taboType) return false;

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
        <title>جميع العقارات - الوردة للوساطة العقارية</title>
        <meta name="description" content="جميع العقارات للبيع والإيجار في مختلف المدن السورية. شقق، فلل، مكاتب، أراضي بأسعار مناسبة مع صور وتفاصيل كاملة." />
      </Helmet>

      <div className="min-h-screen pt-[5.5rem] pb-16 bg-background">
        <div className="container mx-auto px-4 pt-8 lg:pt-4">
          <div className="lg:grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            {/* Properties Grid */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <Input
                  value={filters.search || ''}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="أدخل كلمات بحث - موقع، نوع، سعر"
                  className="flex-1"
                />
                <Button onClick={() => setFilters({ listingType: 'all' })} className="w-full md:w-auto">
                  مسح الكل
                </Button>
              </div>

              {filteredProperties.length === 0 ? (
                <Card className="glass-card border-border/50">
                  <CardContent className="py-16 text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد عقارات</h3>
                    <p className="text-muted-foreground mb-6">لم يتم العثور على عقارات مطابقة لفلاتر البحث</p>
                    <Button onClick={() => setFilters({ listingType: 'all' })} variant="outline">
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
                      <motion.div
                        key={property.id}
                        variants={itemVariants}
                        className="h-full"
                      >
                        <PropertyCard property={property} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
            </div>

            {/* Filters Sidebar */}
            <PropertyFilters filters={filters} onFilterChange={setFilters} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesPage;

