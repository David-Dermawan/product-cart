import styles from "./FoodCard.module.css";
import addToCart from "../../assets/icon-add-to-cart.svg";

export default function FoodCard({
  img,
  name,
  detail,
  price,
  quantity,
  handleAddToCart,
  handleDecreaseQuantity,
}) {
  return (
    <div className={styles.foodCard}>
      <div className={styles.foodImageContainer}>
        <img className={styles.foodImage} src={img} alt={detail} />
        {quantity === 0 ? (
          <button
            className={styles.addToCartButton}
            onClick={() => handleAddToCart({ name, price, detail })}
          >
            <img src={addToCart} />
            Add to Cart
          </button>
        ) : (
          <div className={styles.quantityContainer}>
            <button onClick={() => handleDecreaseQuantity({ name, price })}>
              -
            </button>

            <span>{quantity}</span>

            <button onClick={() => handleAddToCart({ name, price })}>+</button>
          </div>
        )}
      </div>
      <div className={styles.foodInfo}>
        <p className={styles.foodName}>{name}</p>
        <p className={styles.foodDetail}>{detail}</p>
        <p className={styles.foodPrice}>Rp{Number(price).toLocaleString()}</p>
      </div>
    </div>
  );
}
