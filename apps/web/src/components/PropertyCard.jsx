import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { AspectRatio } from '@/components/ui/aspect-ratio.jsx';
import { cn } from '@/lib/utils.js';

const PropertyCard = ({ property }) => {
  return (
    <div
      className="group h-full flex flex-col"
    >
      {/* CARD CONTAINER */}
      <Card className="w-full h-full flex-1 flex flex-col overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-border/50 group-hover:border-primary/50 bg-white/80 backdrop-blur-sm p-0">
        
        {/* IMAGE SECTION */}
        <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-t-3xl relative">
          <img
            src={property.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&fit=crop'}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out group-hover:brightness-110"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&fit=crop';
            }}
          />
          <div className="absolute top-4 right-4 z-10">
            <Button variant="ghost" size="icon" className="rounded-full h-11 w-11 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-0 hover:scale-105 transition-all">
              <Heart className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-all duration-200" />
            </Button>
          </div>
        </AspectRatio>

        {/* CONTENT */}
        <CardHeader className="p-6 pb-4">
          
          {/* BADGES ROW */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary px-3 py-1 rounded-full">
              {property.type}
            </Badge>
            <Badge variant="outline" className="border-primary/50 text-primary/80 px-3 py-1 rounded-full">
              {property.city}
            </Badge>
            {property.status && (
              <Badge variant={property.status === 'جيد' ? 'default' : 'secondary'} className="px-3 py-1 rounded-full">
                {property.status}
              </Badge>
            )}
          </div>
          
          {/* PROPERTY TITLE */}
          <CardTitle className="text-xl font-bold text-foreground mb-0 group-hover:text-primary transition-colors">
            {property.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 p-6 pt-0 space-y-4">
          
          {/* PROPERTY FEATURES */}
          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground bg-muted/50 p-4 rounded-2xl">
            <div className="flex flex-col items-center gap-2 p-3 bg-card/60 rounded-xl hover:bg-card hover:shadow-md transition-all group-hover:scale-105">
              <Bed className="h-6 w-6 text-primary mx-auto" />
              <span className="font-bold text-foreground">{property.rooms}</span>
              <span className="text-xs opacity-75">غرف</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-card/60 rounded-xl hover:bg-card hover:shadow-md transition-all group-hover:scale-105">
              <Bath className="h-6 w-6 text-primary mx-auto" />
              <span className="font-bold text-foreground">{property.baths}</span>
              <span className="text-xs opacity-75">حمام</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-card/60 rounded-xl hover:bg-card hover:shadow-md transition-all group-hover:scale-105">
              <Maximize2 className="h-6 w-6 text-primary mx-auto" />
              <span className="font-bold text-foreground">{property.area}</span>
              <span className="text-xs opacity-75">م²</span>
            </div>
          </div>
          
          {/* LOCATION ROW */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/30 rounded-xl">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>
        </CardContent>

        {/* BOTTOM ROW - Price on top row, CTA button underneath */}
        <CardFooter className="p-6 pt-0 pb-6 border-t border-border/50 flex flex-col gap-3">
          {/* Price Row */}
          <div className="w-full">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
              {property.price}
            </div>
          </div>
          {/* CTA Button Row */}
          <div className="w-full">
            <Button asChild className="w-full font-semibold h-12 px-6 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300">
              <Link to={`/property/${property.id}`}>
                تفاصيل العقار
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyCard;

