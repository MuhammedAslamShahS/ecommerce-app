import "./TopCategories.css";
import categoryImg from "../../assets/category.jpg";

const categories = [
  { id: 1, image: categoryImg, title: "All Products" },
  { id: 2, image: categoryImg, title: "Home & App" },
  { id: 3, image: categoryImg, title: "Fitness" },
  { id: 4, image: categoryImg, title: "Car Accessories" },
  { id: 5, image: categoryImg, title: "Fitness" },
  { id: 6, image: categoryImg, title: "Car Accessories" },
  { id: 7, image: categoryImg, title: "Fitness" },
];

const TopCategories = () => {
  return (
    <div className="TopCategories-main-container">
      <h1>Top Categories</h1>
      <p>Categories people love the most</p>

      <div className="TopCategories-slider">
        {categories.map((item) => (
          <div className="TopCategories-list-card" key={item.id}>
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;