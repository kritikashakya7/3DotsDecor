import img from "../assets/payment-error.svg";
const PaymentFail = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center flex-col gap-8 my-5">
      <h1 className="text-primary font-bold text-xl">
        Oops! your payment was not completed!
      </h1>
      <img src={img} className="aspect-square max-w-[450px] w-full" />
    </div>
  );
};

export default PaymentFail;
