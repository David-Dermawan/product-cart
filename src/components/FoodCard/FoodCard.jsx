import styles from "./FoodCard.module.css";
import addToCart from "../../assets/icon-add-to-cart.svg";

export default function FoodCard({ img, name, detail, price }) {
  return (
    <div className={styles.foodCard}>
      <div className={styles.foodImageContainer}>
        <img className={styles.foodImage} src={img} alt={detail} />
        <button className={styles.addToCartButton}>
          <img src={addToCart} />
          Add to Cart
        </button>
      </div>
      <div className={styles.foodInfo}>
        <p className={styles.foodName}>{name}</p>
        <p className={styles.foodDetail}>{detail}</p>
        <p className={styles.foodPrice}>${Number(price).toFixed(2)}</p>
      </div>
    </div>
  );
}
