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
  status: "pending" | "upcoming" | "confirmed" | "completed" | "cancelled";
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
    status: "confirmed",
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
  {
    id: "b6",
    petName: "Luna",
    vetName: "Dr. Marcus Lee",
    specialty: "Flea & Tick Prevention",
    date: "Jun 25, 2026",
    time: "09:00",
    status: "pending",
    price: 35,
  },
  {
    id: "b7",
    petName: "Mochi",
    vetName: "Dr. Priya Shah",
    specialty: "Exotic Pet Consultation",
    date: "Jun 20, 2026",
    time: "13:30",
    status: "pending",
    price: 75,
  },
  {
    id: "b8",
    petName: "Kiwi",
    vetName: "Dr. Noah Bennett",
    specialty: "Vaccination",
    date: "Jun 15, 2026",
    time: "15:00",
    status: "confirmed",
    price: 50,
  },
  {
    id: "b9",
    petName: "Luna",
    vetName: "Dr. Priya Shah",
    specialty: "Post-Surgery Follow-up",
    date: "Apr 28, 2026",
    time: "14:00",
    status: "completed",
    price: 85,
  },
  {
    id: "b10",
    petName: "Mochi",
    vetName: "Dr. Noah Bennett",
    specialty: "Dental Scaling",
    date: "Jun 05, 2026",
    time: "10:00",
    status: "completed",
    price: 60,
  },
  {
    id: "b11",
    petName: "Luna",
    vetName: "Dr. Amelia Hart",
    specialty: "Orthopedic Consultation",
    date: "May 18, 2026",
    time: "16:30",
    status: "cancelled",
    price: 95,
  },
  {
    id: "b12",
    petName: "Kiwi",
    vetName: "Dr. Marcus Lee",
    specialty: "Skin Fungal Check",
    date: "Jun 22, 2026",
    time: "11:00",
    status: "upcoming",
    price: 55,
  },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "appointment" | "reminder" | "prescription" | "system";
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Appointment confirmed",
    body: "Luna's visit with Dr. Amelia Hart is confirmed for Jun 12, 10:30.",
    time: "2h ago",
    type: "appointment",
    unread: true,
  },
  {
    id: "n2",
    title: "Vaccination reminder",
    body: "Mochi's annual rabies booster is due in 10 days.",
    time: "Yesterday",
    type: "reminder",
    unread: true,
  },
  {
    id: "n3",
    title: "New prescription",
    body: "Dr. Lee added Apoquel 16mg to Mochi's records.",
    time: "2 days ago",
    type: "prescription",
    unread: false,
  },
  {
    id: "n4",
    title: "Welcome to VetCare",
    body: "Set up your first pet profile to get personalized care reminders.",
    time: "Last week",
    type: "system",
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
