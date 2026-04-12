import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
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
    purpose: 'sale',
    category: 'سكني',
    governorate: 'دمشق',
    areaName: 'ميدان الحرية',
    builtArea: 130,
    totalArea: 150,
    floor: '2',
    age: '0-5 سنوات',
    constructionStatus: 'تم',
    heating: 'مركزي',
    cooling: 'مكيف',
    balconies: 'واحدة',
    parking: 'كراج',
    furniture: 'غير مفروش',
    elevator: 'يوجد',
    occupancy: 'شاغر',
    buildingCondition: 'جديد',
    taboType: 'طابو أخضر',
    priceUSD: 5000, // approx for filtering
    priceSYP: 2500000,
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
    category: 'سكني',
    governorate: 'حلب',
    areaName: 'المنصورة',
    builtArea: 300,
    totalArea: 350,
    floor: 'أرضي',
    age: '5-10',
    constructionStatus: 'تم',
    heating: 'شمسية',
    cooling: 'مكيف',
    balconies: 'اثنتين',
    parking: 'تحت الأرض',
    furniture: 'مفروش كامل',
    elevator: 'لا يوجد',
    occupancy: 'شاغر',
    buildingCondition: 'جديد',
    taboType: 'طابو أخضر',
    priceUSD: 10400,
    priceSYP: 5200000,
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
    category: 'سكني',
    governorate: 'حمص',
    areaName: 'الخالدية',
    builtArea: 200,
    totalArea: 220,
    floor: '1',
    age: '10-20',
    constructionStatus: 'تم',
    heating: 'مازوت',
    cooling: 'لا يوجد',
    balconies: 'أكثر',
    parking: 'كراج',
    furniture: 'غير مفروش',
    elevator: 'لا يوجد',
    occupancy: 'مشغول من المالك',
    buildingCondition: 'قديم',
    taboType: 'عقد بيع',
    priceUSD: 3600,
    priceSYP: 1800000,
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
    category: 'تجاري',
    governorate: 'دمشق',
    areaName: 'برزة',
    builtArea: 170,
    totalArea: 180,
    floor: '3',
    age: '5-10',
    constructionStatus: 'تم',
    heating: 'مركزي',
    cooling: 'مكيف',
    balconies: 'لا يوجد',
    parking: 'تحت الأرض',
    furniture: 'غير مفروش',
    elevator: 'يوجد',
    occupancy: 'شاغر',
    buildingCondition: 'مجدد',
    taboType: 'طابو زراعي',
    priceUSD: 6400,
    priceSYP: 3200000,
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
    category: 'تجاري',
    governorate: 'طرطوس',
    areaName: 'الساحل',
    builtArea: 80,
    totalArea: 100,
    floor: 'أرضي',
    age: '0-5 سنوات',
    constructionStatus: 'تم',
    heating: 'لا يوجد',
    cooling: 'لا يوجد',
    balconies: 'لا يوجد',
    parking: 'لا يوجد',
    furniture: 'غير مفروش',
    elevator: 'لا يوجد',
    occupancy: 'شاغر',
    buildingCondition: 'جديد',
    taboType: 'حكم محكمة',
    priceUSD: 2400,
    priceSYP: 1200000,
  },
  // Add more mocks as needed with full fields
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
    category: 'تجاري',
    governorate: 'إدلب',
    areaName: 'سرمدا',
    builtArea: 0,
    totalArea: 2000,
    floor: '',
    age: '',
    constructionStatus: 'قيد الإنشاء',
    heating: '',
    cooling: '',
    balconies: '',
    parking: '',
    furniture: '',
    elevator: '',
    occupancy: 'شاغر',
    buildingCondition: '',
    taboType: 'طابو زراعي',
    priceUSD: 9600,
    priceSYP: 4800000,
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
    category: 'سكني',
    governorate: 'اللاذقية',
    areaName: 'رمل العلية',
    builtArea: 130,
    totalArea: 140,
    floor: '4',
    age: '0-5 سنوات',
    constructionStatus: 'تم',
    heating: 'شمسية',
    cooling: 'مكيف',
    balconies: 'واحدة',
    parking: 'كراج',
    furniture: 'غير مفروش',
    elevator: 'يوجد',
    occupancy: 'شاغر',
    buildingCondition: 'جديد',
    taboType: 'طابو أخضر',
    priceUSD: 4400,
    priceSYP: 2200000,
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
    category: 'تجاري',
    governorate: 'حماة',
    areaName: 'المنطقة الصناعية',
    builtArea: 800,
    totalArea: 1000,
    floor: 'أرضي',
    age: '10-20',
    constructionStatus: 'على العظم',
    heating: 'مازوت',
    cooling: 'لا يوجد',
    balconies: '',
    parking: 'تحت الأرض',
    furniture: 'غير مفروش',
    elevator: 'لا يوجد',
    occupancy: 'شاغر',
    buildingCondition: 'قديم',
    taboType: 'وكالة كاتب عدل',
    priceUSD: 13000,
    priceSYP: 6500000,
  },
];

const typesOptions = ['اختر نوع العقار', 'شقة', 'منزل', 'فيلا', 'مكتب', 'محل تجاري', 'أرض', 'مستودع'];
const citiesOptions = ['اختر المدينة', 'دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'إدلب'];
const roomsOptions = ['عدد الغرف', '1', '2', '3', '4', '5+'];

const ForSalePage = () => {
  const [filters, setFilters] = useState({ listingType: 'sale' });
  const [sortBy, setSortBy] = useState('newest');

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // Listing type (for sale page, only sale)
      if (filters.listingType && filters.listingType !== 'all' && property.purpose !== filters.listingType) return false;

      // Search
      if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase())) return false;

      // Property type
      if (filters.propertyType && property.type !== filters.propertyType.replace('سكني', 'شقة').replace('تجاري', property.category)) return false;

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
      const roomsNum = parseInt(filters.rooms);
      if (filters.rooms && roomsNum && (roomsNum >= 5 ? property.rooms < 5 : property.rooms !== roomsNum)) return false;

      // Bathrooms
      const bathsNum = parseInt(filters.bathrooms);
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

      // Legacy filters compatibility
      if (filters.type && property.type !== filters.type) return false;
      const legacyRoomNum = parseInt(filters.rooms);
      if (filters.rooms && legacyRoomNum && filters.rooms !== 'عدد الغرف' && (legacyRoomNum >= 5 ? property.rooms < 5 : property.rooms !== legacyRoomNum)) return false;
      const priceNum = property.priceSYP;
      if (filters.priceMin && priceNum < filters.priceMin) return false;
      if (filters.priceMax && priceNum > filters.priceMax) return false;

      return true;
    }).sort((a, b) => {
      switch(sortBy) {
        case 'letters':
          return b.title.localeCompare(a.title);
        case 'space':
          return b.totalArea - a.totalArea;
        case 'price':
          return b.priceSYP - a.priceSYP;
        case 'newest':
        default:
          return b.id - a.id;
      }
    });
  }, [filters, sortBy]);

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
        {/* Top Quick Filters (Hidden) */}

        {/* Main Content with Sidebar */}
        <div className="container mx-auto px-4 lg:px-8 pt-8 lg:pt-4">
          <div className="lg:grid lg:grid-cols-[320px_1fr] gap-8 items-start">
            {/* Advanced Filters Sidebar - Hidden on Mobile */}
            <div className="hidden lg:block">
              <PropertyFilters filters={filters} onFilterChange={setFilters} />
            </div>

            {/* Properties Grid */}
            <div className="space-y-6">
              {/* Mobile Filter & Sort Controls - Side by Side */}
              <div className="lg:hidden flex flex-wrap items-center gap-4 mb-8">
                <div className="flex-1">
                  <PropertyFilters filters={filters} onFilterChange={setFilters} />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" dir="rtl">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectItem value="newest">الأحدث أولاً</SelectItem>
                    <SelectItem value="letters">ترتيب أبجدي</SelectItem>
                    <SelectItem value="space">المساحة (الأكبر أولاً)</SelectItem>
                    <SelectItem value="price">السعر (الأعلى أولاً)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {filteredProperties.length === 0 ? (
                <Card className="glass-card border-border/50">
                  <CardContent className="py-16 text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد عقارات للبيع</h3>
                    <p className="text-muted-foreground mb-6">لم يتم العثور على عقارات مطابقة لفلاتر البحث</p>
                    <Button onClick={() => setFilters({ listingType: 'sale' })} variant="outline">
                      إظهار جميع العقارات
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div>
                  <div className="hidden lg:flex items-center justify-end gap-4 mb-8">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40" dir="rtl">
                        <SelectValue placeholder="ترتيب حسب" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        <SelectItem value="newest">الأحدث أولاً</SelectItem>
                        <SelectItem value="letters">ترتيب أبجدي</SelectItem>
                        <SelectItem value="space">المساحة (الأكبر أولاً)</SelectItem>
                        <SelectItem value="price">السعر (الأعلى أولاً)</SelectItem>
                      </SelectContent>
                    </Select>
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
      </div>
    </>
  );
};

export default ForSalePage;

