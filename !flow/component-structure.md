# Структура компонентов - Skorotut Web App

## 🎨 Дизайн-система

### Цветовая палитра
```typescript
// Основные цвета Skorotut
const colors = {
  primary: '#FF6B35',      // Оранжевый основной
  secondary: '#2E86AB',    // Синий дополнительный
  success: '#4CAF50',      // Зеленый успех
  warning: '#FF9800',      // Оранжевый предупреждение
  error: '#F44336',        // Красный ошибка
  
  // Нейтральные
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
}
```

## 📱 Layout компоненты

### AppLayout
```typescript
interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showCart?: boolean;
}
```

### Header
```typescript
interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showProfile?: boolean;
  actions?: React.ReactNode;
}
```

### BottomNavigation
```typescript
interface BottomNavigationProps {
  activeTab: 'home' | 'catalog' | 'orders' | 'profile';
  onTabChange: (tab: string) => void;
}
```

### CartButton (плавающая кнопка корзины)
```typescript
interface CartButtonProps {
  itemCount: number;
  totalPrice: number;
  onClick: () => void;
}
```

## 🏠 Главная страница

### StoriesCarousel
```typescript
interface StoriesCarouselProps {
  stories: Story[];
  onStoryClick: (story: Story) => void;
}

interface Story {
  id: string;
  image: string;
  title: string;
  link?: string;
}
```

### AddressSelector
```typescript
interface AddressSelectorProps {
  selectedAddress?: Address;
  onAddressChange: (address: Address) => void;
  onAddressAdd: () => void;
}
```

### SellersList
```typescript
interface SellersListProps {
  sellers: Seller[];
  type: 'restaurant' | 'shop';
  onSellerClick: (seller: Seller) => void;
}
```

### SellerCard
```typescript
interface SellerCardProps {
  seller: Seller;
  onClick: () => void;
  showDeliveryInfo?: boolean;
  showRating?: boolean;
}

interface Seller {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  isOpen: boolean;
  type: 'restaurant' | 'shop';
  categories: string[];
}
```

## 🛍️ Каталог и товары

### ProductGrid
```typescript
interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  loading?: boolean;
}
```

### ProductCard
```typescript
interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
  showAddButton?: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  inStock: boolean;
  sellerId: string;
  categoryId: string;
}
```

### ProductFilters
```typescript
interface ProductFiltersProps {
  categories: Category[];
  selectedCategory?: string;
  sortBy: SortOption;
  onCategoryChange: (categoryId: string) => void;
  onSortChange: (sort: SortOption) => void;
}
```

### SearchBar
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
}
```

## 🛒 Корзина

### CartList
```typescript
interface CartListProps {
  items: CartItem[];
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}
```

### CartItem
```typescript
interface CartItemProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  sellerId: string;
  sellerName: string;
}
```

### PromoCodeInput
```typescript
interface PromoCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onApply: (code: string) => void;
  appliedCode?: PromoCode;
  onRemove: () => void;
  loading?: boolean;
}
```

### OrderSummary
```typescript
interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode?: PromoCode;
}
```

## 📋 Формы

### AddressForm
```typescript
interface AddressFormProps {
  address?: Address;
  onSubmit: (address: Address) => void;
  onCancel: () => void;
  loading?: boolean;
}

interface Address {
  id?: string;
  title: string;
  street: string;
  building: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  comment?: string;
  latitude: number;
  longitude: number;
  cityId: string;
}
```

### ProfileForm
```typescript
interface ProfileFormProps {
  user: User;
  onSubmit: (user: Partial<User>) => void;
  loading?: boolean;
}
```

### PhoneVerificationForm
```typescript
interface PhoneVerificationFormProps {
  onSubmit: (phone: string) => void;
  onVerify: (code: string) => void;
  step: 'phone' | 'code';
  loading?: boolean;
}
```

## 🎯 UI компоненты

### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### Input
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}
```

### Modal
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

### BottomSheet
```typescript
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[];
}
```

### Toast
```typescript
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose: () => void;
}
```

### Loading
```typescript
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}
```

### Shimmer
```typescript
interface ShimmerProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}
```

## 📊 Специальные компоненты

### OrderStatus
```typescript
interface OrderStatusProps {
  status: OrderStatus;
  timeline: OrderTimeline[];
  estimatedTime?: string;
}

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
```

### RatingStars
```typescript
interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}
```

### ImageGallery
```typescript
interface ImageGalleryProps {
  images: string[];
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  showThumbnails?: boolean;
}
```

### MapView
```typescript
interface MapViewProps {
  center: { lat: number; lng: number };
  markers?: MapMarker[];
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  height?: string;
}
```

### QuantitySelector
```typescript
interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
}
```

## 🔄 Состояния загрузки

### EmptyState
```typescript
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### ErrorState
```typescript
interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}
```

### NoInternet
```typescript
interface NoInternetProps {
  onRetry: () => void;
}
```

## 📱 Адаптивность

Все компоненты должны поддерживать:
- Responsive дизайн для разных размеров экрана
- Touch-friendly интерфейс
- Поддержка темной темы Telegram
- Accessibility (ARIA атрибуты)
- Плавные анимации и переходы 