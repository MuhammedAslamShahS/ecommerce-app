import "./TopCategories.css";
import categoryImg from "../../assets/category.jpg";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, image: categoryImg, title: "All Products", slug: "all" },
  { id: 2, image: categoryImg, title: "Men", slug: "men" },
  { id: 3, image: categoryImg, title: "Women", slug: "women" },
  { id: 4, image: categoryImg, title: "Kids", slug: "kids" },
  { id: 5, image: categoryImg, title: "Accessories", slug: "accessories" },
  { id: 6, image: categoryImg, title: "Jewellery", slug: "jewellery" },
  { id: 7, image: categoryImg, title: "Beauty & Grooming", slug: "beauty-grooming" },
];

const TopCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="TopCategories-main-container">
      <h1>Top Categories</h1>
      <p>Categories people love the most</p>

      <div className="TopCategories-slider">
        {categories.map((item) => (
          <div
            className="TopCategories-list-card"
            key={item.id}
            onClick={() => navigate(`/products/${item.slug}`)}
          >
            <img src={item.image} alt={item.title} />
            <div className="category-overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;