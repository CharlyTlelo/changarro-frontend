export interface Category {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bg: string;
}

export interface Business {
  name: string;
  cat: string;
  rating: number;
  reviews: number;
  h: number;
  promo?: string;
  hot?: boolean;
  nuevo?: boolean;
  tags: string[];
  tag?: string;
  color: string;
  emoji: string;
}

export interface Sello {
  label: string;
  emoji: string;
  got: boolean;
  color: string;
}

export interface Recompensa {
  name: string;
  cost: number;
  emoji: string;
  color: string;
  sold: string;
}

export interface Review {
  name: string;
  level: string;
  emoji: string;
  rating: number;
  text: string;
  photos?: string[];
  likes: number;
  when: string;
}

export const CATEGORIES: Category[] = [
  { id: 'comida',     label: 'Comida',    emoji: '🌮', color: '#DD4D2A', bg: '#FFE0C2' },
  { id: 'tienda',     label: 'Tienda',    emoji: '🛍️', color: '#4A8A3A', bg: '#D4ECC2' },
  { id: 'servicios',  label: 'Servicios', emoji: '🔧', color: '#2B6FA0', bg: '#C2E0EC' },
  { id: 'entrete',    label: 'Diversión', emoji: '🎉', color: '#E8628E', bg: '#FFD0DA' },
  { id: 'salud',      label: 'Salud',     emoji: '⚕️', color: '#7A3FA8', bg: '#E8C8DD' },
];

export const BUSINESSES: Business[] = [
  { name: 'Tacos Don Juan', cat: 'comida', rating: 4.8, reviews: 234, h: 220, promo: '2x1', tags: ['Pastor', 'Suadero'], tag: 'Tacos al pastor', color: '#FFB57A', emoji: '🌮' },
  { name: 'Mercería Lupita', cat: 'tienda', rating: 4.6, reviews: 89, h: 160, tags: ['Hilos', 'Botones'], tag: 'Hilos y botones', color: '#A8D08B', emoji: '🧵' },
  { name: 'Estética Rocío', cat: 'servicios', rating: 4.9, reviews: 156, h: 200, tags: ['Corte', 'Tinte'], tag: 'Corte y tinte', color: '#8FC4DC', emoji: '💇' },
  { name: 'Café Avellaneda', cat: 'comida', rating: 4.7, reviews: 412, h: 240, hot: true, tags: ['Especialidad'], tag: 'Especialidad', color: '#C68A52', emoji: '☕' },
  { name: 'Disco La Cumbia', cat: 'entrete', rating: 4.4, reviews: 78, h: 180, tags: ['Salsa', 'Bachata'], tag: 'Salsa y cumbia', color: '#D87FA0', emoji: '💃' },
  { name: 'Farmacia 24h', cat: 'salud', rating: 4.5, reviews: 203, h: 150, tags: ['Abierta'], tag: 'Abierto 24h', color: '#C99FD9', emoji: '💊' },
  { name: 'Florería Camelia', cat: 'tienda', rating: 5.0, reviews: 67, h: 210, nuevo: true, tags: ['Ramos'], tag: 'Flores frescas', color: '#F5A8B8', emoji: '💐' },
  { name: 'Panadería Sol', cat: 'comida', rating: 4.8, reviews: 521, h: 170, promo: '−20%', tags: ['Conchas'], tag: 'Pan artesanal', color: '#E8B860', emoji: '🥖' },
  { name: 'Cantina Don Beto', cat: 'entrete', rating: 4.7, reviews: 312, h: 210, tags: ['Cervezas'], tag: 'Cervezas y botanas', color: '#C9A06B', emoji: '🍺' },
  { name: 'Tlapalería El Sol', cat: 'tienda', rating: 4.5, reviews: 95, h: 175, tags: ['Pinturas'], tag: 'Pinturas y herramientas', color: '#D9A87A', emoji: '🔧' },
  { name: 'Dr. Mendoza', cat: 'salud', rating: 4.9, reviews: 188, h: 195, tags: ['General'], tag: 'Medicina general', color: '#B8C4DC', emoji: '🩺' },
  { name: 'Lavandería Express', cat: 'servicios', rating: 4.6, reviews: 142, h: 165, tags: ['Mismo día'], tag: 'Mismo día', color: '#9FCDD9', emoji: '🧺' },
];

export const SELLOS: Sello[] = [
  { label: 'Taquero',    emoji: '🌮', got: true,  color: '#DD4D2A' },
  { label: 'Cafeicón',   emoji: '☕', got: true,  color: '#C68A52' },
  { label: 'Bohemio',    emoji: '🎸', got: true,  color: '#7A3FA8' },
  { label: 'Mañanero',   emoji: '🌅', got: true,  color: '#F5B92E' },
  { label: 'Vecino',     emoji: '🏘️', got: false, color: '#4A8A3A' },
  { label: 'Madrugador', emoji: '🐓', got: false, color: '#2B6FA0' },
  { label: 'Curandero',  emoji: '🌿', got: false, color: '#7A3FA8' },
  { label: 'Bailarín',   emoji: '💃', got: false, color: '#E8628E' },
];

export const RECOMPENSAS: Recompensa[] = [
  { name: '50% en Café Avellaneda', cost: 800, emoji: '☕', color: '#C68A52', sold: '23 canjeados' },
  { name: 'Conchas gratis Pan Sol', cost: 400, emoji: '🥖', color: '#E8B860', sold: '47 canjeados' },
  { name: 'Manicure en Rocío',      cost: 1200, emoji: '💅', color: '#E8628E', sold: '12 canjeados' },
];

export const REVIEWS: Review[] = [
  {
    name: 'María G.',
    level: 'Embajadora',
    emoji: '👑',
    rating: 5,
    text: 'Los mejores del barrio, neta. Don Juan siempre con la mejor onda y las salsas de la casa son top.',
    photos: ['#FFB57A', '#E8B860', '#C68A52'],
    likes: 42,
    when: 'hace 3 días',
  },
  {
    name: 'Roberto L.',
    level: 'Explorador',
    emoji: '🧭',
    rating: 4,
    text: 'Sabor auténtico al carbón. Llega temprano porque se llena rapidísimo el martes.',
    likes: 28,
    when: 'hace 1 sem',
  },
];

export const COLLECTION = [
  { e: '🌮', c: '#FFB57A', n: 'Tacos Don Juan' },
  { e: '☕', c: '#C68A52', n: 'Avellaneda' },
  { e: '💇', c: '#8FC4DC', n: 'Rocío' },
  { e: '🥖', c: '#E8B860', n: 'Pan Sol' },
  { e: '🧵', c: '#A8D08B', n: 'Lupita' },
  { e: '💐', c: '#F5A8B8', n: 'Camelia' },
  { e: '🎸', c: '#D87FA0', n: 'La Cumbia' },
  { e: '💊', c: '#C99FD9', n: 'Farmacia' },
  { e: '🌶️', c: '#FFB57A', n: '+39 más' },
];

export const MENU_ITEMS = [
  { name: 'Pastor', count: 142, emoji: '🌮', price: '$25' },
  { name: 'Suadero', count: 89, emoji: '🌯', price: '$22' },
  { name: 'Campechano', count: 67, emoji: '🥙', price: '$28' },
  { name: 'Quesadillas', count: 45, emoji: '🫓', price: '$35' },
];
