
import { Kitchen, UserRole } from './types';

export const MOCK_KITCHENS: Kitchen[] = [
  {
    id: 'k1',
    merchantName: 'Cô Lan',
    kitchenName: 'Bếp Nhà Cô Lan',
    avatar: 'https://picsum.photos/seed/kitchen1/200/200',
    location: { lat: 10.7769, lng: 106.7009 }, // District 1, HCM
    address: '123 Lê Lợi, Bến Thành, Q1',
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    meals: [
      {
        id: 'm1',
        name: 'Thịt Kho Tàu Trứng Cút',
        description: 'Món ăn truyền thống chuẩn vị mẹ nấu, thịt ba chỉ mềm tan, trứng cút thấm vị.',
        price: 45000,
        image: 'https://picsum.photos/seed/pork/400/300',
        availableDate: new Date().toISOString(),
        maxQuantity: 20,
        currentQuantity: 12,
        tags: ['Món Chính', 'Ăn Trưa']
      },
      {
        id: 'm2',
        name: 'Canh Chua Cá Hú',
        description: 'Canh chua thanh mát, đầy đủ bạc hà, giá, đậu bắp và cá tươi.',
        price: 35000,
        image: 'https://picsum.photos/seed/soup/400/300',
        availableDate: new Date().toISOString(),
        maxQuantity: 15,
        currentQuantity: 0,
        tags: ['Canh', 'Ăn Trưa']
      }
    ]
  },
  {
    id: 'k2',
    merchantName: 'Chị Hạnh',
    kitchenName: 'Hạnh Phúc Kitchen',
    avatar: 'https://picsum.photos/seed/kitchen2/200/200',
    location: { lat: 10.7810, lng: 106.7050 }, 
    address: '45 Nguyễn Huệ, Q1',
    rating: 4.5,
    reviewCount: 89,
    verified: true,
    meals: [
      {
        id: 'm3',
        name: 'Cơm Gà Hội An',
        description: 'Gà ta xé phay trộn gỏi, cơm nấu nước luộc gà thơm dẻo.',
        price: 55000,
        image: 'https://picsum.photos/seed/chicken/400/300',
        availableDate: new Date().toISOString(),
        maxQuantity: 30,
        currentQuantity: 8,
        tags: ['Đặc Sản', 'Cơm']
      }
    ]
  }
];

export const APP_THEME = {
  primary: '#FF7A00', // Cam Chín
  secondary: '#FFB800', // Vàng Mật Ong
  accent: '#5C3D2E', // Nâu Đất
  background: '#FDFCFB',
  text: '#3A261D'
};
