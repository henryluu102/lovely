
export enum UserRole {
  BUYER = 'BUYER',
  MERCHANT = 'MERCHANT'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  WALLET = 'WALLET',
  MEAL_PACK = 'MEAL_PACK'
}

export type DeliveryType = 'EXPRESS' | 'SAVER';

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  avatar: string;
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: 'TOPUP' | 'PAYMENT' | 'REFUND';
  description: string;
  createdAt: string;
}

export interface MealCreditTransaction {
  id: string;
  change: number;
  description: string;
  createdAt: string;
}

export interface MealPackage {
  id: string;
  name: string;
  mealCount: number;
  price: number;
  description: string;
  savingPercent: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  availableDate: string;
  maxQuantity: number;
  currentQuantity: number;
  tags: string[];
}

export interface Kitchen {
  id: string;
  merchantName: string;
  kitchenName: string;
  avatar: string;
  location: Coordinates;
  address: string;
  rating: number;
  reviewCount: number;
  meals: Meal[];
  verified: boolean;
}

export interface OrderItem {
  mealId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CartItem extends OrderItem {
  image: string;
}

export interface Order {
  id: string;
  buyerId: string;
  kitchenId: string;
  kitchenName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryType: DeliveryType;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  notes?: string;
  isPaid: boolean;
  createdAt: string;
  pickupTime: string;
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'ORDER';
  timestamp: number;
}
