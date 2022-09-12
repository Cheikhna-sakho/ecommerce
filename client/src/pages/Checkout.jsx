import StepProgress from "../components/checkout/StepProgress";

export default function Checkout() {
  return (
    <div className="max-w-2xl mx-auto lg:max-w-none">
      <h1 className="sr-only">Checkout</h1>
      <StepProgress/>
    </div>
  );
}
