import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Home, Key, TrendingUp, MessageSquare, Shield, Award, Users, Clock, CheckCircle2, ArrowRight, Phone, MapPin } from 'lucide-react';
const HomePage = () => {
  const services = [{
    icon: Home,
    title: 'البيع والشراء',
    description: 'نساعدك في بيع وشراء العقارات بأفضل الأسعار والشروط المناسبة'
  }, {
    icon: Key,
    title: 'التأجير والاستئجار',
    description: 'خدمات تأجير واستئجار العقارات بمرونة وشفافية تامة'
  }, {
    icon: TrendingUp,
    title: 'تسويق العقارات',
    description: 'استراتيجيات تسويقية فعالة للوصول إلى أكبر عدد من المهتمين'
  }, {
    icon: MessageSquare,
    title: 'الاستشارة العقارية',
    description: 'استشارات متخصصة لمساعدتك في اتخاذ القرار الصحيح'
  }];
  const whyChooseUs = [{
    icon: Shield,
    title: 'الوضوح والمصداقية',
    description: 'نعمل بشفافية تامة ونلتزم بالمصداقية في جميع تعاملاتنا'
  }, {
    icon: Award,
    title: 'الخبرة والاحترافية',
    description: 'فريق متخصص بخبرة واسعة في السوق العقاري السوري'
  }, {
    icon: Users,
    title: 'خدمة العملاء المميزة',
    description: 'نضع عملاءنا في المقام الأول ونحرص على رضاهم التام'
  }, {
    icon: Clock,
    title: 'المتابعة المستمرة',
    description: 'نتابع معك كل خطوة حتى إتمام الصفقة بنجاح'
  }, {
    icon: MapPin,
    title: 'تغطية واسعة',
    description: 'نخدم مختلف المناطق في سوريا بكفاءة عالية'
  }];
  const howWeWork = [{
    number: '01',
    title: 'التواصل الأولي',
    description: 'تواصل معنا وأخبرنا عن احتياجاتك العقارية'
  }, {
    number: '02',
    title: 'تحديد المتطلبات',
    description: 'نستمع لك بعناية ونحدد متطلباتك بدقة'
  }, {
    number: '03',
    title: 'البحث والعرض',
    description: 'نبحث عن أفضل الخيارات ونعرضها عليك'
  }, {
    number: '04',
    title: 'إتمام الصفقة',
    description: 'نساعدك في إتمام الصفقة بسلاسة وأمان'
  }];
  const blogPosts = [{
    title: 'كيف تختار العقار المناسب لاحتياجك?',
    excerpt: 'دليل شامل لمساعدتك في اختيار العقار المثالي الذي يلبي احتياجاتك وميزانيتك'
  }, {
    title: 'أهم النقاط التي ينبغي الانتباه لها قبل بيع عقارك',
    excerpt: 'نصائح مهمة لضمان بيع عقارك بأفضل سعر وفي أقصر وقت ممكن'
  }, {
    title: 'متى يكون التأجير خيارًا أفضل من البيع?',
    excerpt: 'تحليل مفصل لمساعدتك في اتخاذ القرار الصحيح بين التأجير والبيع'
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return <>
      <Helmet>
        <title>الوردة للوساطة العقارية - شريكك العقاري الموثوق في سوريا</title>
        <meta name="description" content="خدمات وساطة عقارية باحترافية ووضوح في مختلف أنحاء سوريا. بيع، شراء، تأجير، واستشارات عقارية متخصصة." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="https://horizons-cdn.hostinger.com/6086c3cc-1f40-4882-9a52-41f4105ce3db/ossuuo--o-o-c-ossuo1uosso--uo-c-37KBd.webp" alt="عقارات فاخرة" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-32 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-accent/90 text-accent-foreground px-6 py-2 text-base font-semibold">
              خدمات عقارية باحترافية ووضوح
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow-lg leading-tight lg:leading-relaxed">
              شريكك العقاري الموثوق في مختلف أنحاء سوريا
            </h1>

            <p className="text-lg md:text-xl text-white/90 text-shadow-md max-w-2xl mx-auto leading-relaxed">
              نقدم خدمات وساطة عقارية متكاملة بمصداقية ووضوح تام، لنساعدك في تحقيق أهدافك العقارية بكل ثقة واطمئنان
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-accent/50 transition-all duration-300">
                <Link to="/contact">
                  <Phone className="ml-2 h-5 w-5" />
                  تواصل معنا الآن
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-bold px-8 py-6 text-lg rounded-xl shadow-xl transition-all duration-300">
                <Link to="/services">
                  اكتشف خدماتنا
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              الثقة والمصداقية أساس عملنا
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              في الوردة للوساطة العقارية، نؤمن بأن الثقة هي حجر الأساس في أي علاقة ناجحة. لذلك نلتزم بالشفافية التامة والوضوح في كل خطوة، ونضع مصلحة عملائنا في المقام الأول.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              خدماتنا المتميزة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات العقارية لتلبية جميع احتياجاتك
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card hover:shadow-2xl transition-all duration-300 h-full border-border/50">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              لماذا تختار الوردة للوساطة العقارية؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نتميز بمجموعة من المزايا التي تجعلنا الخيار الأمثل لك
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card hover:shadow-2xl transition-all duration-300 h-full border-border/50">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كيف نعمل؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              عملية بسيطة وواضحة لضمان تجربة سلسة ومريحة
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeWork.map((step, index) => <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card hover:shadow-2xl transition-all duration-300 h-full border-border/50 relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-6xl font-bold text-primary/10">
                    {step.number}
                  </div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              تغطية شاملة في مختلف أنحاء سوريا
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              نخدم عملاءنا في مختلف المحافظات والمناطق السورية، مع التركيز على تقديم خدمة متميزة تلبي احتياجات كل منطقة بخصوصيتها.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              هل أنت مستعد للبدء؟
            </h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              تواصل معنا اليوم ودعنا نساعدك في تحقيق أهدافك العقارية بكل احترافية ووضوح
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <Link to="/contact">
                <Phone className="ml-2 h-5 w-5" />
                تواصل معنا الآن
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              من مدونتنا
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نصائح ومقالات مفيدة لمساعدتك في اتخاذ قرارات عقارية صحيحة
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card hover:shadow-2xl transition-all duration-300 h-full border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                    <Button asChild variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto font-semibold">
                      <Link to="/blog">
                        اقرأ المزيد
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>)}
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link to="/blog">
                عرض جميع المقالات
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>;
};
export default HomePage;