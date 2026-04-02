import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select.jsx';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.js';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    requestType: '',
    message: '',
  });

  const contactCards = [
    {
      icon: Phone,
      title: 'الهاتف',
      value: '+963 942 582 707',
      href: 'tel:+963942582707',
      color: 'text-primary',
    },
    {
      icon: MessageCircle,
      title: 'واتساب',
      value: '+1 551 758 9448',
      href: 'https://wa.me/15517589448',
      color: 'text-green-600',
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      value: 'info@alwardare.com',
      href: 'mailto:info@alwardare.com',
      color: 'text-accent',
    },
    {
      icon: MapPin,
      title: 'العنوان',
      value: 'برج التجارة، الطابق الثالث، مكتب 63، سرمدا / إدلب، سوريا',
      href: null,
      color: 'text-primary',
    },
  ];

  const requestTypes = [
    'بيع عقار',
    'شراء عقار',
    'تأجير عقار',
    'استئجار عقار',
    'استشارة عقارية',
    'أخرى',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      requestType: value,
    }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.phone || !formData.requestType || !formData.message) {
      toast({
        title: 'خطأ',
        description: 'الرجاء ملء جميع الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    const textMessage = `مرحبا، أنا أتواصل معكم من موقع الوردة للوساطة العقارية

الاسم: ${formData.fullName || 'لم يتم ملؤه'}
رقم الهاتف: ${formData.phone || 'لم يتم ملؤه'}
البريد الإلكتروني: ${formData.email || 'لم يتم ملؤه'}
نوع الطلب: ${formData.requestType || 'لم يتم ملؤه'}
التفاصيل: ${formData.message || 'لم يتم ملؤه'}`;

    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/15517589448?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

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
        <title>تواصل معنا - الوردة للوساطة العقارية</title>
        <meta
          name="description"
          content="تواصل مع الوردة للوساطة العقارية عبر الهاتف، واتساب، أو البريد الإلكتروني. نحن هنا لمساعدتك في جميع احتياجاتك العقارية."
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
                تواصل معنا
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك العقارية. تواصل معنا بالطريقة التي تناسبك
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {contactCards.map((card, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-card hover:shadow-2xl transition-all duration-300 h-full border-border/50">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3`}>
                        <card.icon className={`h-6 w-6 ${card.color}`} />
                      </div>
                      <CardTitle className="text-lg font-bold text-foreground">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {card.href ? (
                        <a
                          href={card.href}
                          target={card.href.startsWith('http') ? '_blank' : undefined}
                          rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 break-words"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground break-words">{card.value}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    أرسل لنا رسالة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground font-semibold">
                        الاسم الكامل *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الكامل"
                        required
                        className="bg-background text-foreground border-border"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground font-semibold">
                          رقم الهاتف *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+963 XXX XXX XXX"
                          required
                          className="bg-background text-foreground border-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-semibold">
                          البريد الإلكتروني
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@email.com"
                          className="bg-background text-foreground border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requestType" className="text-foreground font-semibold">
                        نوع الطلب *
                      </Label>
                      <Select value={formData.requestType} onValueChange={handleSelectChange} required>
                        <SelectTrigger className="bg-background text-foreground border-border">
                          <SelectValue placeholder="اختر نوع الطلب" />
                        </SelectTrigger>
                        <SelectContent>
                          {requestTypes.map((type, index) => (
                            <SelectItem key={index} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-semibold">
                        تفاصيل الرسالة *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="اكتب رسالتك هنا..."
                        rows={6}
                        required
                        className="bg-background text-foreground border-border resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold flex-1 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <MessageCircle className="ml-2 h-5 w-5" />
                        إرسال عبر واتساب
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;