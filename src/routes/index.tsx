import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Phone,
  MessageCircle,
  Users,
  Fuel,
  Shield,
  IndianRupee,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Star,
  ArrowUp,
  X,
  Instagram,
  Facebook,
  Car,
  Menu,
} from "lucide-react";
import logo from "@/assets/logo.png";
import phonepeQr from "@/assets/phonepe-qr.png";
import whatsappLogo from "@/assets/whatsapp-logo.svg";
import { CarImageGallery } from "@/components/CarImageGallery";
import { getCarCoverImage, getCarImages } from "@/data/carImages";

export const Route = createFileRoute("/")({
      head: () => ({
    meta: [
      { title: "AIM Car Travels — Premium Self-Drive Car Rentals" },
      {
        name: "description",
        content:
          "Self-drive car rentals across Vijayawada. Clean cars, flat pricing, 24/7 pickup. Book hatchbacks, sedans, SUVs and premium rides with AIM Car Travels.",
      },
      { property: "og:title", content: "AIM Car Travels — Premium Self-Drive Rentals" },
      {
        property: "og:description",
        content: "Premium self-drive car rentals across Vijayawada. Book in minutes.",
      },
    ],
  }),
  component: HomePage,
});

const WHATSAPP_NUMBER = "917658982869";
const PHONE_DISPLAY = "+91 76589 82869";
const EMAIL = "aimcartravels@gmail.com";
const ADDRESS = "Shop No.3, near Dr. Varun Cardiac Hospital, beside Trendset Mall, Sai Nagar, Kala Nagar, Acharya Ranga Nagar, Benz Circle, Vijayawada, Andhra Pradesh 520008";
const MAPS_URL = "https://www.google.com/maps/place/Self+Drive+Cars+in+Vijayawada+-+Aim+Car+Travels/@16.4999852,80.654886,17z/";
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const MAPS_EMBED_URL = "https://www.google.com/maps?q=Self+Drive+Cars+in+Vijayawada+-+Aim+Car+Travels&output=embed";

function DirectionsMap() {
  return (
    <iframe
      src={MAPS_EMBED_URL}
      title="Self Drive Cars in Vijayawada - Aim Car Travels"
      className="w-full h-[min(450px,55vw)] min-h-[280px] border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
const UPI_ID = "aimcartravels@upi";
const GOOGLE_REVIEWS_URL = "https://share.google/ZdyG5QYMChfkexRFV";

type Category =
  | "Hatchbacks"
  | "Sedans"
  | "Automatic"
  | "CNG"
  | "Compact SUVs"
  | "MUVs"
  | "Adventure"
  | "Premium"
  | "Luxury";

type CarItem = {
  name: string;
  category: Category;
  alsoCategories?: Category[];
  seats: number;
  transmission: string;
  fuelType: string;
  price12: number;
  price24: number;
  extraHour: number;
};

const CARS: CarItem[] = [
  { name: "Maruti Suzuki Swift", category: "Hatchbacks", seats: 5, transmission: "Manual", fuelType: "Petrol", price12: 1500, price24: 2500, extraHour: 200 },
  { name: "Maruti Suzuki Baleno", category: "Hatchbacks", seats: 5, transmission: "Manual", fuelType: "Petrol", price12: 1500, price24: 2500, extraHour: 200 },
  { name: "Hyundai i20", category: "Hatchbacks", seats: 5, transmission: "Manual", fuelType: "Petrol", price12: 1500, price24: 2500, extraHour: 200 },
  { name: "Maruti Suzuki Swift Dzire", category: "CNG", seats: 5, transmission: "Manual", fuelType: "CNG", price12: 1500, price24: 2500, extraHour: 200 },
  { name: "Maruti Suzuki Dzire Automatic", category: "Automatic", seats: 5, transmission: "Automatic", fuelType: "Petrol", price12: 2000, price24: 3000, extraHour: 200 },
  { name: "Hyundai Venue", category: "Compact SUVs", seats: 5, transmission: "Manual", fuelType: "Petrol", price12: 2000, price24: 3000, extraHour: 200 },
  { name: "Kia Syros", category: "Compact SUVs", seats: 5, transmission: "Manual", fuelType: "Petrol", price12: 2000, price24: 3000, extraHour: 200 },
  { name: "Kia Sonet", category: "Compact SUVs", seats: 5, transmission: "Automatic & Sunroof", fuelType: "Diesel", price12: 2000, price24: 3000, extraHour: 250 },
  { name: "Maruti Suzuki Brezza", category: "Compact SUVs", seats: 5, transmission: "Manual", fuelType: "Petrol", price12: 2000, price24: 3000, extraHour: 200 },
  { name: "Maruti Suzuki Ertiga", category: "CNG", seats: 7, transmission: "Manual", fuelType: "CNG", price12: 2500, price24: 3500, extraHour: 200 },
  { name: "Toyota Innova", category: "MUVs", seats: 7, transmission: "Manual", fuelType: "Diesel", price12: 2500, price24: 3500, extraHour: 200 },
  { name: "Mahindra Thar", category: "Adventure", seats: 4, transmission: "Manual 4x2", fuelType: "Diesel", price12: 3500, price24: 4500, extraHour: 200 },
  { name: "Toyota Innova Crysta", category: "Premium", seats: 7, transmission: "Manual", fuelType: "Diesel", price12: 3500, price24: 4500, extraHour: 200 },
  {
    name: "Mahindra XUV 7XO - Hitech Luxury",
    category: "Premium",
    alsoCategories: ["Luxury"],
    seats: 7,
    transmission: "Manual",
    fuelType: "Diesel",
    price12: 3499,
    price24: 5000,
    extraHour: 500,
  },
];

const FILTERS = ["All", "Hatchbacks", "Sedans", "Automatic", "CNG", "Compact SUVs", "MUVs", "Adventure", "Premium", "Luxury"] as const;

function carMatchesFilter(car: CarItem, filter: (typeof FILTERS)[number]) {
  return car.category === filter || car.alsoCategories?.includes(filter as Category);
}

// Highlight tags for cars (matches substrings of `car.name`)
const carHighlights: Record<string, string> = {
  Swift: "Easy City Driver",
  Dzire: "Maximum Mileage",
  Baleno: "Premium Hatchback",
  "i20": "Stylish & Smooth",
  Syros: "Top Safety Rating",
  Sonet: "Luxury & Ease",
  Venue: "Smart Urban SUV",
  Brezza: "Reliable Family SUV",
  Ertiga: "Budget Family Tripper",
  Innova: "Proven Comfort",
  Crysta: "VIP Travel Executive",
  Thar: "Adventure & Style",
  // optional entries if present
  "XUV 7XO": "Futuristic Luxury SUV",
  "Scorpio N": "The Big Daddy SUV",
};

function getCarHighlight(name: string) {
  for (const key of Object.keys(carHighlights)) {
    if (name.includes(key)) return carHighlights[key];
  }
  return null;
}

function HomePage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [bookingCar, setBookingCar] = useState<CarItem | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return CARS;
    if (filter === "Automatic") {
      return CARS.filter(
        (c) =>
          c.category === "Automatic" ||
          c.transmission.toLowerCase().includes("automatic"),
      );
    }
    return CARS.filter((c) => carMatchesFilter(c, filter));
  }, [filter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-border/60 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.08)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 sm:gap-3 lg:gap-4 group shrink-0">
            <div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-2xl bg-white shadow-premium overflow-hidden ring-1 ring-border shrink-0">
              <img src={logo} alt="AIM Car Travels" className="h-full w-full object-contain scale-[1.55] sm:scale-[1.6] lg:scale-[1.65]" />
            </div>
            <div className="leading-none min-w-0 flex flex-col items-start">
              <div className="w-full text-left font-bold text-navy text-base sm:text-xl lg:text-2xl tracking-tight whitespace-nowrap">AIM Car Travels</div>
              <div className="w-full text-left text-[10px] sm:text-xs lg:text-sm font-semibold tracking-[0.22em] text-amber-500 whitespace-nowrap">
                PREMIUM SELF DRIVE CARS
              </div>
              <div className="w-full text-center text-[10px] sm:text-xs lg:text-sm font-semibold tracking-[0.22em] text-amber-500 whitespace-nowrap">
                &
              </div>
              <div className="w-full text-left text-[10px] sm:text-xs lg:text-sm font-semibold tracking-[0.22em] text-amber-500 whitespace-nowrap">
                TAXI SERVICES
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-9 text-sm font-medium text-foreground/80">
            <a href="#cars" className="hover:text-gold transition-colors">Cars</a>
            <a href="#why" className="hover:text-gold transition-colors">Why Us</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
            <a href="#policies" className="hover:text-gold transition-colors">Policies</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-white text-sm font-medium hover:shadow-premium hover:-translate-y-0.5 transition-all"
            >
              <Phone className="h-4 w-4 text-gold" />
              <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-gold-foreground text-sm font-semibold shadow-gold hover:-translate-y-0.5 hover:brightness-105 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="px-6 py-4 flex flex-col gap-3 text-sm font-medium">
              {["cars", "why", "about", "contact", "policies"].map((id) => (
                <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} className="py-2 capitalize">
                  {id === "why" ? "Why Us" : id === "policies" ? "Policies" : id}
                </a>
              ))}
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="py-2 text-gold">{PHONE_DISPLAY}</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-gold-soft blur-3xl opacity-60" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent blur-3xl opacity-50" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-10 md:pt-8 md:pb-12">
          <div className="grid place-items-center">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 text-center mx-auto">
              <h1 className="font-bold tracking-tight text-navy leading-[1.02]">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-black mb-2 sm:mb-3 lg:mb-4">
                  Welcome to
                </span>
                <span className="group block text-5xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-amber-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.18)] transition-transform duration-300 hover:-translate-y-1">
                  <span className="inline-flex flex-col items-center transition-all duration-300 group-hover:drop-shadow-[0_12px_30px_-12px_rgba(245,158,11,0.45)]">
                    <span className="leading-none tracking-tight">
                      AIM
                    </span>
                    <span className="mt-1 text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tight">
                      Car Travels
                    </span>
                  </span>
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Premium self drive cars and taxi services available from Vijayawada city starting @ ₹1500
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="#cars"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-gold-foreground font-semibold shadow-gold hover:-translate-y-1 transition-all"
                >
                  Browse cars
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white border border-border font-semibold hover:shadow-premium hover:-translate-y-1 transition-all"
                >
                  <MessageCircle className="h-5 w-5 text-gold" />
                  Talk on WhatsApp
                </a>
              </div>
              <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> 24/7 pickup</div>
                <div className="flex items-center gap-2"><Star className="h-4 w-4 text-gold fill-gold" /> 4.9 rated</div>
              </div>
            </div>

            {/* Right-side hero block removed per request */}
          </div>

          {/* Removed duplicate welcome heading (now in hero) */}
        </div>
      </section>

      <section className="relative overflow-hidden py-10 sm:py-12 bg-gradient-to-b from-white to-gold-soft/30">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-gold-soft blur-3xl opacity-60" />
          <div className="absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-accent blur-3xl opacity-40" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center mb-8 sm:mb-10">
            <h2 className="font-serif font-bold tracking-tight leading-[0.92] text-3xl sm:text-4xl lg:text-6xl text-navy">
              <span className="block">Drive Your Own Story</span>
              <span className="block mt-3">
                in <span className="text-amber-500">Vijayawada</span>
              </span>
            </h2>
            <p className="mx-auto mt-8 text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl">
              Premium self-drive car rentals with 100% transparent pricing. Lock down your favorite drive from our elite 14-car collection with a 20% secure advance. No hidden surprises.
            </p>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <div className="text-sm sm:text-base font-extrabold tracking-[0.22em] text-navy mb-3">FAST BOOKING VERIFICATION</div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-[28px] border border-[#f3df8c] bg-white/90 shadow-premium p-6 md:p-7 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-[#fff6d8] grid place-items-center text-xl font-bold text-[#c28f00]">1</div>
                <div>
                  <div className="text-xs font-bold tracking-[0.18em] text-gold">STEP 1</div>
                  <h3 className="text-xl font-bold text-navy">Elite eligibility checklist</h3>
                </div>
              </div>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed text-left">
                <p>• Min age <strong className="font-bold text-black">25+</strong></p>
                <p>• <strong className="font-bold text-black">3+ years</strong> of active LMV licence</p>
                <p>• <strong className="font-bold text-black">Aadhar card</strong></p>
                <p>• Two wheeler ( under 5yrs old ) with RC / min <strong className="font-bold text-black">20,000 security deposit</strong></p>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#f3df8c] bg-white/90 shadow-premium p-6 md:p-7 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-[#fff6d8] grid place-items-center text-xl font-bold text-[#c28f00]">2</div>
                <div>
                  <div className="text-xs font-bold tracking-[0.18em] text-gold">STEP 2</div>
                  <h3 className="text-xl font-bold text-navy">Reserve your ride in the website theme</h3>
                </div>
              </div>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed text-left">
                <p>• Choose from our <strong className="font-bold text-black">14-car collection</strong></p>
                <p>• Pay <strong className="font-bold text-black">20% secure advance</strong> to lock the booking</p>
                <p>• Enjoy transparent pricing with no hidden surprises</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#f3df8c] bg-white/90 shadow-premium p-6 md:p-7 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-[#fff6d8] grid place-items-center text-xl font-bold text-[#c28f00]">3</div>
                <div>
                  <div className="text-xs font-bold tracking-[0.18em] text-gold">STEP 3</div>
                  <h3 className="text-xl font-bold text-navy">Secure delivery handover</h3>
                </div>
              </div>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed text-left">
                <p>• Pay remaining <strong className="font-bold text-black">80% rent at the time of car pickup</strong></p>
                <p>• <strong className="font-bold text-black">Insurance claims are not applicable on any damages / accidental conditions</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* CARS */}
      <section id="cars" className="py-12 lg:py-16 bg-gradient-to-b from-white to-gold-soft/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-gold mb-3">{CARS.length} CARS AVAILABLE</div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-navy">Choose your ride</h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                    active
                      ? "bg-gold text-gold-foreground border-gold shadow-gold"
                      : "bg-white border-border hover:border-gold hover:text-gold"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((car) => {
              const coverImage = getCarCoverImage(car.name);
              const highlight = getCarHighlight(car.name);
              return (
              <article
                key={car.name}
                className="group bg-white rounded-3xl overflow-hidden border border-border shadow-premium hover:shadow-premium-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[5/3] bg-gradient-to-br from-muted via-gold-soft/40 to-accent overflow-hidden">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={car.name}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-navy/15 group-hover:scale-110 transition-transform duration-500">
                      <Car className="h-28 w-28" strokeWidth={1} />
                    </div>
                  )}
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-navy text-white text-[10px] font-bold tracking-wider">
                    {[car.category, ...(car.alsoCategories ?? [])].join(" · ").toUpperCase()}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <h3 className="text-xl font-bold text-navy">{car.name}</h3>
                  {highlight && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-[#fff7da] px-4 py-2 text-xs md:text-sm font-semibold text-[#8a6a00] border border-[#f3df8c] shadow-sm">
                        ✨ {highlight}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-2.5 py-1 text-xs font-semibold text-navy">
                      <Users className="h-3.5 w-3.5 text-gold" />
                      {car.seats} Seats
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-2.5 py-1 text-xs font-semibold text-navy">
                      {car.transmission}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-2.5 py-1 text-xs font-semibold text-navy">
                      <Fuel className="h-3.5 w-3.5 text-gold" />
                      {car.fuelType}
                    </span>
                  </div>
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-border">
                      <div className="flex-1 pr-4">
                        <div className="text-base font-bold text-navy leading-tight"><span className="whitespace-nowrap">12hrs - ₹{car.price12.toLocaleString()} / 200 km</span></div>
                        <div className="text-sm font-bold text-black mt-1 leading-tight"><span className="whitespace-nowrap">24hrs - ₹{car.price24.toLocaleString()} / 400 km</span></div>
                      </div>
                      <button
                        onClick={() => setBookingCar(car)}
                        className="ml-2 h-12 px-5 py-2.5 rounded-full bg-gold text-gold-foreground text-sm font-semibold shadow-gold hover:-translate-y-0.5 hover:brightness-105 transition-all flex items-center justify-center"
                      >
                        Book Now
                      </button>
                    </div>
                </div>
              </article>
            );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-sm sm:text-base font-bold tracking-[0.2em] text-gold">WHY CHOOSE US</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Verified & Serviced", desc: "Every car is fully serviced and sanitized." },
              { icon: IndianRupee, title: "Transparent Pricing", desc: "Flat per-day rates. No hidden fees, no surprises at drop-off." },
              { icon: Clock, title: "24/7 Availability", desc: "Book any time. Pickup and drop available around the clock." },
              { icon: Headphones, title: "Real Human Support", desc: "Talk to us directly on WhatsApp — no bots, no waiting." },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-7 border border-border shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-gold-soft grid place-items-center mb-5">
                  <f.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 lg:py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "2600", label: "Completed Orders" },
              { value: "2500", label: "Happy Customers" },
              { value: "14", label: "Vehicles" },
              { value: "10", label: "Years Experience" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl bg-white px-6 py-10 text-center shadow-premium border border-yellow-100 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-premium-lg hover:border-yellow-200"
              >
                <div className="text-5xl sm:text-6xl font-extrabold text-gold leading-none">{stat.value}</div>
                <div className="mt-4 text-lg text-slate-600 transition-colors duration-300 group-hover:text-navy">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 lg:py-28 bg-gradient-to-b from-gold-soft/30 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto text-center max-w-2xl">
            <div className="text-xl sm:text-2xl font-extrabold tracking-[0.18em] text-gold mb-3">ABOUT US</div>
            <p className="text-muted-foreground text-lg sm:text-2xl leading-relaxed mb-8 font-semibold">
              Experience travel with comfort, flexibility, and confidence. We offer premium self-drive cars and travel services designed for modern travelers who expect clean vehicles, professional service, and transparent pricing. Whether it’s a quick city ride, family trip, or long-distance journey, we make every drive smooth, safe, and stress-free.
            </p>
            <div className="grid grid-cols-2 gap-4 justify-center">
              {[
                { n: "4.9★", l: "Avg Rating" },
                { n: "24/7", l: "Support" },
              ].map((s) => (
                <div key={s.l} className="bg-white rounded-2xl p-5 text-center border border-border shadow-premium">
                  <div className="text-2xl sm:text-3xl font-bold text-gold">{s.n}</div>
                  <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-muted-foreground mt-1">{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold tracking-[0.2em] text-gold mb-3">REVIEWS</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-navy">What travelers say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "MUNNA SAYYAD", initials: "MS", text: "Fast Receiving. Trusted travels in vijayawada. I've taken MAHINDRA THAR for self drive for marriage purposes. Nani sir was given the best price in the market and the car condition was too good. I definitely recommend this travels, whoever is looking for a self drive in vijayawada.", date: "8 months ago" },
              { name: "subbaraja varma", initials: "SV", text: "Good service, transparency in pricing, good condition cars\n\nHave taken syros for 2 days to travel to vishakapatnam , vehicle in brand new condition", date: "a year ago" },
              { name: "Surya Enterprises", initials: "SE", text: "I have taken car for 24 hrs .. very good experience, very good condition vehicle I have got, when I travel with family we should get safe and condition vehicle. M fully satisfied with rental car.", date: "7 months ago" },
            ].map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-7 border border-border shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gold text-gold-foreground grid place-items-center font-bold">{r.initials}</div>
                  <div>
                    <div className="font-bold text-navy">{r.name}</div>
                    <div className="flex gap-0.5 text-gold">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold" />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
                <div className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">{r.date}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-gold-foreground font-semibold shadow-gold hover:-translate-y-0.5 transition-all"
            >
              View More Reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 lg:py-28 bg-gradient-to-b from-white to-gold-soft/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold tracking-[0.2em] text-gold mb-3">GET IN TOUCH</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-navy">Contact us</h2>
            <p className="text-muted-foreground mt-4">Have questions? Reach out and we'll get back to you right away.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, label: "CALL US", value: PHONE_DISPLAY, href: `tel:${PHONE_DISPLAY.replace(/\s/g, "")}` },
              { icon: MessageCircle, label: "WHATSAPP", value: PHONE_DISPLAY, href: `https://wa.me/${WHATSAPP_NUMBER}` },
              { icon: Mail, label: "EMAIL", value: EMAIL, href: `mailto:${EMAIL}` },
              { icon: MapPin, label: "ADDRESS", value: ADDRESS, href: MAPS_URL },
            ].map((c) => {
              const inner = (
                <>
                  <div className="h-12 w-12 rounded-xl bg-gold-soft grid place-items-center mb-5 mx-auto">
                    <c.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div className="text-xs font-bold tracking-[0.18em] text-muted-foreground mb-2">{c.label}</div>
                  <div className="font-semibold text-navy text-sm leading-relaxed">{c.value}</div>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="bg-white rounded-2xl p-7 text-center border border-border shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="bg-white rounded-2xl p-7 text-center border border-border shadow-premium">
                  {inner}
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <p className="text-center text-sm text-muted-foreground mb-3">
              Driving route to our office — allow location for directions from where you are.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border shadow-premium bg-white">
              <DirectionsMap />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          {/* footer columns moved below policies (see after policies block) */}

          {/* Policies & Guidelines (replaced with new layout) */}
          <section id="policies" className="w-full bg-[#f8f6ee] py-20 px-5 md:px-10">
            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-16">
                <p className="text-[#d4af37] uppercase tracking-[0.3em] text-sm font-semibold mb-4">RENTAL TERMS</p>

                <h2 className="text-3xl md:text-5xl font-bold text-[#111] mb-5">Policies & Guidelines</h2>

                <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">Transparent rental policies designed to ensure a safe, secure, and hassle-free self-drive experience with AIM Car Travels.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="bg-white rounded-[28px] border border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-[#fff6d8] flex items-center justify-center text-2xl">🛡️</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#111]">Customer Eligibility & Verification</h3>
                      <p className="text-gray-500 text-sm mt-1">Driver eligibility & mandatory verification requirements</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>• Minimum age required: <strong>25 years</strong></p>
                    <p>• Valid permanent LMV driving license older than <strong>3 years</strong> is mandatory.</p>
                    <div>
                      <p className="font-semibold text-[#111] mb-2">Mandatory Documents:</p>
                      <div className="space-y-2 ml-2">
                        <p>○ Aadhaar Card</p>
                        <p>○ Car Driving License</p>
                        <p>○ Two wheeler with rc / ₹ 20000 as security deposit</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-[#fff6d8] flex items-center justify-center text-2xl">💳</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#111]">Payment & Security Deposit Policy</h3>
                      <p className="text-gray-500 text-sm mt-1">Advance booking, rental payment & security deposit rules</p>
                    </div>
                  </div>

                  <div className="space-y-5 text-gray-700 leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-[#111] mb-2">Booking Confirmation & Advance</h4>
                      <p>• Minimum <strong>20%</strong> advance payment required to reserve any vehicle.</p>
                      <p>• Advance amount is strictly <strong>100% non-refundable</strong>.</p>
                      <p>• Vehicle gets locked exclusively for your dates after payment.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#111] mb-2">Full Rental Payment</h4>
                      <p>• Remaining rental balance must be cleared before vehicle handover.</p>
                      <p>• Vehicle will not be released for partial payments.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#111] mb-2">Refundable Security Deposit</h4>
                      <p>• Security deposit starts from <strong>₹20,000</strong>.</p>
                      <p>• Deposit may vary depending on vehicle model and rental duration.</p>
                      <p>• Deposit is processed separately from rental payment.</p>
                      <p>• Refund initiated immediately after successful inspection during drop-off.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-[#fff0e2] flex items-center justify-center text-2xl">⚠️</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#111]">Vehicle Damage & Client Liability</h3>
                      <p className="text-gray-500 text-sm mt-1">Damage responsibility & zero-insurance policy</p>
                    </div>
                  </div>

                  <div className="space-y-5 text-gray-700 leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-[#111] mb-2">Vehicle Handover Rule</h4>
                      <p>• Vehicle is delivered in clean, scratch-free condition.</p>
                      <p>• Customer must record complete photos/videos during pickup.</p>
                      <p>• Vehicle must be returned in same “As-Is” condition.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#111] mb-2">Zero Insurance Policy</h4>
                      <p>• Insurance claims are not applicable on self-drive rentals.</p>
                      <p>• No insurance cover for vehicle, customer or third parties.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#111] mb-2">Financial Responsibility</h4>
                      <p>• Customer is liable for 100% scratches, dents & body damages.</p>
                      <p>• Major repair costs must be fully paid by customer.</p>
                      <p>• Damages are deducted from security deposit instantly.</p>
                      <p>• Any repair amount exceeding deposit must be cleared immediately.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-[#fff6d8] flex items-center justify-center text-2xl">⚖️</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#111]">Primary Renter Responsibility</h3>
                      <p className="text-gray-500 text-sm mt-1">Legal & financial accountability during rental period</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>• The registered customer remains fully responsible throughout rental tenure.</p>
                    <p>• Liability cannot be transferred even if another person drives the vehicle.</p>
                    <p>• Customer is responsible for all traffic fines, red-light violations & challans.</p>
                    <p>• Rash driving, overspeeding & reckless handling damages will be recovered fully.</p>
                    <p>• DUI, illegal racing or criminal activity leads to immediate deposit forfeiture.</p>
                    <p>• Excuses such as “my friend was driving” will not be entertained.</p>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <div className="bg-white rounded-[24px] border border-gray-200 shadow-md p-6 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="text-4xl mb-4">⛽</div>
                  <h3 className="text-xl font-bold text-[#111] mb-4">Fuel Policy</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>• Vehicle must be returned with same fuel level.</p>
                    <p>• Extra fuel is non-refundable.</p>
                    <p>• Fuel shortage amount + ₹500 service fee deducted from deposit.</p>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] border border-gray-200 shadow-md p-6 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="text-4xl mb-4">🛞</div>
                  <h3 className="text-xl font-bold text-[#111] mb-4">Tyre & Underbody Damage</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>• Tyre cuts, bursts & rim bends are customer liability.</p>
                    <p>• Underbody damages due to careless driving will be fully charged.</p>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] border border-gray-200 shadow-md p-6 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="text-4xl mb-4">⏰</div>
                  <h3 className="text-xl font-bold text-[#111] mb-4">Extensions & Late Return</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>• Extension requests must be made 12 hours before drop-off.</p>
                    <p>• Unauthorized late returns attract ₹1,000 per hour penalty.</p>
                  </div>
                </div>

              </div>

              <div className="mt-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111] mb-4">Penalty & Fine Charges</h2>
                  <p className="text-gray-600">Please follow all rental guidelines to avoid penalties.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🏎️</div>
                    <h4 className="text-xl font-semibold mb-3">Over-Speeding</h4>
                    <p className="text-gray-600">₹1,000 per alert tracked via live GPS.</p>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🚬</div>
                    <h4 className="text-xl font-semibold mb-3">Smoking Inside Vehicle</h4>
                    <p className="text-gray-600">₹1,500 + professional deep cleaning fee.</p>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🐾</div>
                    <h4 className="text-xl font-semibold mb-3">Extreme Dirt / Pet Hair</h4>
                    <p className="text-gray-600">₹1,000 deep wash fee.</p>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🚦</div>
                    <h4 className="text-xl font-semibold mb-3">Traffic Challans</h4>
                    <p className="text-gray-600">Government fine + ₹200 handling fee.</p>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🔋</div>
                    <h4 className="text-xl font-semibold mb-3">Battery Discharge</h4>
                    <p className="text-gray-600">₹2,000 service fee for negligence.</p>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🔑</div>
                    <h4 className="text-xl font-semibold mb-3">Lost Smart Key</h4>
                    <p className="text-gray-600">Replacement + towing + idle rental charges.</p>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🏖️</div>
                    <h4 className="text-xl font-semibold mb-3">Off-Road / Beach Driving</h4>
                    <p className="text-gray-600">₹5,000 flat penalty.</p>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🚚</div>
                    <h4 className="text-xl font-semibold mb-3">Vehicle Abandonment</h4>
                    <p className="text-gray-600">₹10,000 recovery fine + towing charges.</p>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-md hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">🛣️</div>
                    <h4 className="text-xl font-semibold mb-3">FASTag Tampering</h4>
                    <p className="text-gray-600">₹2,000 replacement penalty.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                <div className="bg-white rounded-[28px] border border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#fff6d8] flex items-center justify-center text-2xl">🌍</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#111]">Inter-State Travel</h3>
                      <p className="text-gray-500 text-sm">State permits & toll policies</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>• All India Tourist Permits are active on our vehicles.</p>
                    <p>• Border entry taxes & permit fees must be paid by customer.</p>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#fff6d8] flex items-center justify-center text-2xl">🛣️</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#111]">FASTag Policy</h3>
                      <p className="text-gray-500 text-sm">Toll tracking & deductions</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>• Toll charges will be deducted transparently from security deposit.</p>
                    <p>• Customers may recharge FASTag using PhonePe/GPay if required.</p>
                    <p>• FASTag sticker tampering attracts ₹2,000 penalty.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white rounded-[28px] border border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="text-4xl mb-4">🚓</div>
                  <h3 className="text-2xl font-bold text-[#111] mb-5">Vehicle Abandonment & Seizure</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>• Unauthorized vehicle abandonment attracts ₹10,000 recovery fine.</p>
                    <p>• Towing expenses & accumulated rent must be cleared by customer.</p>
                    <p>• Police seizure due to negligence remains customer responsibility.</p>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all">
                  <div className="text-4xl mb-4">⚖️</div>
                  <h3 className="text-2xl font-bold text-[#111] mb-5">Legal Jurisdiction</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>Any legal disputes, police matters or mediation arising from the rental agreement shall fall exclusively under Vijayawada jurisdiction, Andhra Pradesh.</p>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <div className="bg-white rounded-[32px] border border-gray-200 shadow-lg p-8 md:p-12 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#111] mb-5">Customer Agreement</h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">By proceeding with the booking, the customer confirms that they have read, understood, and agreed to all rental terms, liabilities, penalties, vehicle usage policies, and legal clauses mentioned above.</p>
                </div>
              </div>

            </div>
          </section>

          <div className="mt-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-white shadow-premium grid place-items-center overflow-hidden ring-1 ring-border">
                      <img src={logo} alt="AIM Car Travels" className="h-8 w-8 object-contain" />
                    </div>
                    <div>
                      <div className="font-bold text-navy">AIM Car Travels</div>
                      <div className="text-[10px] font-semibold tracking-[0.18em] text-amber-500">PREMIUM SELF DRIVE CARS & TAXI SERVICES</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Premium self drive cars and taxi services across Vijayawada. Clean cars, honest pricing.</p>
                </div>
                <div>
                  <div className="font-bold text-navy mb-4 text-sm">Quick links</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      { l: "Cars", h: "#cars" },
                      { l: "Why Us", h: "#why" },
                      { l: "About", h: "#about" },
                      { l: "Contact", h: "#contact" },
                    ].map((x) => (
                      <li key={x.l}><a href={x.h} className="hover:text-gold transition-colors">{x.l}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-navy mb-4 text-sm">Contact</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="hover:text-gold transition-colors">{PHONE_DISPLAY}</a></li>
                    <li><a href={`mailto:${EMAIL}`} className="hover:text-gold transition-colors">{EMAIL}</a></li>
                    <li><a href={MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">{ADDRESS}</a></li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-navy mb-4 text-sm">Follow us</div>
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com/self_drive_cars_in_vijayawada?igsh=bWpjcWg2cXB1ZW02" target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full bg-gold-soft text-gold grid place-items-center hover:bg-gold hover:text-gold-foreground transition-all">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://www.facebook.com/share/1GnzVHdjG7/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full bg-gold-soft text-gold grid place-items-center hover:bg-gold hover:text-gold-foreground transition-all">
                      <Facebook className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} AIM Car Travels. All rights reserved.
            <p className="text-xs text-gray-400 mt-2">
              Website by{" "}
              <a
                href="https://uniscaledigitals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-[#0B1B4D] transition-colors duration-300"
              >
                Uniscale Digital
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              <a
                href="mailto:uniscaledigital@gmail.com"
                className="hover:text-[#0B1B4D] transition-colors duration-300"
              >
                uniscaledigital@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTIONS (vertical column) */}
      <div className="fixed right-6 bottom-6 z-60 flex flex-col items-center gap-4">
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Top"
            className="h-14 w-14 rounded-full bg-navy text-white grid place-items-center shadow-premium-lg hover:-translate-y-1 transition-all z-70"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Location"
          className="h-14 w-14 rounded-full bg-gold text-white grid place-items-center shadow-premium-lg hover:scale-105 transition-all"
        >
          <MapPin className="h-6 w-6 text-white" />
        </a>

        <a
          href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
          aria-label="Call"
          className="h-14 w-14 rounded-full bg-blue-600 text-white grid place-items-center shadow-premium-lg hover:scale-110 transition-all"
        >
          <Phone className="h-6 w-6 text-white" />
        </a>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="h-14 w-14 rounded-full bg-whatsapp text-white grid place-items-center shadow-premium-lg hover:scale-110 transition-all"
        >
          <img src={whatsappLogo} alt="WhatsApp" className="h-9 w-9 object-contain" />
        </a>
      </div>

      {/* BOOKING MODAL */}
      {bookingCar && <BookingModal car={bookingCar} onClose={() => setBookingCar(null)} />}
    </div>
  );
}

const MIN_RENTAL_HOURS = 12;

function formatBookingDate(iso: string) {
  if (!iso) return iso;
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatBookingTime(time: string) {
  if (!time) return time;
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
}

function snapMinute15(m: number) {
  const snapped = Math.round(m / 15) * 15;
  return String(snapped % 60).padStart(2, "0");
}

function parseTime24(value: string) {
  if (!value) return null;
  const [h, m] = value.split(":").map(Number);
  const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return {
    hour12: String(hour12),
    minute: snapMinute15(m),
    period,
  };
}

function toTime24(hour12: string, minute: string, period: "AM" | "PM") {
  let h = parseInt(hour12, 10);
  if (period === "AM") {
    if (h === 12) h = 0;
  } else if (h !== 12) {
    h += 12;
  }
  return `${String(h).padStart(2, "0")}:${minute}`;
}

const HOURS_12 = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = ["00", "15", "30", "45"];
const timeSelectCls =
  "h-10 min-h-10 px-1.5 rounded-md bg-muted/50 text-xs font-semibold leading-10 text-navy focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer appearance-none";

function TimePicker12h({
  value,
  onChange,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const parsed = parseTime24(value);
  const hour12 = parsed?.hour12 ?? "";
  const minute = parsed?.minute ?? "";
  const period = parsed?.period ?? "AM";

  const emit = (h: string, m: string, p: "AM" | "PM") => {
    if (h && m) onChange(toTime24(h, m, p));
    else onChange("");
  };

  return (
    <div className="inline-flex w-fit max-w-full items-center gap-1 overflow-visible rounded-lg border border-border bg-white px-1.5 py-1 focus-within:ring-1 focus-within:ring-gold">
      <input type="hidden" required={required} value={value} readOnly tabIndex={-1} aria-hidden />
      <select
        aria-label="Hour"
        value={hour12}
        onChange={(e) => emit(e.target.value, minute || "00", period)}
        className={`${timeSelectCls} w-[2.5rem]`}
      >
        <option value="">—</option>
        {HOURS_12.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span className="text-[10px] text-muted-foreground">:</span>
      <select
        aria-label="Minute"
        value={minute}
        onChange={(e) => emit(hour12, e.target.value, period)}
        className={`${timeSelectCls} w-[2.5rem]`}
      >
        <option value="">—</option>
        {MINUTES.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        aria-label="AM or PM"
        value={period}
        onChange={(e) => emit(hour12, minute || "00", e.target.value as "AM" | "PM")}
        className={`${timeSelectCls} w-[3.75rem] shrink-0 text-center text-sm`}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}

function parseBookingDateTime(date: string, time: string): Date | null {
  if (!date || !time) return null;
  const dt = new Date(`${date}T${time}`);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function addHoursToTime(time: string, hours: number) {
  const [h, m] = time.split(":").map(Number);
  const dt = new Date(`1970-01-01T${time}`);
  dt.setHours(h + hours, m, 0, 0);
  return `${String(dt.getHours()).padStart(2, "0")}:${snapMinute15(dt.getMinutes())}`;
}

function isMinRentalMet(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
) {
  const pickup = parseBookingDateTime(pickupDate, pickupTime);
  const ret = parseBookingDateTime(returnDate, returnTime);
  if (!pickup || !ret) return false;
  return ret.getTime() - pickup.getTime() >= MIN_RENTAL_HOURS * 60 * 60 * 1000;
}

function BookingModal({ car, onClose }: { car: CarItem; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
  });
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const extraRate = (() => {
    if (
      car.category === "Premium" ||
      car.category === "Luxury" ||
      car.category === "Adventure" ||
      car.alsoCategories?.includes("Premium") ||
      car.alsoCategories?.includes("Luxury")
    )
      return 500;
    if (car.category === "Compact SUVs" || car.category === "MUVs") return 250;
    return car.extraHour;
  })();

  const applyMinReturnTime = (next: typeof form) => {
    if (!next.pickupTime) return next;
    return { ...next, returnTime: addHoursToTime(next.pickupTime, MIN_RENTAL_HOURS) };
  };

  const updatePickup = (patch: Partial<typeof form>) => {
    setTimeError("");
    setForm((prev) => {
      const next = { ...prev, ...patch };
      if ("pickupTime" in patch && next.pickupTime) {
        return applyMinReturnTime(next);
      }
      return next;
    });
  };

  const updateReturnDate = (returnDate: string) => {
    setTimeError("");
    setForm((prev) => ({ ...prev, returnDate }));
  };

  const updateReturnTime = (returnTime: string) => {
    setTimeError("");
    setForm((prev) => ({ ...prev, returnTime }));
  };

  const buildWhatsAppMessage = () =>
    [
      "Hi AIM Car Travels! I'd like to book:",
      "",
      `Car: ${car.name}`,
      `Transmission: ${car.transmission}`,
      `Seats: ${car.seats}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      "",
      `Pickup Date: ${formatBookingDate(form.pickup)}`,
      `Pickup Time: ${formatBookingTime(form.pickupTime)}`,
      `Return Date: ${formatBookingDate(form.returnDate)}`,
      `Return Time: ${formatBookingTime(form.returnTime)}`,
      "",
      "Pricing:",
      `12hrs — ₹${car.price12.toLocaleString("en-IN")}`,
      `24hrs — ₹${car.price24.toLocaleString("en-IN")}`,
      `Extra hour — ₹${extraRate}/hr`,
    ].join("\n");

  const sendWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMinRentalMet(form.pickup, form.pickupTime, form.returnDate, form.returnTime)) {
      setTimeError(`Return must be at least ${MIN_RENTAL_HOURS} hours after pickup.`);
      return;
    }
    sendWhatsApp();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-premium-lg border border-border animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 h-9 w-9 rounded-full hover:bg-muted grid place-items-center z-10">
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="p-7 sm:p-9 lg:border-r border-border">
            <CarImageGallery key={car.name} carName={car.name} images={getCarImages(car.name)} />
          </div>

          <div className="p-7 sm:p-9">
          <h3 className="text-2xl font-bold text-navy">Book {car.name}</h3>
          <p className="text-sm text-muted-foreground mt-2">Fill in your trip details and pay ₹1,000 advance via UPI to confirm.</p>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Customer Name">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className={inputCls} />
              </Field>
              <Field label="Phone Number">
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91" className={inputCls} />
              </Field>
              <Field label="Pickup Date">
                <input
                  required
                  type="date"
                  value={form.pickup}
                  onChange={(e) => updatePickup({ pickup: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Return Date">
                <input
                  required
                  type="date"
                  value={form.returnDate}
                  min={form.pickup || undefined}
                  onChange={(e) => updateReturnDate(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <div className="col-span-2 flex flex-wrap items-end gap-x-4 gap-y-2">
                <Field label="Pickup Time">
                  <TimePicker12h
                    required
                    value={form.pickupTime}
                    onChange={(pickupTime) => updatePickup({ pickupTime })}
                  />
                </Field>
                <Field label="Return Time">
                  <TimePicker12h
                    required
                    value={form.returnTime}
                    onChange={updateReturnTime}
                  />
                </Field>
              </div>
              <p className="col-span-2 -mt-2 text-[10px] text-muted-foreground leading-snug">
                Note: Return time defaults to {MIN_RENTAL_HOURS} hours after pickup. Minimum rental is {MIN_RENTAL_HOURS} hours — you may adjust return time if needed.
              </p>
            </div>
            {timeError && (
              <p className="text-sm text-red-600 font-medium -mt-2">{timeError}</p>
            )}

            <div className="rounded-2xl bg-gold-soft/60 border border-gold/30 p-5">
              <div className="text-xs font-bold tracking-[0.18em] text-gold mb-3">PRICING</div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <Price label="12 Hours" value={`₹${car.price12.toLocaleString()}`} />
                <Price label="24 Hours" value={`₹${car.price24.toLocaleString()}`} />
                <Price label="Extra Hour" value={`₹${extraRate}/hr`} />
              </div>
            </div>

            <div className="rounded-2xl bg-muted/50 border border-border p-5 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="mx-auto sm:mx-0 shrink-0 rounded-2xl bg-white p-3 shadow-[0_6px_28px_rgba(0,0,0,0.14)] ring-2 ring-gold/60 border-2 border-gold/40">
                <img
                  src={phonepeQr}
                  alt="PhonePe UPI QR code — scan to pay ₹1,000 advance"
                  className="h-44 w-44 sm:h-52 sm:w-52 object-contain"
                />
                <p className="mt-2 text-center text-[11px] font-semibold text-navy/80 tracking-wide">Scan to pay</p>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-xs font-bold tracking-[0.18em] text-gold">UPI ADVANCE</div>
                <div className="font-bold text-navy text-lg mt-1">Scan to pay ₹1,000</div>
                <div className="text-xs text-muted-foreground mt-0.5">UPI ID: {UPI_ID}</div>
                <p className="text-xs text-muted-foreground mt-2">Pay ₹1,000 advance to confirm your booking and send payment screenshot on WhatsApp.</p>
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-whatsapp text-white text-sm font-semibold hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send on WhatsApp
                </button>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="px-6 py-3 rounded-full border border-border bg-white font-semibold hover:bg-muted transition-all">
                Cancel
              </button>
              <button type="submit" className="px-6 py-3 rounded-full bg-gold text-gold-foreground font-semibold shadow-gold hover:-translate-y-0.5 transition-all">
                Submit Booking
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-navy mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Price({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-border">
      <div className="text-[10px] font-bold tracking-wider text-muted-foreground">{label.toUpperCase()}</div>
      <div className="font-bold text-navy mt-1">{value}</div>
    </div>
  );
}
