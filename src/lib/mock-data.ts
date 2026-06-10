export type Vet = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  price: number;
  experience: number;
  image: string;
  clinic: string;
  address: string;
  about: string;
  available: string[];
  tags: string[];
};

export const vets: Vet[] = [
  {
    id: "1",
    name: "Dr. Amelia Hart",
    specialty: "Small Animal Surgery",
    rating: 4.9,
    reviews: 312,
    distance: "0.8 km",
    price: 65,
    experience: 12,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    clinic: "PawPrint Veterinary Clinic",
    address: "221 Baker Street, Downtown",
    about:
      "Board-certified small animal surgeon with a focus on minimally invasive procedures and orthopedic care.",
    available: ["09:00", "10:30", "13:00", "15:30", "16:30"],
    tags: ["Surgery", "Orthopedic", "Dogs", "Cats"],
  },
  {
    id: "2",
    name: "Dr. Marcus Lee",
    specialty: "Dermatology",
    rating: 4.8,
    reviews: 198,
    distance: "1.2 km",
    price: 55,
    experience: 9,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    clinic: "GreenLeaf Animal Hospital",
    address: "48 Linden Ave, Eastside",
    about: "Skin specialist treating allergies, infections and chronic dermatological conditions in pets.",
    available: ["08:30", "11:00", "14:00", "17:00"],
    tags: ["Dermatology", "Allergies"],
  },
  {
    id: "3",
    name: "Dr. Priya Shah",
    specialty: "Exotic & Avian",
    rating: 4.95,
    reviews: 421,
    distance: "2.1 km",
    price: 75,
    experience: 15,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    clinic: "Wildwing Exotic Vet",
    address: "9 Orchard Lane, Northpark",
    about: "Cares for birds, reptiles, and small mammals with gentle, evidence-based medicine.",
    available: ["10:00", "12:00", "14:30", "16:00"],
    tags: ["Exotic", "Birds", "Reptiles"],
  },
  {
    id: "4",
    name: "Dr. Noah Bennett",
    specialty: "Dental Care",
    rating: 4.7,
    reviews: 156,
    distance: "3.0 km",
    price: 50,
    experience: 7,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    clinic: "BrightSmile Pet Dentistry",
    address: "12 Maple Court, Westend",
    about: "Pet dental cleanings, extractions, and oral health programs.",
    available: ["09:30", "11:30", "13:30", "15:00"],
    tags: ["Dental", "Cleaning"],
  },
];

export type Pet = {
  id: string;
  name: string;
  species: "Dog" | "Cat" | "Bird" | "Rabbit";
  breed: string;
  age: string;
  weight: string;
  image: string;
  color: "mint" | "lavender" | "sky";
};

export const pets: Pet[] = [
  {
    id: "p1",
    name: "Luna",
    species: "Dog",
    breed: "Golden Retriever",
    age: "3 yrs",
    weight: "28 kg",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
    color: "sky",
  },
  {
    id: "p2",
    name: "Mochi",
    species: "Cat",
    breed: "Scottish Fold",
    age: "2 yrs",
    weight: "4.2 kg",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",
    color: "lavender",
  },
  {
    id: "p3",
    name: "Kiwi",
    species: "Bird",
    breed: "Cockatiel",
    age: "1 yr",
    weight: "90 g",
    image: "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&q=80",
    color: "mint",
  },
];

export type Booking = {
  id: string;
  petName: string;
  vetName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
};

export const bookings: Booking[] = [
  {
    id: "b1",
    petName: "Luna",
    vetName: "Dr. Amelia Hart",
    specialty: "Annual Checkup",
    date: "Jun 12, 2026",
    time: "10:30",
    status: "upcoming",
    price: 65,
  },
  {
    id: "b2",
    petName: "Mochi",
    vetName: "Dr. Marcus Lee",
    specialty: "Skin Allergy Follow-up",
    date: "Jun 18, 2026",
    time: "14:00",
    status: "upcoming",
    price: 55,
  },
  {
    id: "b3",
    petName: "Luna",
    vetName: "Dr. Noah Bennett",
    specialty: "Dental Cleaning",
    date: "May 22, 2026",
    time: "11:30",
    status: "completed",
    price: 50,
  },
  {
    id: "b4",
    petName: "Kiwi",
    vetName: "Dr. Priya Shah",
    specialty: "Wellness Exam",
    date: "May 02, 2026",
    time: "16:00",
    status: "completed",
    price: 75,
  },
  {
    id: "b5",
    petName: "Mochi",
    vetName: "Dr. Amelia Hart",
    specialty: "Vaccination",
    date: "Apr 14, 2026",
    time: "09:00",
    status: "cancelled",
    price: 40,
  },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "appointment" | "reminder" | "prescription" | "system";
  category: "appointments" | "reminders" | "updates";
  unread: boolean;
  petName?: string;
  actionLabel?: string;
};

export const notifications: Notification[] = [
  // Appointments
  {
    id: "n1",
    title: "Appointment Confirmed",
    body: "Luna's checkup with Dr. Amelia Hart is confirmed for Jun 12 at 10:30 AM.",
    time: "Just now",
    type: "appointment",
    category: "appointments",
    unread: true,
    petName: "Luna",
    actionLabel: "View Booking",
  },
  {
    id: "n2",
    title: "Upcoming Appointment Tomorrow",
    body: "Don't forget — Mochi has a skin allergy follow-up with Dr. Lee at 2:00 PM.",
    time: "1h ago",
    type: "appointment",
    category: "appointments",
    unread: true,
    petName: "Mochi",
    actionLabel: "View Details",
  },
  {
    id: "n3",
    title: "Appointment Rescheduled",
    body: "Kiwi's wellness exam has been moved to Jun 20 at 3:30 PM by the clinic.",
    time: "3h ago",
    type: "appointment",
    category: "appointments",
    unread: false,
    petName: "Kiwi",
    actionLabel: "Confirm",
  },
  {
    id: "n4",
    title: "Visit Summary Ready",
    body: "Dr. Bennett's notes from Luna's dental cleaning on May 22 are now available.",
    time: "Yesterday",
    type: "appointment",
    category: "appointments",
    unread: false,
    petName: "Luna",
  },
  // Reminders
  {
    id: "n5",
    title: "Vaccination Due Soon",
    body: "Mochi's annual rabies booster is due in 10 days. Book a session before it lapses.",
    time: "2h ago",
    type: "reminder",
    category: "reminders",
    unread: true,
    petName: "Mochi",
    actionLabel: "Book Now",
  },
  {
    id: "n6",
    title: "Monthly Medication Refill",
    body: "Luna's Bravecto chew is running low. Refill before Jun 15 to avoid a gap in coverage.",
    time: "5h ago",
    type: "reminder",
    category: "reminders",
    unread: true,
    petName: "Luna",
    actionLabel: "Refill Now",
  },
  {
    id: "n7",
    title: "Weight Check Reminder",
    body: "It's been 3 months since Kiwi's last weight log. Keep the health records up to date.",
    time: "Yesterday",
    type: "reminder",
    category: "reminders",
    unread: false,
    petName: "Kiwi",
  },
  {
    id: "n8",
    title: "Parasite Prevention Due",
    body: "Luna's monthly flea & tick prevention treatment is due this week.",
    time: "2 days ago",
    type: "reminder",
    category: "reminders",
    unread: false,
    petName: "Luna",
  },
  // Updates
  {
    id: "n9",
    title: "New Prescription Added",
    body: "Dr. Lee prescribed Apoquel 16mg for Mochi — 1 tablet daily for 14 days.",
    time: "2 days ago",
    type: "prescription",
    category: "updates",
    unread: true,
    petName: "Mochi",
    actionLabel: "View Rx",
  },
  {
    id: "n10",
    title: "Lab Results Available",
    body: "Mochi's blood panel results from Jun 5 are ready. No critical findings detected.",
    time: "3 days ago",
    type: "system",
    category: "updates",
    unread: false,
    petName: "Mochi",
    actionLabel: "See Results",
  },
  {
    id: "n11",
    title: "New Vet Available in Your Area",
    body: "Dr. Sofia Reyes specializing in Cardiology just joined VetCare — 0.5 km away.",
    time: "4 days ago",
    type: "system",
    category: "updates",
    unread: false,
    actionLabel: "View Profile",
  },
  {
    id: "n12",
    title: "Profile Setup Complete",
    body: "Your VetCare account is fully set up. You're getting personalized care for all your pets!",
    time: "Last week",
    type: "system",
    category: "updates",
    unread: false,
  },
];

export type Prescription = {
  id: string;
  petName: string;
  medication: string;
  dosage: string;
  prescribedBy: string;
  date: string;
};

export const prescriptions: Prescription[] = [
  {
    id: "rx1",
    petName: "Mochi",
    medication: "Apoquel 16mg",
    dosage: "1 tablet daily for 14 days",
    prescribedBy: "Dr. Marcus Lee",
    date: "Jun 05, 2026",
  },
  {
    id: "rx2",
    petName: "Luna",
    medication: "Bravecto Chew",
    dosage: "1 chew every 12 weeks",
    prescribedBy: "Dr. Amelia Hart",
    date: "May 22, 2026",
  },
  {
    id: "rx3",
    petName: "Kiwi",
    medication: "Avian multivitamin",
    dosage: "2 drops in water daily",
    prescribedBy: "Dr. Priya Shah",
    date: "May 02, 2026",
  },
];
