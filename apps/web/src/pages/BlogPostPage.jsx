import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { ArrowLeft, BookOpen } from 'lucide-react';

const posts = [
  {
    slug: 'choosing-right-property',
    title: 'كيف تختار العقار المناسب لاحتياجك?',
    date: 'تاريخ النشر: 2026-04-02',
    content: [
      'اختيار العقار المناسب خطوة مهمة تحتاج إلى قائمة أولويات واضحة. يجب أن تبدأ بتحديد الغرض من الشراء (استثمار، سكن، تجديد) ثم تقييم الموقع، البنية التحتية، وسهولة الوصول إلى الخدمات.',
      'انتبه إلى مساحة العقار، جودة التشطيبات، والأمان بالإضافة إلى التكلفة الإجمالية (السعر، الضرائب، وأجور الصيانة). قم بزيارة العقار شخصيًا وتفقد المستندات القانونية قبل اتخاذ قرارك النهائي.',
      'استشارة الخبراء العقاريين يمكن أن توفر عليك وقتًا كبيرًا وتقلل من المخاطر؛ ولذلك قد يكون من الأفضل الاعتماد على وسيط موثوق أو محلل عقاري للحصول على تقييم شامل.'
    ],
  },
  {
    slug: 'selling-tips',
    title: 'أهم النقاط التي ينبغي الانتباه لها قبل بيع عقارك',
    date: 'تاريخ النشر: 2026-03-20',
    content: [
      'التحضير الجيد للعقار قبل عرضه يشمل تنظيفًا شاملاً، ترتيبًا مثاليًا للأثاث، وإصلاح أعطال صغيرة. انطباع أول جيد يزيد من فرص البيع بقيمة أعلى.',
      'قم بتسعير العقار بشكل واقعي بناءً على تقييم السوق الحالي والمقارنات مع عقارات مماثلة في نفس المنطقة. استخدام تصوير احترافي يساعد في إبراز مميزات العقار وجذب عدد أكبر من المشترين.',
      'اختر وقتًا مناسبًا لعرض العقار في السوق مع حفظ المرونة لتحديد مواعيد الزيارات، وتحدث مع مستشار قانوني للتأكد من أن جميع الوثائق سليمة.'
    ],
  },
  {
    slug: 'rent-vs-sell',
    title: 'متى يكون التأجير خيارًا أفضل من البيع?',
    date: 'تاريخ النشر: 2026-02-28',
    content: [
      'عند تحليل خيار التأجير مقابل البيع، يجب أن توازن بين العائد الحالي والمستقبلي، والتكلفة المجهرية مثل الصيانة وإدارة العقار. التأجير يضمن دخلًا مستمرًا بينما البيع يوفر مبلغًا نقديًا فوريًا.',
      'اختر التأجير إذا كانت هناك توقعات بارتفاع الأسعار في المنطقة أو إذا كنت غير مستعد للتخلي عن العقار تمامًا. أما إذا كنت تحتاج سيولة مالية فورية أو ترغب في تخفيف المسؤولية الإدارية، قد يكون البيع الخيار الأفضل.',
      'ضع في الاعتبار عوامل مثل الطلب المحلي، موقع العقار، وسهولة العثور على مستأجرين موثوقين. تعاون مع شركة إدارة عقار محترفة لتقليل المخاطر وتحسين تجربة التأجير.'
    ],
  },
];

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="pt-24 pb-16">
        <Helmet>
          <title>المقال غير موجود - الوردة للوساطة العقارية</title>
        </Helmet>
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">المقال غير موجود</h1>
          <p className="text-muted-foreground mb-8">عذرًا، المقال الذي تحاول الوصول إليه غير موجود أو تمت إزالته.</p>
          <Button asChild>
            <Link to="/blog" className="button">
              العودة إلى المدونة
            </Link>
          </Button>
        </section>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - الوردة للوساطة العقارية</title>
        <meta name="description" content={`${post.title} - مقال مفصل في المدونة`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.content[0],
            datePublished: post.date ? post.date.replace('تاريخ النشر: ', '') : undefined,
            author: {
              '@type': 'Organization',
              name: 'الوردة للوساطة العقارية',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': (typeof window !== 'undefined' && window.location.href) || '',
            },
            publisher: {
              '@type': 'Organization',
              name: 'الوردة للوساطة العقارية',
            },
          })}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 text-slate-800">
        <section className="py-16 bg-gradient-to-br from-indigo-500/20 via-fuchsia-200/20 to-cyan-300/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6 rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl">
              <div className="flex items-center gap-3 text-primary">
                <BookOpen className="h-6 w-6" />
                <span className="font-semibold">المدونة</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{post.title}</h1>
              <p className="text-sm text-slate-600">{post.date}</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold">نصائح</span>
                <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">عقارات</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="glass-card border-border/50 bg-white/90 shadow-xl backdrop-blur-xl">
              <CardContent className="space-y-6 p-8 md:p-10">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}
                
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <Button asChild variant="outline" className="font-semibold">
                    <Link to="/blog" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" /> العودة إلى المدونة
                    </Link>
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-3">
                    شارك المقال عبر واتساب
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPostPage;
