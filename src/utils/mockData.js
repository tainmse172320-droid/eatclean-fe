// Mock data for all entities when working without backend

export const mockMeals = [
  // DISHES
  {
    _id: '1',
    name: 'Black Pepper Chicken & Vegetables',
    nameVi: 'Gà Sốt Tiêu Đen & Rau Củ',
    image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=500',
    price: 45000,
    calories: 350,
    protein: 30,
    carb: 35,
    fat: 10,
    category: 'weight-loss',
    ingredients: ['Chicken breast', 'Black pepper sauce', 'Mixed vegetables'],
    ingredientsVi: ['Thịt gà', 'Sốt tiêu đen', 'Rau củ hỗn hợp'],
    description: 'Flavorful black pepper chicken with healthy mixed vegetables.',
    descriptionVi: 'Gà sốt tiêu đen đậm đà kèm rau củ tốt lành.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.8
  },
  {
    _id: '2',
    name: 'Pan-seared Chicken Breast & Vegetables',
    nameVi: 'Ức Gà Áp Chảo & Rau Củ',
    image: 'https://images.unsplash.com/photo-1532636248629-b0e2c8e8a0a3?w=500',
    price: 45000,
    calories: 320,
    protein: 35,
    carb: 25,
    fat: 8,
    category: 'weight-loss',
    ingredients: ['Chicken breast', 'Mixed vegetables', 'Spices'],
    ingredientsVi: ['Ức gà', 'Rau củ hỗn hợp', 'Gia vị'],
    description: 'High protein pan-seared chicken breast for lean diet.',
    descriptionVi: 'Ức gà áp chảo giàu protein cho chế độ ăn kiêng.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.7
  },
  {
    _id: '3',
    name: 'Black Pepper Beef & Broccoli',
    nameVi: 'Bò Sốt Tiêu Đen & Súp Lơ',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500',
    price: 50000,
    calories: 420,
    protein: 35,
    carb: 40,
    fat: 15,
    category: 'muscle-gain',
    ingredients: ['Beef', 'Broccoli', 'Black pepper sauce'],
    ingredientsVi: ['Thịt bò', 'Súp lơ', 'Sốt tiêu đen'],
    description: 'Tender beef slices with fresh broccoli in black pepper sauce.',
    descriptionVi: 'Thịt bò mềm kèm súp lơ tươi trong sốt tiêu đen.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.9
  },
  {
    _id: '4',
    name: 'Teriyaki Beef & Salad',
    nameVi: 'Bò Sốt Teriyaki & Salad',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500',
    price: 50000,
    calories: 450,
    protein: 32,
    carb: 45,
    fat: 14,
    category: 'muscle-gain',
    ingredients: ['Beef', 'Teriyaki sauce', 'Fresh salad'],
    ingredientsVi: ['Thịt bò', 'Sốt teriyaki', 'Salad tươi'],
    description: 'Sweet and savory teriyaki beef paired with crisp salad.',
    descriptionVi: 'Thịt bò teriyaki đặc trưng ăn kèm salad tươi giòn.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.8
  },
  {
    _id: '5',
    name: 'Passion Fruit Salmon & Vegetables',
    nameVi: 'Cá Hồi Sốt Chanh Dây & Rau Củ',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500',
    price: 65000,
    calories: 500,
    protein: 38,
    carb: 30,
    fat: 22,
    category: 'muscle-gain',
    ingredients: ['Salmon', 'Passion fruit sauce', 'Mixed vegetables'],
    ingredientsVi: ['Cá hồi', 'Sốt chanh dây', 'Rau củ hỗn hợp'],
    description: 'Rich salmon topped with tangy passion fruit sauce.',
    descriptionVi: 'Cá hồi đậm đà phủ sốt chanh dây chua ngọt.',
    isAvailable: true,
    isBestSeller: true,
    rating: 5.0
  },

  // JUICE
  {
    _id: '6',
    name: 'Apple Juice',
    nameVi: 'Nước Ép Táo',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
    price: 17000,
    calories: 120,
    protein: 1,
    carb: 28,
    fat: 0,
    category: 'maintain',
    ingredients: ['Apple'],
    ingredientsVi: ['Táo'],
    description: 'Freshly squeezed apple juice.',
    descriptionVi: 'Nước trái cây ép từ táo tươi.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.6
  },
  {
    _id: '7',
    name: 'Orange Juice',
    nameVi: 'Nước Ép Cam',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500',
    price: 15000,
    calories: 110,
    protein: 2,
    carb: 25,
    fat: 0,
    category: 'maintain',
    ingredients: ['Orange'],
    ingredientsVi: ['Cam'],
    description: 'Vitamin C rich orange juice.',
    descriptionVi: 'Nước ép cam tươi giàu Vitamin C.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.8
  },
  {
    _id: '8',
    name: 'Pineapple Juice',
    nameVi: 'Nước Ép Thơm',
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=500',
    price: 15000,
    calories: 130,
    protein: 1,
    carb: 32,
    fat: 0,
    category: 'maintain',
    ingredients: ['Pineapple'],
    ingredientsVi: ['Thơm (Dứa)'],
    description: 'Sweet and refreshing tropical pineapple juice.',
    descriptionVi: 'Nước ép dứa nhiệt đới ngọt ngào sảng khoái.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.5
  },
  {
    _id: '9',
    name: 'Watermelon Juice',
    nameVi: 'Nước Ép Dưa Hấu',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=500',
    price: 18000,
    calories: 90,
    protein: 1,
    carb: 22,
    fat: 0,
    category: 'weight-loss',
    ingredients: ['Watermelon'],
    ingredientsVi: ['Dưa hấu'],
    description: 'Hydrating watermelon juice.',
    descriptionVi: 'Nước ép dưa hấu thanh mát giải nhiệt.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.7
  },
  {
    _id: '10',
    name: 'Orange & Pineapple Juice',
    nameVi: 'Nước Ép Cam Mix Thơm',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500',
    price: 25000,
    calories: 135,
    protein: 1,
    carb: 30,
    fat: 0,
    category: 'maintain',
    ingredients: ['Orange', 'Pineapple'],
    ingredientsVi: ['Cam', 'Thơm'],
    description: 'Perfect blend of sweet pineapple and tangy orange.',
    descriptionVi: 'Sự kết hợp hoàn hảo giữa thơm ngọt và cam chua dịu.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.6
  },
  {
    _id: '11',
    name: 'Apple & Celery Juice',
    nameVi: 'Nước Ép Táo Mix Cần Tây',
    image: 'https://images.unsplash.com/photo-1638176066959-9c9c5aadf45d?w=500',
    price: 20000,
    calories: 100,
    protein: 1,
    carb: 25,
    fat: 0,
    category: 'weight-loss',
    ingredients: ['Apple', 'Celery'],
    ingredientsVi: ['Táo', 'Cần tây'],
    description: 'Detoxing celery juice sweetened naturally with apple.',
    descriptionVi: 'Nước ép detox cần tây với vị ngọt tự nhiên từ táo.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.5
  },
  {
    _id: '12',
    name: 'Watermelon & Apple Juice',
    nameVi: 'Nước Ép Dưa Hấu Mix Táo',
    image: 'https://images.unsplash.com/photo-1550065620-6e11d9e11ac0?w=500',
    price: 30000,
    calories: 110,
    protein: 1,
    carb: 26,
    fat: 0,
    category: 'maintain',
    ingredients: ['Watermelon', 'Apple'],
    ingredientsVi: ['Dưa hấu', 'Táo'],
    description: 'Refreshing mix of hydrating watermelon and crisp apple.',
    descriptionVi: 'Hòa quyện thanh mát giữa dưa hấu và táo giòn.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.7
  },
  {
    _id: '13',
    name: 'Carrot, Lemon & Apple Juice',
    nameVi: 'Nước Ép Cà Rốt, Chanh, Táo',
    image: 'https://images.unsplash.com/photo-1622597467836-f3e202060e98?w=500',
    price: 25000,
    calories: 125,
    protein: 2,
    carb: 30,
    fat: 0,
    category: 'maintain',
    ingredients: ['Carrot', 'Lemon', 'Apple'],
    ingredientsVi: ['Cà rốt', 'Chanh', 'Táo'],
    description: 'Antioxidant powerhouse juice blend with a citrus kick.',
    descriptionVi: 'Hỗn hợp nước ép giàu chất chống oxy hóa với chút vị chanh.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.8
  },

  // COMBO
  {
    _id: '14',
    name: '7 Meals + 7 Juices Combo',
    nameVi: '7 Bữa + 7 Nước',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500',
    price: 450000,
    calories: 3200,
    protein: 200,
    carb: 300,
    fat: 80,
    category: 'weight-loss',
    ingredients: ['7 random healthy meals', '7 random juices'],
    ingredientsVi: ['7 bữa ăn ngẫu nhiên', '7 loại nước ép'],
    description: 'A complete 7-day combo to kickstart your healthy diet.',
    descriptionVi: 'Combo 7 ngày hoàn chỉnh để bắt đầu chế độ ăn lành mạnh.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.9
  },
  {
    _id: '16',
    name: '30 Meals + 30 Juices Monthly Combo',
    nameVi: '30 Bữa + 30 Nước',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
    price: 1800000,
    calories: 14000,
    protein: 950,
    carb: 1300,
    fat: 380,
    category: 'weight-loss',
    ingredients: ['30 varied healthy meals', '30 fresh juices'],
    ingredientsVi: ['30 bữa ăn đa dạng', '30 nước ép tươi'],
    description: 'Full monthly plan for a committed healthy lifestyle.',
    descriptionVi: 'Gói ăn cả tháng cho lối sống lành mạnh vượt trội.',
    isAvailable: true,
    isBestSeller: true,
    rating: 5.0
  },
  {
    _id: '17',
    name: 'Fit Package (Premium)',
    nameVi: 'Gói Fit (Premium)',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500',
    price: 2000000,
    calories: 16000,
    protein: 1100,
    carb: 1400,
    fat: 420,
    category: 'muscle-gain',
    ingredients: ['Premium custom meals', 'Premium juices', 'Nutritional consultation'],
    ingredientsVi: ['Các bữa ăn cao cấp tùy chọn', 'Nước ép cao cấp', 'Tư vấn dinh dưỡng'],
    description: 'Premium monthly fit package customized for your goals.',
    descriptionVi: 'Gói Fit cao cấp hàng tháng được thiết kế riêng cho mục tiêu độ body của bạn.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.9
  }
];

export const mockOrders = [
  {
    _id: 'order1',
    orderNumber: 'EC2024001',
    user: {
      _id: 'user123',
      name: 'Test User',
      email: 'user@eatclean.com'
    },
    items: [
      {
        meal: mockMeals[0],
        name: mockMeals[0].name,
        price: mockMeals[0].price,
        quantity: 2,
        calories: mockMeals[0].calories
      },
      {
        meal: mockMeals[3],
        name: mockMeals[3].name,
        price: mockMeals[3].price,
        quantity: 1,
        calories: mockMeals[3].calories
      }
    ],
    totalPrice: 235000,
    totalCalories: 1280,
    shippingInfo: {
      name: 'Test User',
      phone: '0907654321',
      email: 'user@eatclean.com',
      address: '123 Nguyen Hue Street',
      city: 'Ho Chi Minh City',
      district: 'District 1',
      ward: 'Ben Nghe Ward',
      note: 'Please deliver before 12pm'
    },
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20')
  },
  {
    _id: 'order2',
    orderNumber: 'EC2024002',
    user: {
      _id: 'user123',
      name: 'Test User',
      email: 'user@eatclean.com'
    },
    items: [
      {
        meal: mockMeals[1],
        name: mockMeals[1].name,
        price: mockMeals[1].price,
        quantity: 3,
        calories: mockMeals[1].calories
      }
    ],
    totalPrice: 360000,
    totalCalories: 1560,
    shippingInfo: {
      name: 'Test User',
      phone: '0907654321',
      email: 'user@eatclean.com',
      address: '123 Nguyen Hue Street',
      city: 'Ho Chi Minh City',
      district: 'District 1',
      ward: 'Ben Nghe Ward'
    },
    paymentMethod: 'bank-transfer',
    paymentStatus: 'paid',
    orderStatus: 'delivering',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-16')
  },
  {
    _id: 'order3',
    orderNumber: 'EC2024003',
    user: {
      _id: 'user123',
      name: 'Test User',
      email: 'user@eatclean.com'
    },
    items: [
      {
        meal: mockMeals[6],
        name: mockMeals[6].name,
        price: mockMeals[6].price,
        quantity: 1,
        calories: mockMeals[6].calories
      },
      {
        meal: mockMeals[9],
        name: mockMeals[9].name,
        price: mockMeals[9].price,
        quantity: 2,
        calories: mockMeals[9].calories
      }
    ],
    totalPrice: 220000,
    totalCalories: 1160,
    shippingInfo: {
      name: 'Test User',
      phone: '0907654321',
      email: 'user@eatclean.com',
      address: '123 Nguyen Hue Street',
      city: 'Ho Chi Minh City',
      district: 'District 1',
      ward: 'Ben Nghe Ward'
    },
    paymentMethod: 'qr-code',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12')
  }
];

export const mockUsers = [
  {
    _id: 'user123',
    name: 'Test User',
    email: 'user@eatclean.com',
    phone: '0907654321',
    role: 'user',
    isActive: true
  },
  {
    _id: 'admin1',
    name: 'Admin',
    email: 'admin@eatclean.com',
    phone: '0987654321',
    role: 'admin',
    isActive: true
  },
  {
    _id: 'user124',
    name: 'Jane Doe',
    email: 'jane@eatclean.com',
    phone: '0912345678',
    role: 'user',
    isActive: false
  }
];

export const mockStats = {
  totalUsers: 156,
  totalOrders: 423,
  totalMeals: 12,
  totalRevenue: 45750000,
  recentOrders: mockOrders
};

// Helper function to get mock cart from localStorage
export const getMockCart = () => {
  const cartData = localStorage.getItem('mockCart');
  return cartData ? JSON.parse(cartData) : { items: [], totalPrice: 0, totalCalories: 0 };
};

// Helper function to save mock cart to localStorage
export const saveMockCart = (cart) => {
  localStorage.setItem('mockCart', JSON.stringify(cart));
};

// Helper function to calculate cart totals
export const calculateCartTotals = (items) => {
  let totalPrice = 0;
  let totalCalories = 0;
  
  items.forEach(item => {
    const meal = mockMeals.find(m => m._id === item.meal._id || m._id === item.meal);
    if (meal) {
      totalPrice += meal.price * item.quantity;
      totalCalories += meal.calories * item.quantity;
    }
  });
  
  return {
    totalPrice: Math.round(totalPrice),
    totalCalories: Math.round(totalCalories)
  };
};
