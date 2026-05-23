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
  | "Compact SUVs"
  | "MUVs"
  | "Adventure"
  | "Premium";

type CarItem = {
  name: string;
  category: Category;
  seats: number;
  transmission: string;
  price12: number;
  price24: number;
  extraHour: number;
};

const CARS: CarItem[] = [
  { name: "Maruti Suzuki Swift", category: "Hatchbacks", seats: 5, transmission: "Manual", price12: 1500, price24: 2500, extraHour: 200 },
  { name: "Maruti Suzuki Baleno", category: "Hatchbacks", seats: 5, transmission: "Manual", price12: 1500, price24: 2500, extraHour: 200 },
  { name: "Hyundai i20", category: "Hatchbacks", seats: 5, transmission: "Manual", price12: 1500, price24: 2500, extraHour: 200 },
  { name: "Maruti Suzuki Swift Dzire", category: "Sedans", seats: 5, transmission: "Manual", price12: 1500, price24: 2500, extraHour: 200 },
  { name: "Maruti Suzuki Dzire Automatic", category: "Automatic", seats: 5, transmission: "Automatic", price12: 2000, price24: 3000, extraHour: 200 },
  { name: "Hyundai Venue", category: "Compact SUVs", seats: 5, transmission: "Manual", price12: 2000, price24: 3000, extraHour: 200 },
  { name: "Kia Syros", category: "Compact SUVs", seats: 5, transmission: "Manual", price12: 2000, price24: 3000, extraHour: 200 },
  { name: "Kia Sonet", category: "Compact SUVs", seats: 5, transmission: "Automatic Diesel", price12: 2000, price24: 3000, extraHour: 250 },
  { name: "Maruti Suzuki Brezza", category: "Compact SUVs", seats: 5, transmission: "Manual", price12: 2000, price24: 3000, extraHour: 200 },
  { name: "Maruti Suzuki Ertiga", category: "MUVs", seats: 7, transmission: "Manual", price12: 2500, price24: 3500, extraHour: 200 },
  { name: "Toyota Innova", category: "MUVs", seats: 7, transmission: "Manual", price12: 2500, price24: 3500, extraHour: 200 },
  { name: "Mahindra Thar", category: "Adventure", seats: 4, transmission: "Manual 4x4", price12: 3500, price24: 4500, extraHour: 200 },
  { name: "Toyota Innova Crysta", category: "Premium", seats: 7, transmission: "Manual", price12: 3500, price24: 4500, extraHour: 200 },
];

const FILTERS = ["All", "Hatchbacks", "Sedans", "Automatic", "Compact SUVs", "MUVs", "Adventure", "Premium"] as const;

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
    return CARS.filter((c) => c.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-border/60 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.08)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-1 sm:gap-2 lg:gap-3 group shrink-0">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white shadow-premium grid place-items-center overflow-hidden ring-1 ring-border shrink-0">
              <img src={logo} alt="AIM Car Travels" className="h-11 w-11 sm:h-12 sm:w-12 object-contain" />
            </div>
            <div className="leading-none min-w-0 flex flex-col items-start">
              <div className="w-full text-left font-bold text-navy text-sm sm:text-base lg:text-lg tracking-tight whitespace-nowrap">AIM Car Travels</div>
              <div className="w-full text-left text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.22em] text-gold whitespace-nowrap">
                PREMIUM RENTALS
              </div>
              <div className="w-full text-center text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.22em] text-gold/70 whitespace-nowrap">
                &
              </div>
              <div className="w-full text-left text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.22em] text-gold whitespace-nowrap">
                TAXI SERVICES
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-9 text-sm font-medium text-foreground/80">
            <a href="#cars" className="hover:text-gold transition-colors">Cars</a>
            <a href="#why" className="hover:text-gold transition-colors">Why Us</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
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
              {["cars", "why", "about", "contact"].map((id) => (
                <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} className="py-2 capitalize">
                  {id === "why" ? "Why Us" : id}
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid place-items-center">
            <div className="space-y-7 animate-in fade-in slide-in-from-bottom-6 duration-700 text-center mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-premium border border-border text-xs font-semibold tracking-wider text-navy">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                SELF-DRIVE RENTALS · VIJAYAWADA
              </div>
              <h1 className="font-bold tracking-tight text-navy leading-[1.02]">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-black mb-2 sm:mb-3 lg:mb-4">
                  Welcome to
                </span>
                <span className="group block text-5xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-amber-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.18)] transition-transform duration-300 hover:-translate-y-1">
                  <span className="inline-block rounded-2xl bg-amber-50/80 px-3 py-1 ring-1 ring-amber-200/70 transition-all duration-300 group-hover:bg-amber-100 group-hover:shadow-[0_12px_30px_-12px_rgba(245,158,11,0.45)]">
                    AIM Car Travels
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

      {/* CARS */}
      <section id="cars" className="py-20 lg:py-28 bg-gradient-to-b from-white to-gold-soft/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-gold mb-3">AVAILABLE CARS</div>
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
                    {car.category.toUpperCase()}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <h3 className="text-xl font-bold text-navy">{car.name}</h3>
                  <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-gold" /> {car.seats} Seats</span>
                    <span className="flex items-center gap-1.5"><Fuel className="h-4 w-4 text-gold" /> {car.transmission}</span>
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
              { value: "13", label: "Vehicles" },
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-xl bg-white shadow-premium grid place-items-center overflow-hidden ring-1 ring-border">
                  <img src={logo} alt="AIM Car Travels" className="h-8 w-8 object-contain" />
                </div>
                <div>
                  <div className="font-bold text-navy">AIM Car Travels</div>
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-gold">PREMIUM RENTALS</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Premium self-drive car rentals and taxi services across Vijayawada. Clean cars, honest pricing.</p>
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
          <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} AIM Car Travels. All rights reserved.
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
    if (car.category === "Premium" || car.category === "Adventure") return 500;
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
