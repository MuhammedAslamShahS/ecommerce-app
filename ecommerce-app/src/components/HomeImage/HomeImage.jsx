import { useEffect, useRef, useState } from "react";
import "./HomeImage.css";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    title: "Premium Fashion",
    subtitle: "Discover timeless styles",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    title: "New Arrivals",
    subtitle: "Latest trends for you",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80",
    title: "Luxury Collection",
    subtitle: "Elevate your style",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    title: "Premium Fashion",
    subtitle: "Discover timeless styles",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    title: "New Arrivals",
    subtitle: "Latest trends for you",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80",
    title: "Luxury Collection",
    subtitle: "Elevate your style",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1592878849122-5b1c6b6f1e3b?auto=format&fit=crop&w=1600&q=80",
    title: "Men’s Belts",
    subtitle: "Refined accessories for every outfit",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1600&q=80",
    title: "Perfume Collection",
    subtitle: "Signature scents for every moment",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    title: "Kids Wear",
    subtitle: "Comfort and style for little ones",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1600&q=80",
    title: "Watches",
    subtitle: "Timeless elegance on your wrist",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67ddaf?auto=format&fit=crop&w=1600&q=80",
    title: "Footwear",
    subtitle: "Step into style and comfort",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1600&q=80",
    title: "Sunglasses",
    subtitle: "Upgrade your everyday look",
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1583009021823-7c6c7a4a8c2b?auto=format&fit=crop&w=1600&q=80",
    title: "Handbags",
    subtitle: "Carry style wherever you go",
  },
];

const sliderData = [slides[slides.length - 1], ...slides, slides[0]];

const HomeImage = () => {
  const [index, setIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    stopAutoSlide();

    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();

    return () => stopAutoSlide();
  }, []);

  const handleTransitionEnd = () => {
    if (index === sliderData.length - 1) {
      setTransitionEnabled(false);
      setIndex(1);
    }

    if (index === 0) {
      setTransitionEnabled(false);
      setIndex(slides.length);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });

      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  const prevSlide = () => {
    stopAutoSlide();
    setIndex((prev) => prev - 1);
    startAutoSlide();
  };

  const nextSlide = () => {
    stopAutoSlide();
    setIndex((prev) => prev + 1);
    startAutoSlide();
  };

  const goToSlide = (slideIndex) => {
    stopAutoSlide();
    setIndex(slideIndex + 1);
    startAutoSlide();
  };

  const activeDotIndex =
    index === 0
      ? slides.length - 1
      : index === sliderData.length - 1
      ? 0
      : index - 1;

  return (
    <section className="home-image">
      <div
        className="home-image-track"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transitionEnabled ? "transform 0.7s ease-in-out" : "none",
        }}
      >
        {sliderData.map((item, i) => (
          <div className="home-image-slide" key={`${item.id}-${i}`}>
            <img src={item.image} alt={item.title} />
            <div className="overlay" />

            <div className="content">
              <p>{item.subtitle}</p>
              <h1>{item.title}</h1>
              <button>Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>

      <button className="arrow right" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === activeDotIndex ? "dot active" : "dot"}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeImage;