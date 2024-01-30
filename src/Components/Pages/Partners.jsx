import React from "react";
import binance from "../../assets/binance.PNG";
import trustwallet from "../../assets/trustwallet.PNG";
import okx from "../../assets/okx.PNG";
import bitpay from "../../assets/bitpay.PNG";

export const Partners = () => {
  return (
    <div className="dark:text-white sm:h-screen">
      <h2 className="mt-6 text-center text-2xl font-bold uppercase">
        Our partners
      </h2>
      <div className="grid grid-cols-5 sm:grid-cols-2 mt-12 gap-x-2 sm:gap-y-4">
        <div className="flex flex-row shadow-lg rounded items-center justify-center space-x-2 p-2 dark:bg-gray-800">
          <img src={binance} className="h-8 " alt="trustwallet logo" />
          <span>Binance</span>
        </div>
        <div className="flex flex-row shadow-lg rounded items-center justify-center space-x-2 p-2 dark:bg-gray-800">
          <img src={trustwallet} className="h-8 " alt="trustwallet logo" />
          <span>Trust Wallet</span>
        </div>
        <div className="flex flex-row shadow-lg rounded items-center justify-center space-x-2 p-2 dark:bg-gray-800">
          <img src={okx} className="h-8 " alt="Okx logo" />
          <span>OKX</span>
        </div>
        <div className="flex flex-row shadow-lg rounded items-center justify-center space-x-2 p-2 dark:bg-gray-800">
          <img src={bitpay} className="h-8 " alt="Bitpay logo" />
          <span>Bitpay</span>
        </div>
      </div>
    </div>
  );
};