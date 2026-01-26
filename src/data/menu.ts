interface MenuItem {
  title: string;
  description: string;
  price: number;
  crossedPrice?: number;
  image: string;
  isVeg: boolean;
  category: string;
}

const menu: MenuItem[] = [
  // 🍕 PIZZA (VEG)
  {
    title: "Margherita Pizza",
    description: "Classic delight with fresh mozzarella and basil.",
    price: 9.99,
    crossedPrice: 12.99,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },
  {
    title: "Veggie Supreme",
    description: "Loaded with onions, capsicum, olives, and sweet corn.",
    price: 11.49,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },

  // 🍕 PIZZA (NON-VEG)
  {
    title: "Pepperoni Pizza",
    description: "A storm of crispy pepperoni and double mozzarella.",
    price: 12.99,
    crossedPrice: 15.99,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },
  {
    title: "BBQ Chicken Pizza",
    description: "Smoky BBQ sauce topped with grilled chicken chunks.",
    price: 13.99,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },

  // 🍗 CHICKEN
  {
    title: "Crispy Fried Chicken",
    description: "Golden fried chicken with a crunchy outer layer.",
    price: 10.99,
    crossedPrice: 13.49,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Chicken",
  },
  {
    title: "Grilled Chicken Breast",
    description: "Juicy grilled chicken seasoned with herbs and spices.",
    price: 11.99,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Chicken",
  },
  {
    title: "Spicy Chicken Wings",
    description: "Hot and spicy wings served with a cooling dip.",
    price: 9.49,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Chicken",
  },
];

export default menu;
