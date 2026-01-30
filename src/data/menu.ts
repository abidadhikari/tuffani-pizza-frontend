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
  // 🍕 SIGNATURE PIZZA

  {
    title: "Tufani Veg Pizza (Small)",
    description:
      "Fresh seasonal vegetables, rich tomato sauce, and mozzarella cheese.",
    price: 250,
    crossedPrice: 300,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },
  {
    title: "Tufani Veg Pizza (Medium)",
    description:
      "Fresh seasonal vegetables, rich tomato sauce, and mozzarella cheese.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },

  {
    title: "Tufani Non-Veg Pizza (Small)",
    description:
      "Chicken toppings, mozzarella cheese, and special Tufani sauce.",
    price: 250,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },
  {
    title: "Tufani Non-Veg Pizza (Medium)",
    description:
      "Chicken toppings, mozzarella cheese, and special Tufani sauce.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },

  {
    title: "Spicy Grilled Chicken Pizza (Small)",
    description: "Grilled chicken, onions, capsicum, mozzarella, smoky flavor.",
    price: 250,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },
  {
    title: "Spicy Grilled Chicken Pizza (Medium)",
    description: "Grilled chicken, onions, capsicum, mozzarella, smoky flavor.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },

  {
    title: "Chicken Supreme Pizza (Small)",
    description: "Chicken, olives, capsicum, onion, and cheese.",
    price: 250,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },
  {
    title: "Chicken Supreme Pizza (Medium)",
    description: "Chicken, olives, capsicum, onion, and cheese.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },

  {
    title: "Chicken BBQ Pizza (Small)",
    description: "BBQ chicken, onion, mozzarella, and tangy BBQ sauce.",
    price: 250,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },
  {
    title: "Chicken BBQ Pizza (Medium)",
    description: "BBQ chicken, onion, mozzarella, and tangy BBQ sauce.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },

  {
    title: "Garden Veg Pizza (Small)",
    description: "Mixed vegetables, tomato sauce, and mozzarella cheese.",
    price: 250,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },
  {
    title: "Garden Veg Pizza (Medium)",
    description: "Mixed vegetables, tomato sauce, and mozzarella cheese.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },

  {
    title: "Himalayan Cheese Pizza (Small)",
    description: "Classic pizza with rich mozzarella and cheese blend.",
    price: 250,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },
  {
    title: "Himalayan Cheese Pizza (Medium)",
    description: "Classic pizza with rich mozzarella and cheese blend.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },

  {
    title: "Chicken Peri Peri Pizza (Small)",
    description: "Peri peri chicken with cheese and peri peri sauce.",
    price: 250,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },
  {
    title: "Chicken Peri Peri Pizza (Medium)",
    description: "Peri peri chicken with cheese and peri peri sauce.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: false,
    category: "Pizza",
  },

  {
    title: "Veg Lovers Pizza (Small)",
    description: "Mushroom, grilled paneer, tomato sauce, and mozzarella.",
    price: 250,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },
  {
    title: "Veg Lovers Pizza (Medium)",
    description: "Mushroom, grilled paneer, tomato sauce, and mozzarella.",
    price: 450,
    image: "/images/pizza.png",
    isVeg: true,
    category: "Pizza",
  },

  // 🍗 FRIED CHICKEN

  {
    title: "Tufani Fried Chicken (1 pc)",
    description: "Crispy fried chicken – 1 piece.",
    price: 125,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Chicken",
  },
  {
    title: "Tufani Fried Chicken (2 pc)",
    description: "Crispy fried chicken – 2 pieces.",
    price: 240,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Chicken",
  },
  {
    title: "Tufani Fried Chicken (4 pc)",
    description: "Crispy fried chicken – 4 pieces.",
    price: 480,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Chicken",
  },
  {
    title: "Tufani Fried Chicken (8 pc)",
    description: "Crispy fried chicken – 8 pieces.",
    price: 970,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Chicken",
  },

  // 🍔 BURGER

  {
    title: "Veg Burger",
    description: "Crispy veg patty with fresh veggies and sauce.",
    price: 150,
    image: "/images/burger.png",
    isVeg: true,
    category: "Burger",
  },
  {
    title: "Grilled Chicken Burger",
    description: "Juicy chicken patty with lettuce, mayo, and soft bun.",
    price: 170,
    image: "/images/burger.png",
    isVeg: false,
    category: "Burger",
  },
  {
    title: "Fried Chicken Burger",
    description: "Crispy fried chicken patty with lettuce and mayo.",
    price: 170,
    image: "/images/burger.png",
    isVeg: false,
    category: "Burger",
  },

  // 🍟 EXTRAS

  {
    title: "French Fries",
    description: "Classic crispy french fries.",
    price: 150,
    image: "/images/fries.png",
    isVeg: true,
    category: "Extras",
  },
  {
    title: "Hot Wings (6 pcs)",
    description: "Spicy hot chicken wings – 6 pieces.",
    price: 350,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Extras",
  },
  {
    title: "Chicken Popcorn",
    description: "Bite-sized crispy chicken popcorn.",
    price: 250,
    image: "/images/chicken.png",
    isVeg: false,
    category: "Extras",
  },

  // 🌯 WRAPS

  {
    title: "Tufani Chicken Wrap",
    description: "Grilled chicken with veggies and sauce in soft bread.",
    price: 0, // set price if available
    image: "/images/wrap.png",
    isVeg: false,
    category: "Wrap",
  },
  {
    title: "Tufani Paneer Wrap",
    description: "Spicy paneer with fresh veggies and creamy sauce.",
    price: 0, // set price if available
    image: "/images/wrap.png",
    isVeg: true,
    category: "Wrap",
  },
];

export default menu;
