import React from 'react';
import './App.css';
import {CartIcon, CloseArrowIcon, StarIcon, PlusIcon, MinusIcon, ThumbsUpIcon, ThumbsDownIcon} from './Icons';

//colors
const colorWhite = '#EFEFEF';
// const colorBlack = '#0F0F0F';
const colorDarkGrey = '#383838';
const colorYellow = '#FFF59B';
const colorRed =  '#9E1800';

// const optionBG = '#F3F3F3';
// const optionBorder = '#E9E9E9';

// const reviewBG = '#EAEAEA';
// const reviewBorder = '#E2E2E2';

const currentProduct = {
  prodName: 'Your Product',
  prodId: 'your-product',
  opt: '',
  qty: 1,
};
const initInCart = [
  {
    prodName: 'Product 1',
    prodId: 'product-1',
    opt: 'opt-3',
    qty: 1,
  },
  {
    prodName: 'Product 2',
    prodId: 'product-2',
    opt: 'opt-2',
    qty: 3,
  },
];
class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      qty: currentProduct.qty,
      opt: currentProduct.opt,
      reviews: [1, 2],
      itemsInCart: [...initInCart],
    };

    this.prodName = currentProduct.prodName;
    this.prodId = currentProduct.prodId;

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleInput = this.handleInput.bind(this);
  };

  handleAddToCart() {
    const item = {
      prodName: this.prodName,
      prodId: this.prodId,
      opt: this.state.opt,
      qty: this.state.qty,
    };
    this.setState({itemsInCart: [...this.state.itemsInCart].concat(item)});
  };

  //accepts index as id, type of input, and event as e
  handleInput(id, type, e) {
    if (id > -1) {
      //make a copy of the itemsInCart state array
      const itemArray = [...this.state.itemsInCart];
      //set object at array index's key to whatever was selected
      type === 'opt' ? itemArray[id].opt = e.target.value : itemArray[id].qty = e.target.value;
      //update state with new array
      this.setState({itemsInCart: itemArray});
      } else {
        this.setState({[type]: e.target.value});
      };
  };

  render () {
    let itemCount;
    //number of items in cart based on quantity present
    this.state.itemsInCart.forEach(item => {
      //increment if itemCount is set
      if (item.qty > 0 && itemCount) {
        itemCount += parseInt(item.qty);
      } else if (item.qty > 0) {
        //set
        itemCount = parseInt(item.qty);
      } else {
        itemCount = 0;
      };
    });
    return (
      <>
        <Header itemsInCart={this.state.itemsInCart} itemCount={itemCount} handleInput={this.handleInput}/>
        <Main prodName={this.prodName} prodId={this.prodId} qty={this.state.qty} opt={this.state.opt} handleAddToCart={this.handleAddToCart} handleInput={this.handleInput} reviews={this.state.reviews} />
        <Footer />
      </>
    );
  };
};

  //====================
  //Header
  //====================

  function Header(props) {
      return (
        <header>
          <Navbar itemCount={props.itemCount} />
          <Cart itemsInCart={props.itemsInCart} handleInput={props.handleInput} />
        </header>
      );
  };

    function Navbar(props) {
      return (
        <nav id="navbar">
          <ul id="nav-link-container">
            <li id="nav-home" className="links">
              <button type="button">Home</button>
            </li>
            <li id="nav-categories" className="links">
              <button type="button">Categories</button>
            </li>
            <NavCart itemCount={props.itemCount} />
          </ul>
        </nav>
      );
    };

      function NavCart(props) {
        return (
          <li id="nav-cart" className="links">
            <button type="button">
              <CartIcon fillColor={colorYellow} />
              <span>Cart ({props.itemCount.toString()})</span>
            </button>
          </li>
        );
      };

      function Cart(props) {
        return (
          <aside id="cart">
            <InCart itemsInCart={props.itemsInCart} handleInput={props.handleInput} />
            <Total price={10.50} />
            <CloseCart />
          </aside>
        );
      };

        function InCart(props) {
          const items = props.itemsInCart;
          const listItems = items.map((item, ind) => <CartProduct prodName={item.prodName} id={item.prodId} key={`cart-item-${ind}`} qty={item.qty} opt={item.opt} handleInput={props.handleInput} index={ind} />);
          return (
            <ol id="products-in-cart">
              {listItems}
            </ol>
          );
        };

          function CartProduct(props) {
            return (
              <li className="cart-products">
                <img src="https://picsum.photos/100/50?random=1" alt={`${props.prodName} thumbnail`} id={`cart-${props.id}-thumbnail`} className="thumbnails" />
                <h3 id={`cart-${props.id}-title`} className="titles">{props.prodName}</h3>
                <ProductForm id={`${props.id}-cart`} cart={true} qty={props.qty} opt={props.opt} handleInput={props.handleInput} index={props.index} />
              </li>
            );
          };

            function ProductForm(props) {
              return (
                <form id={`${props.id}-form`} className="forms">
                  <Options id={props.id} opt={props.opt} handleInput={props.handleInput} index={props.cart ? props.index : -1}/>
                  <Quantity id={props.id} qty={props.qty} handleInput={props.handleInput} index={props.cart ? props.index : -1}/>
                  {props.cart ? <RemoveItem id={props.id} /> : <AddToCart id={props.id} handleAddToCart={props.handleAddToCart} />}
                </form>
              );
            };

            function Quantity(props) {
              return (
                //conditionals if quantity is in cart or not
                <div id={`${props.id}-quantity-container`} className="quantities">
                  <label htmlFor={props.cart ? `${props.id}-cart-quantity` : `${props.id}-product-quantity`}>Qty {props.cart ? ' x' : '.'}</label>
                  {props.cart ? (
                    <input type="number" id={`${props.id}-quantity`} name={`${props.id}-quantity`} value={props.qty ? props.qty : 1} onChange={(e) => props.handleInput(props.index, 'qty', e)} min="1" max="9" required/>
                  ) : (
                    <>
                    <button type="button" className="icons quantity-decrease">
                      <MinusIcon fillColor={colorDarkGrey} />
                    </button>
                    <input type="number" id={`${props.id}-quantity`} name={`${props.id}-quantity`} value={props.qty ? props.qty : 1} onChange={(e) => props.handleInput(props.index, 'qty', e)} min="1" max="9" required/>
                    <button type="button" className="icons quantity-increase">
                      <PlusIcon fillColor={colorDarkGrey} />
                    </button>
                    </>
                  )}
                </div>
              );
            };

            function Options(props) {
              return (
                <div id={`${props.id}-options-container`} className="options">
                  <label htmlFor={`${props.id}-options`}>Options:</label>
                  <select id={`${props.id}-options`} name={`${props.id}-options`} value={props.opt} onChange={(e) => props.handleInput(props.index, 'opt', e)} required>
                    <option value="" disabled>Choose</option>
                    <option value="opt-1">Option 1</option>
                    <option value="opt-2">Option 2</option>
                    <option value="opt-3">Option 3</option>
                  </select>
                </div>
              );
            };

            function RemoveItem(props) {
              return (
                <button type="button" id={`remove-${props.id}`} className="remove-items">Rmv</button>
              );
            };

        function Total(props) {
          const tax = (props.price * 1000) * (0.0825 * 1000 / 1000) / 1000;
          const finalTotal = (props.price * 100 / 100) + (tax * 100 / 100);
          return (
            <div id="cart-totals-container" className="cart-totals">
              <span id="cart-subtotal">Subtotal: ${props.price.toFixed(2)}</span>
              <span id="cart-tax">Tax: ${tax.toFixed(2)}</span>
              <span id="cart-final-total">Final Total: ${finalTotal.toFixed(2)}</span>
            </div>
          );
        };

        function CloseCart() {
          return (
            <button type="button" id="close-cart-button" className="icons">
              <CloseArrowIcon fillColor={colorDarkGrey} />
            </button>
          );
        };

  //====================
  //Main
  //====================
  function Main(props) {
    return (
      <main>
          <ProductInfo prodName={props.prodName} id={props.prodId} qty={props.qty} opt={props.opt} handleInput={props.handleInput} handleAddToCart={props.handleAddToCart} reviews={props.reviews} />
          <ReviewDisplay id={props.prodId} />
      </main>
    );
  };

    //=============
    //Product Info
    //=============
      function ProductInfo(props) {
        return (
          <section id={`${props.id}-info-container`} className="product-info">
            <h1 id={`${props.id}-title`} className="titles">{props.prodName}</h1>
            <figure id={`${props.id}-thumbnails`} className="thumbnails">
              <img src="https://picsum.photos/300/200?random=2" alt={`${props.prodName} main preview`} id={`${props.id}-main-image`} className="main-image" />
              <Thumbnails prodName={props.prodName} id={props.id} />
            </figure>
            <form>
              <Rating id={props.id} kind="info" />
            </form>
            <ReviewsLink id={props.id} reviewCount={props.reviews.length} />
            <Description id={props.id} />
            <Price id={props.id} price={10.50} />
            <ProductForm id={`${props.id}-product`} qty={props.qty} opt={props.opt} handleInput={props.handleInput} handleAddToCart={props.handleAddToCart}/>
          </section>
        );
      };

        function Thumbnails(props) {
          return (
            <div id={`${props.id}-sub-thumbnails`} className="sub-thumbnails">
              <SubThumbnail prodName={props.prodName} id={`${props.id}-1`} />
              <SubThumbnail prodName={props.prodName} id={`${props.id}-2`} />
              <SubThumbnail prodName={props.prodName} id={`${props.id}-3`} />
            </div>
          );
        };

          function SubThumbnail(props) {
            return (
              <button type="button" id={props.id} className="sub-thumbnail link">
                <img src="https://picsum.photos/100/50?random=3" alt={`${props.prodName} thumbnail`} />
              </button>
            );
          };

        function Rating(props) {
          return (
            //conditional for avg or user
            <div id={`${props.id}-${props.user ? props.user : props.kind}-rating`} className="rating">
              <Star id={props.id} kind={props.kind} num={1} />
              <Star id={props.id} kind={props.kind} num={2} />
              <Star id={props.id} kind={props.kind} num={3} />
              <Star id={props.id} kind={props.kind} num={4} />
            </div>
          );
        };

          function Star(props) {
            return (
              <i id={`${props.id}-${props.kind}-star-${props.num.toString()}`} className={`${props.kind}-star stars`}>
                <StarIcon fillColor={props.kind === 'avg' ? colorDarkGrey : colorRed} />
              </i>
            );
          };

        function ReviewsLink(props) {
          return (
            <button type="button" id={`${props.id}-reviews-link`} className="links">
              Reviews ({props.reviewCount.toString()})
            </button>
          );
        };

        function Description(props) {
          const productDescription = `This a description of your product. It’s very cool and very affordable. You’ll be the envy of all your friends should you buy this product. It’s THAT good.`;
          return (
            <p id={`${props.id}-description`} className="paragraphs">
              {productDescription}
            </p>
          );
        };

        function Price(props) {
          return (
            <span id={`${props.id}-price`} className="prices">
              ${props.price.toFixed(2)}
            </span>
          );
        };

        function AddToCart(props) {
          return (
            <button type="button" id={`${props.id}-add-to-cart-button`} className="add-to-cart buttons" onClick={() => props.handleAddToCart()}>
              <span>Add to Cart</span>
              <i>
                <CartIcon fillColor={colorWhite} />
              </i>
            </button>
          );
        };

    //=============
    //Reviews
    //=============
    function ReviewDisplay(props) {
      return (
        <section id={`${props.id}-reviews-display`} className="review-displays">
          <ProductReviews id={props.id} />
          <WriteProductReview id={props.id} />
        </section>
      );
    };

      function ProductReviews(props) {
        return (
          <section id={`${props.id}-reviews`} className="product-reviews">
            <h2 className="titles">Reviews</h2>
            <div>
              <Rating id={props.id} kind="avg" />
              <span>Avg Ratings</span>
            </div>
            <form id="my-rating">
              <Rating id={props.id} kind="user" />
              <label htmlFor="my-rating">Your Rating</label>
            </form>
            <Reviews id={props.id} />
          </section>
        );
      };

        function Reviews(props) {
          return (
            <section id={`${props.id}-user-reviews`} className="reviews-container">
              <Review id={props.id} user="username" reviewBody="I love this product sooooo much, what would I do without it??" />
              <Review id={props.id} user="troll" reviewBody="I didn’t use this product correctly and I HATE IT." />
            </section>
          );
        };

          function Review(props) {
            return (
              <article id={`${props.id}-${props.user}-review`} className="reviews">
                <h4 className="names">{props.user.toUpperCase()}</h4>
                <span className="dates">Date/Time</span>
                <p className="comments paragraphs">{props.reviewBody}</p>
                <Rating id={props.id} user={props.user} kind="user" />
                <Feedback id={props.id} user={props.user} />
              </article>
            );
          };

            function Feedback(props) {
              return (
                <div id={`${props.id}-${props.user}-feedback`} className="feedback">
                  <button type="button" className="thumbs-down">
                    <ThumbsDownIcon fillColor={colorRed} />
                  </button>
                  <button type="button" className="thumbs-up">
                    <ThumbsUpIcon fillColor={colorDarkGrey} />
                  </button>
                </div>
              );
            };

      function WriteProductReview(props) {
        return (
          <form id={`${props.id}-write-review-form`} className="write-review-form">
            <label htmlFor={`${props.id}-write-review-form`} className="titles">Write a Review</label>
            <WriteReview id={props.id} />
            <button type="submit">Submit</button>
          </form>
        );
      };

        function WriteReview(props) {
          return (
            <fieldset>
              <input type="text" id="write-username" name="username" minLength="1" maxLength="20" placeholder="Your Name" required/>
              <textarea name="review-body" id="write-review" cols="30" rows="10" placeholder="Max length 255 chars" />
              <Rating kind="user" />
            </fieldset>
          );
        };

  //====================
  //Footer
  //====================
  function Footer(props) {
    return (
      <footer>
        Site copyright <a href="https://www.kylejackson.dev">Kyle Jackson</a> 2019. All Rights Reserved.
      </footer>
    );
  }

export default App;
