import styles from "./FoodCard.module.css";

export default function FoodCard({ img, name, detail, price }) {
  return (
    <div className={styles.foodCard}>
      <img className={styles.foodImage} src={img} alt={detail} />

      <p className={styles.foodName}>{name}</p>
      <p className={styles.foodDetail}>{detail}</p>
      <p className={styles.foodPrice}>{price}</p>
    </div>
  );
}
