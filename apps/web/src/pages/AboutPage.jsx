import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx';
import { Eye, Shield, Award, Users, Clock, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Eye,
      title: 'الوضوح',
      description: 'نعمل بشفافية تامة في جميع تعاملاتنا، ونوضح كل التفاصيل لعملائنا دون أي غموض',
    },
    {
      icon: Shield,
      title: 'المصداقية',
      description: 'نلتزم بالصدق والأمانة في كل ما نقوم به، ونضع مصلحة عملائنا في المقام الأول',
    },
    {
      icon: Award,
      title: 'الالتزام',
      description: 'نلتزم بوعودنا ونحرص على تقديم خدمة متميزة تفوق توقعات عملائنا',
    },
    {
      icon: Users,
      title: 'الاحترام',
      description: 'نحترم عملاءنا وشركاءنا ونقدر وقتهم واحتياجاتهم الخاصة',
    },
    {
      icon: Clock,
      title: 'حسن المتابعة',
      description: 'نتابع مع عملائنا بشكل مستمر ونحرص على رضاهم التام في كل مرحلة',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>من نحن - الوردة للوساطة العقارية</title>
        <meta
          name="description"
          content="تعرف على الوردة للوساطة العقارية، رؤيتنا، قيمنا، والتزامنا بتقديم خدمات عقارية باحترافية ووضوح في سوريا."
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
                من نحن
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                الوردة للوساطة العقارية هي شركة متخصصة في تقديم خدمات الوساطة العقارية بأعلى معايير الاحترافية والوضوح في مختلف أنحاء سوريا
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card border-border/50 overflow-hidden">
                <CardHeader className="bg-gradient-to-l from-primary/5 to-transparent">
                  <CardTitle className="text-3xl font-bold text-foreground">
                    رؤيتنا
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    نسعى لأن نكون الخيار الأول والأكثر موثوقية في مجال الوساطة العقارية في سوريا، من خلال تقديم خدمات متميزة تتسم بالوضوح والمصداقية والاحترافية. نؤمن بأن كل عميل يستحق تجربة استثنائية، ونعمل جاهدين لتحقيق ذلك في كل صفقة نقوم بها.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                قيمنا
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                القيم التي نؤمن بها وتوجه عملنا اليومي
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {values.map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-card hover:shadow-2xl transition-all duration-300 h-full border-border/50">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="glass-card border-border/50 overflow-hidden">
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-lg text-foreground leading-relaxed">
                        نحن في الوردة للوساطة العقارية نفخر بكوننا شريكًا موثوقًا لعملائنا في رحلتهم العقارية
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-lg text-foreground leading-relaxed">
                        نلتزم بتقديم خدمة متميزة تتجاوز التوقعات، ونعمل بجد لبناء علاقات طويلة الأمد مبنية على الثقة والاحترام المتبادل
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-lg text-foreground leading-relaxed">
                        سواء كنت تبحث عن بيع أو شراء أو تأجير عقار، أو تحتاج إلى استشارة عقارية متخصصة، فإن فريقنا جاهز لمساعدتك في كل خطوة
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;