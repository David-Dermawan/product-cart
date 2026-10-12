import { useState } from "react";

import FoodCard from "../../FoodCard";
import styles from "./Home.module.css";
import cheeseCake from "../../../assets/cheesecake.jpg";
import cheeseCakeBrownies from "../../../assets/cheesecake-brownies.jpg";
import brownies from "../../../assets/classic-brownies.jpg";
import tiramisu from "../../../assets/tiramisu.jpg";
import matchaCookies from "../../../assets/matcha-cookies.jpg";
import chocolateCookies from "../../../assets/chocolate-cookies.jpg";
import emptyCart from "../../../assets/illustration-empty-cart.svg";

export default function Home() {
  const [cart, setCart] = useState({});
  const totalQuantity = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingItem = prevCart[item.name];

      if (existingItem) {
        return {
          ...prevCart,
          [item.name]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      }

      return {
        ...prevCart,
        [item.name]: {
          name: item.name,
          detail: item.detail,
          price: item.price,
          quantity: 1,
        },
      };
    });
  }

  function handleDecreaseQuantity(item) {
    setCart((prevCart) => {
      const existingItem = prevCart[item.name];

      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[item.name];
        return updatedCart;
      }

      return {
        ...prevCart,
        [item.name]: {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        },
      };
    });
  }

  function handleRemoveItem(item) {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[item.name];
      return updatedCart;
    });
  }

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
              quantity={cart["Cheesecake"]?.quantity || 0}
              handleAddToCart={handleAddToCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />

            <FoodCard
              img={cheeseCakeBrownies}
              name="Cheesecake Brownies"
              detail="Chocolate Cheesecake Brownies"
              price="25"
              quantity={cart["Cheesecake Brownies"]?.quantity || 0}
              handleAddToCart={handleAddToCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />

            <FoodCard
              img={brownies}
              name="Brownies"
              detail="Classic Brownies"
              price="15"
              quantity={cart["Brownies"]?.quantity || 0}
              handleAddToCart={handleAddToCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />

            <FoodCard
              img={tiramisu}
              name="Tiramisu"
              detail="Classic Tiramisu"
              price="30"
              quantity={cart["Tiramisu"]?.quantity || 0}
              handleAddToCart={handleAddToCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />

            <FoodCard
              img={matchaCookies}
              name="Matcha Cookies"
              detail="White Chocolate Matcha Cookies"
              price="20"
              quantity={cart["Matcha Cookies"]?.quantity || 0}
              handleAddToCart={handleAddToCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />

            <FoodCard
              img={chocolateCookies}
              name="Chocolate Cookies"
              detail="Classic Chocolate Chip Cookies"
              price="20"
              quantity={cart["Chocolate Cookies"]?.quantity || 0}
              handleAddToCart={handleAddToCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />
          </div>
        </section>

        <aside className={styles.foodCart}>
          <h2 className={styles.cartTitle}>Your Cart ({totalQuantity})</h2>
          <div className={styles.emptyCartText}>
            {Object.keys(cart).length > 0 ? (
              <ul>
                {Object.values(cart).map((item) => (
                  <>
                    <li className={styles.cartItem} key={item.name}>
                      <div className={styles.cartItemInfo}>
                        <span className={styles.cartItemName}>
                          {item.detail}
                        </span>

                        <div className={styles.cartItemDetails}>
                          <span className={styles.cartItemQuantity}>
                            {item.quantity}x
                          </span>

                          <span className={styles.cartItemPrice}>
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={styles.removeItemButton}
                        onClick={() => handleRemoveItem(item)}
                      >
                        X
                      </button>
                    </li>
                    <hr className={styles.cartSeparator} />
                  </>
                ))}
                <div className={styles.cartTotal}>
                  <p className={styles.cartTotalText}>Order Total</p>
                  <p className={styles.cartTotalPrice}>
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <button className={styles.confirmOrderButton}>
                  Confirm Order
                </button>
              </ul>
            ) : (
              <>
                <img
                  className={styles.emptyCartImage}
                  src={emptyCart}
                  alt="Empty cart"
                />
                <p> Your added items will appear here</p>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
