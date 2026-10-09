import FoodCard from "../../FoodCard";
import styles from "./Home.module.css";
import cheeseCake from "../../../assets/cheesecake.jpg";
import cheeseCakeBrownies from "../../../assets/cheesecake-brownies.jpg";
import brownies from "../../../assets/brownies.jpg";
import tiramisu from "../../../assets/tiramisu.jpg";
import matchaCookies from "../../../assets/matcha-cookies.jpg";
import chocolateCookies from "../../../assets/chocolate-cookies.jpg";
import emptyCart from "../../../assets/illustration-empty-cart.svg";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.menuLayout}>
        <section className={styles.menuSection}>
          <h1 className={styles.sectionTitle}>Desserts</h1>
          <div className={styles.foodCards}>
            <FoodCard
              img={cheeseCake}
              name="Cheesecake"
              detail="Classic New York Cheesecake"
              price="20"
            />

            <FoodCard
              img={cheeseCakeBrownies}
              name="Cheesecake Brownies"
              detail="Chocolate Cheesecake Brownies"
              price="25"
            />

            <FoodCard
              img={brownies}
              name="Brownies"
              detail="Classic Brownies"
              price="15"
            />

            <FoodCard
              img={tiramisu}
              name="Tiramisu"
              detail="Classic Tiramisu"
              price="30"
            />

            <FoodCard
              img={matchaCookies}
              name="Matcha Cookies"
              detail="White Chocolate Matcha Cookies"
              price="20"
            />

            <FoodCard
              img={chocolateCookies}
              name="Chocolate Cookies"
              detail="Classic Chocolate Chip Cookies"
              price="20"
            />
          </div>
        </section>

        <aside className={styles.foodCart}>
          <h2 className={styles.cartTitle}>Your Cart</h2>
          <img
            className={styles.emptyCartImage}
            src={emptyCart}
            alt="Empty cart"
          />
          <p className={styles.emptyCartText}>
            Your added items will appear here
          </p>
        </aside>
      </div>
    </div>
  );
}
