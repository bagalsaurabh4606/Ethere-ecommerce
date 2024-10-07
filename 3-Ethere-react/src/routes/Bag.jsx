import Footer from "../components/Footer";
import Header from "../components/Header";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import summaryApi from "../comman";
import { useEffect, useState } from "react";
import { bagActions } from "../store/bagSlice";
const Bag = () => {
  const bagItems = useSelector((store) => store.bag.bagProducts);
  const items = useSelector((state) => state.items.products);

  const FinalItems = bagItems.map((bagItem) => {
    const correspondingItem = items.find((item) => item.id === bagItem.id);
    return {
      ...correspondingItem,
      quantity: bagItem.quantity,
    };
  });

  return (
    <>
      <main>
        {FinalItems.length === 0 ? (
          <Message></Message>
        ) : (
          <div className="bag-page">
            <div className="bag-items-container">
              {FinalItems.map((item) => (
                <BagItem item={item} key={item.id}></BagItem>
              ))}
            </div>

            <div className="bag-summary">
              {" "}
              <BagSummary FinalItems={FinalItems}></BagSummary>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Bag;
