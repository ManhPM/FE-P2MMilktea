import React from "react";

import classes from './ProductDetail.module.css'

const RawMaterialFood = () => {
    return (
        <section>
            <div className={classes['des-content']}>
                    <p>Although the legendary Double Burger really needs no introduction,
                       please allow us… Tucked in between three soft buns are two all-beef patties,
                       cheddar cheese, ketchup, onion, pickles and iceberg lettuce.
                       Hesburger’s own paprika and cucumber mayonnaise add the crowning touch. Oh baby!
                    </p>
                    <br/>
                    <p><strong>Ingredients:</strong> Dr. Praeger’s Black Bean Burger, Focaccia bun, Balsamic Vinaigrette, Pesto, Tomato, Swiss Cheese</p>
            </div>
                <div className={classes['ingredient-food']}>
                  <div className={classes['energy-food']}>
                    <div>
                        <h3>Pizza</h3>
                        <p>28 cm size</p>
                    </div>
                    <div>
                        <h2>728</h2>
                        <p>Energy/Kj</p>
                    </div>
                    <div>
                        <h2>1054</h2>
                        <p>energy/kcal</p>
                    </div>
                    <div>
                        <h2>68</h2>
                        <p>fat/g</p>
                    </div>
                    <div>
                        <h2>25</h2>
                        <p>gluxit /g</p>
                    </div>
                    <div>
                        <h2>48</h2>
                        <p>sugar/g</p>
                    </div>
                    <div>
                        <h2>548</h2>
                        <p>protein/g</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className={classes['raw-material']}>
                    <div>
                        <h3>Allergies</h3>
                    </div>
                    <div>
                        <p>Egg</p>
                    </div>
                    <div>
                        <p>milk protein</p>
                    </div>
                    <div>
                        <p>seasame</p>
                    </div>
                    <div>
                        <p>lactose</p>
                    </div>
                    <div>
                        <p>gluten</p>
                    </div>
                    <div>
                        <p>mustard</p>
                    </div>
                  </div>
                </div>
        </section>
    )
};

export default RawMaterialFood;