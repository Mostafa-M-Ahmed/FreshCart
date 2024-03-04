import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import CounterContextProvider from './Context/TokenContext';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CartContextProvider from './Context/CartContext';
import WishlistContextProvider from './Context/WishlistContext';
import { Toaster } from 'react-hot-toast';



const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * (60 * 1000),
      refetchOnWindowFocus: false,
    }
  }
})

root.render(
  <WishlistContextProvider>
    <CartContextProvider>
      <QueryClientProvider client={queryClient}>
        <CounterContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CounterContextProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools> */}
      </QueryClientProvider>
    </CartContextProvider>
  </WishlistContextProvider>
);
