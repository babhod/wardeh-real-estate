import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'عقارات للبيع', path: '/for-sale' },
    { name: 'عقارات للإيجار', path: '/for-rent' },
    { name: 'من نحن', path: '/about' },
    { name: 'المدونة', path: '/blog' },
    { name: 'تواصل معنا', path: '/contact' },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'الهاتف',
      value: '+963 942 582 707',
      href: 'tel:+963942582707',
    },
    {
      icon: MessageCircle,
      label: 'واتساب',
      value: '+1 551 758 9448',
      href: 'https://wa.me/15517589448',
    },
    {
      icon: Mail,
      label: 'البريد الإلكتروني',
      value: 'info@alwardare.com',
      href: 'mailto:info@alwardare.com',
    },
    {
      icon: MapPin,
      label: 'العنوان',
      value: 'برج التجارة، الطابق الثالث، مكتب 63، سرمدا / إدلب، سوريا',
      href: null,
    },
  ];

  return (
    <footer className="glass-section border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <span className="text-2xl font-bold text-primary">
              الوردة للوساطة العقارية
            </span>
            <p className="text-muted-foreground leading-relaxed">
              خدمات وساطة عقارية باحترافية ووضوح في مختلف أنحاء سوريا
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-foreground">
              روابط سريعة
            </span>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 lg:col-span-2">
            <span className="text-lg font-semibold text-foreground">
              معلومات التواصل
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} الوردة للوساطة العقارية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;