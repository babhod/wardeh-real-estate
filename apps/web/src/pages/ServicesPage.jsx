import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx';
import { Home, Key, TrendingUp, MessageSquare, CheckCircle2, Phone } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: Home,
      title: 'خدمات البيع والشراء',
      description: 'نساعدك في بيع وشراء العقارات بأفضل الأسعار والشروط المناسبة. نقدم تقييمًا دقيقًا للعقار، ونتفاوض نيابة عنك للحصول على أفضل صفقة ممكنة.',
      features: [
        'تقييم دقيق للعقار بناءً على السوق الحالي',
        'تسويق فعال للوصول إلى المشترين المحتملين',
        'التفاوض الاحترافي لضمان أفضل سعر',
        'متابعة كاملة لإجراءات البيع والشراء',
        'استشارات قانونية ومالية متخصصة',
      ],
    },
    {
      icon: Key,
      title: 'خدمات التأجير والاستئجار',
      description: 'خدمات تأجير واستئجار العقارات بمرونة وشفافية تامة. نساعدك في إيجاد المستأجر المناسب أو العقار المثالي للإيجار.',
      features: [
        'البحث عن عقارات للإيجار تناسب احتياجاتك',
        'فحص وتقييم المستأجرين المحتملين',
        'إعداد عقود الإيجار القانونية',
        'إدارة العلاقة بين المالك والمستأجر',
        'متابعة دورية لضمان سير الأمور بسلاسة',
      ],
    },
    {
      icon: TrendingUp,
      title: 'خدمات تسويق العقار',
      description: 'استراتيجيات تسويقية فعالة للوصول إلى أكبر عدد من المهتمين. نستخدم أحدث الأساليب لتسويق عقارك بشكل احترافي.',
      features: [
        'تصوير احترافي للعقار',
        'إنشاء محتوى تسويقي جذاب',
        'النشر على منصات متعددة',
        'استهداف الجمهور المناسب',
        'تقارير دورية عن أداء الحملة التسويقية',
      ],
    },
    {
      icon: MessageSquare,
      title: 'الاستشارة والمتابعة',
      description: 'استشارات متخصصة لمساعدتك في اتخاذ القرار الصحيح. نقدم نصائح مبنية على خبرة واسعة في السوق العقاري السوري.',
      features: [
        'تحليل السوق العقاري الحالي',
        'نصائح حول أفضل وقت للبيع أو الشراء',
        'تقييم الفرص الاستثمارية',
        'استشارات قانونية ومالية',
        'متابعة مستمرة حتى إتمام الصفقة',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>خدماتنا - الوردة للوساطة العقارية</title>
        <meta
          name="description"
          content="خدمات وساطة عقارية شاملة: البيع والشراء، التأجير والاستئجار، تسويق العقارات، والاستشارة العقارية المتخصصة."
        />
      </Helmet>

      <div className="pt-24 pb-16">
        {/* Header Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                خدماتنا المتميزة
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                نقدم مجموعة شاملة من الخدمات العقارية المتخصصة لتلبية جميع احتياجاتك، بمصداقية واحترافية عالية
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-card hover:shadow-2xl transition-all duration-300 border-border/50 overflow-hidden">
                    <CardHeader className="bg-gradient-to-l from-primary/5 to-transparent">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <service.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                            {service.title}
                          </CardTitle>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-foreground/90">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8 md:p-12 text-center space-y-6 border-border/50"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                هل تحتاج إلى مساعدة في خدمة معينة؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                فريقنا المتخصص جاهز للإجابة على استفساراتك وتقديم الاستشارة المناسبة لك
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link to="/contact">
                  <Phone className="ml-2 h-5 w-5" />
                  راسلنا الآن
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;