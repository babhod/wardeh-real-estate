import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Heart, MapPin, Bed, Bath, Maximize2, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';

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

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = allProperties.find(p => p.id == id); // loose == for string ids if needed

  if (!property) {
    return (
      <div className="min-h-screen pt-[5.5rem] flex items-center justify-center">
        <Card className="max-w-md mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">عقار غير موجود</h2>
          <Button asChild onClick={() => navigate('/properties')}>
            <Link to="/properties">العودة للعقارات</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const imageUrl = property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200';
  const galleryImages = [
    imageUrl,
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
  ];
  const [activeImage, setActiveImage] = useState(imageUrl);

  useEffect(() => {
    setActiveImage(imageUrl);
  }, [imageUrl]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Helmet>
        <title>{property.title} - الوردة للوساطة العقارية</title>
        <meta name="description" content={`${property.title} في ${property.city}. ${property.type}, ${property.area}م², ${property.price}`} />
      </Helmet>

      <div className="min-h-screen pt-[5.5rem] pb-16 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4" dir="rtl">
          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" onClick={() => navigate('/properties')} className="gap-2">
              <ArrowLeft className="h-5 w-5" />
              العودة للعقارات
            </Button>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          >
            {/* Image */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <AspectRatio ratio={4 / 3} className="w-full h-[500px] lg:h-[600px]">
                  <img
                    src={activeImage}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200';
                    }}
                  />
                </AspectRatio>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${property.id}-gallery-${index}`}
                    type="button"
                    className={`relative overflow-hidden rounded-3xl border-2 transition-all ${
                      activeImage === img ? 'border-primary shadow-lg' : 'border-transparent hover:border-primary/50'
                    }`}
                    onClick={() => setActiveImage(img)}
                    aria-label={`عرض الصورة ${index + 1}`}
                  >
                    <AspectRatio ratio={16 / 10}>
                      <img
                        src={img}
                        alt={`${property.title} ${index + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200';
                        }}
                      />
                    </AspectRatio>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-lg px-4 py-2 rounded-full font-semibold">
                    {property.type}
                  </Badge>
                  <Badge variant="outline" className="border-primary/50 text-primary/80 text-lg px-4 py-2 rounded-full font-semibold">
                    {property.city}
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-5xl leading-[1.2] pb-1 font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-4">
                  {property.title}
                </h1>
                {/*<div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {property.price}
                </div>*/}
                {property.purpose === 'rent' && (
                  <p className="text-xl text-muted-foreground font-semibold">للإيجار {property.rentDuration || 'الشهري'}</p>
                )}
              </div>

              <Card className="glass-card border-border/50 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">تفاصيل العقار</CardTitle>
                  <CardDescription className="text-muted-foreground">معلومات مفصلة عن العقار</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">نوع العقار</div>
                      <div className="font-semibold">{property.propertyType}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">فئة العقار</div>
                      <div className="font-semibold">{property.category}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">المحافظة</div>
                      <div className="font-semibold">{property.governorate}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">المنطقة</div>
                      <div className="font-semibold">{property.areaName}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">المساحة المبنية</div>
                      <div className="font-semibold">{property.builtArea} م²</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">المساحة الكلية</div>
                      <div className="font-semibold">{property.totalArea} م²</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">الطابق</div>
                      <div className="font-semibold">{property.floor}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">عمر البناء</div>
                      <div className="font-semibold">{property.age}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">حالة الإنشاء</div>
                      <div className="font-semibold">{property.constructionStatus}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">نوع التدفئة</div>
                      <div className="font-semibold">{property.heating}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">نوع التبريد</div>
                      <div className="font-semibold">{property.cooling}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">عدد الشرفات</div>
                      <div className="font-semibold">{property.balconies}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">مواقف السيارات</div>
                      <div className="font-semibold">{property.parking}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">الفرش</div>
                      <div className="font-semibold">{property.furniture}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">المصعد</div>
                      <div className="font-semibold">{property.elevator}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">حالة الاستخدام</div>
                      <div className="font-semibold">{property.occupancy}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">حالة البناء</div>
                      <div className="font-semibold">{property.buildingCondition}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">نوع الطابو</div>
                      <div className="font-semibold">{property.taboType}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">السعر بالدولار</div>
                      <div className="font-semibold">{property.priceUSD} $</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <div className="text-sm text-muted-foreground">السعر بالليرة السورية</div>
                      <div className="font-semibold">{property.priceSYP} ألف</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Button size="lg" className="group gap-3 h-16 text-lg font-semibold shadow-xl hover:shadow-2xl">
                  <Phone className="h-6 w-6 group-hover:-translate-y-0.5 transition-transform" />
                 تواصل معنا عبر الواتساب
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailPage;
