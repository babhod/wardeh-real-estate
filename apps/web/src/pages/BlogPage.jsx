import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx';
import { ArrowRight, BookOpen } from 'lucide-react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const articles = [
    {
      slug: 'choosing-right-property',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      category: 'اختيار العقار',
      title: 'كيف تختار العقار المناسب لاحتياجك?',
      excerpt: 'دليل شامل لمساعدتك في اختيار العقار المثالي الذي يلبي احتياجاتك وميزانيتك. نستعرض أهم العوامل التي يجب مراعاتها عند البحث عن عقار، من الموقع والمساحة إلى البنية التحتية والخدمات المتوفرة في المنطقة.',
    },
    {
      slug: 'selling-tips',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      category: 'بيع العقار',
      title: 'أهم النقاط التي ينبغي الانتباه لها قبل بيع عقارك',
      excerpt: 'نصائح مهمة لضمان بيع عقارك بأفضل سعر وفي أقصر وقت ممكن. تعرف على كيفية تحضير عقارك للبيع، تحديد السعر المناسب، واختيار الوقت الأمثل لعرضه في السوق. نقدم لك استراتيجيات فعالة لجذب المشترين المحتملين.',
    },
    {
      slug: 'rent-vs-sell',
      imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      category: 'تأجير مقابل بيع',
      title: 'متى يكون التأجير خيارًا أفضل من البيع?',
      excerpt: 'تحليل مفصل لمساعدتك في اتخاذ القرار الصحيح بين التأجير والبيع. نناقش العوامل الاقتصادية والشخصية التي تؤثر على هذا القرار، ونقدم أمثلة واقعية لمساعدتك في تقييم الخيار الأنسب لظروفك الخاصة.',
    },
  ];

  const categoryOptions = useMemo(
    () => ['all', ...Array.from(new Set(articles.map((article) => article.category)))],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
        <title>المدونة - الوردة للوساطة العقارية</title>
        <meta
          name="description"
          content="مقالات ونصائح عقارية مفيدة من خبراء الوردة للوساطة العقارية. تعرف على أحدث الاتجاهات والنصائح في السوق العقاري السوري."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'المدونة',
            description:
              'مجموعة مقالات عقارية حول اختيار العقار، بيع العقار، والتأجير مقابل البيع.',
            itemListElement: articles.map((article, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${window.location.origin}/blog/${article.slug}`,
              name: article.title,
              description: article.excerpt,
            })),
          })}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-cyan-100 text-slate-800">
        {/* Header Section */}
        <section className="py-16 bg-gradient-to-br from-cyan-500/15 via-purple-200/20 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                المدونة
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                نصائح ومقالات مفيدة لمساعدتك في اتخاذ قرارات عقارية صحيحة ومدروسة
              </p>
            </motion.div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted/20 text-foreground hover:bg-muted/40'
                  }`}
                >
                  {category === 'all' ? 'جميع الفئات' : category}
                </button>
              ))}
            </div>
            <div className="mb-6 text-center text-sm text-muted-foreground">
              عرض {paginatedArticles.length} من أصل {filteredArticles.length} مقالات
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {paginatedArticles.map((article, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border-border/40 flex flex-col bg-gradient-to-b from-white via-cyan-50 to-slate-50">
                    <div className="relative h-40 overflow-hidden bg-slate-200">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = 'https://via.placeholder.com/480x240?text=Real+Estate';
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-2 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wide">
                        {article.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-slate-900 leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-slate-700 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
                        <span className="rounded-md px-2 py-1 bg-rose-100 text-rose-700">New</span>
                        <span className="rounded-md px-2 py-1 bg-blue-100 text-blue-700">رأي الخبراء</span>
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        className="text-primary hover:text-primary/80 p-0 h-auto font-semibold self-start"
                      >
                        <Link to={`/blog/${article.slug}`} className="flex items-center gap-2">
                          اقرأ المزيد
                          <ArrowRight className="mr-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted/40 disabled:opacity-50"
              >
                السابق
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                    page === currentPage ? 'bg-primary text-primary-foreground' : 'bg-white text-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted/40 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
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
              className="glass-card rounded-2xl p-8 md:p-12 text-center space-y-6 border-border/50 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                هل لديك سؤال عقاري؟
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                فريقنا المتخصص جاهز للإجابة على جميع استفساراتك وتقديم الاستشارة المناسبة
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link to="/contact">
                  تواصل معنا
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;