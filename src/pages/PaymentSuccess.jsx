import img from "../assets/payment-success.svg";
const PaymentSuccess = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center flex-col gap-8 my-5">
      <h1 className="text-primary font-bold text-xl">
        Thank you for your order!
      </h1>
      <img src={img} className="aspect-square max-w-[450px] w-full" />
    </div>
  );
};

export default PaymentSuccess;
