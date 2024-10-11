import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../store/ItemsSlice";
import { fetchActions } from "../store/fetchItemSlice";
import summaryApi from "../comman";
 
const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    if (fetchStatus.fetchDone) return;

    dispatch(fetchActions.markFetchingstarted());
    
    const dataResponse = await fetch(summaryApi.getProduct.url,{
    method:summaryApi.getProduct.method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    }

    )

    const dataApi = await dataResponse.json();
    if(dataApi.success)
    {
        dispatch(fetchActions.markFetchingDone());

        dispatch(fetchActions.markFetchingFinished());

        dispatch(itemsAction.addInitialItems(dataApi?.data));
    }


   
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;

