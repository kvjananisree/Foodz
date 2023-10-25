import React, { useEffect } from 'react';
import { getRestaurants,sortByRatings,sortByReviews,toggleVegOnly} from '../actions/restaurantAction';
import Restaurant from '../components/Restaurant';
import Loader from '../components/Layouts/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import CountRestaurant from './Layouts/CountRestaurant';

const Home = () => {
  const dispatch = useDispatch();
  const {
    loading: restaurantsLoading,
    error: restaurantsError,
    restaurants, // Corrected the property name
    showVegOnly,
  } = useSelector((state) => state.restaurants); // Corrected the property name

  useEffect(() => {
    if (restaurantsError) {
      return alert.error(restaurantsError); // Changed to console.error
    }
    dispatch(getRestaurants());
  }, [dispatch, restaurantsError]);

  const handleSortByRatings=()=>{
    dispatch(sortByRatings());
  };

  const handleSortByReviews=()=>{
    dispatch(sortByReviews());
  };

  const handleToggleVegOnly=()=>{
    dispatch(toggleVegOnly());
  };

  return (
    <>
    <CountRestaurant/>
      {restaurantsLoading ? (
        <Loader />
      ) : restaurantsError ? (
        <Message variant="danger">{restaurantsError}</Message>
      ) : (
        <>
          <section>
            <div className='sort'>
              <button className='sort_veg p-3' onClick={handleToggleVegOnly}>
                {showVegOnly?"show All": "Pure Veg"}
              </button>
              <button  className="sort_rev p-3" onClick={handleSortByReviews}>Sort By Reviews</button>
              <button className='sort_rate p-3' onClick={handleSortByRatings}>Sort  By Ratings</button>


            </div>
            <div className="row mt-4">
              { restaurants && restaurants.restaurants ? (
                restaurants.restaurants.map((restaurant) =>
                !showVegOnly ||(showVegOnly && restaurant.isVeg)? (
                  <Restaurant key={restaurant._id} restaurant={restaurant} /> // Corrected the property name
                ):null
                )
              ) : (
                <Message variant="info">No restaurants Found.</Message> // Corrected the text
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;



