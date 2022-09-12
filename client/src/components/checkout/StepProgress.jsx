import React, { useEffect, useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { UserAuth } from "../../contexts/AuthContext";
import Delivery from "./delivery/Delivery";
import Information from "./information/Information";
import Payment from "./payment/Payment";
import Stepper from "./steps/Stepper";
import StepperControl from "./steps/StepperControl";
import Validation from "./validation/Validation";

const StepProgress = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [nextStep, setNextStep] = useState(false);
   const { contextShipping } = UserAuth();
  const [shipping] = contextShipping;
  

  const control = [
    {
      name: "Account Information",
      icone: <BsFacebook />,
      componant: <Information />,
      next: nextStep,
    },
  ];

  const steps = [
    "Account Information",
    "Delevry",
    "Payment",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Information />;
      case 2:
        return <Delivery />;
      case 3:
        return <Payment handleClick={handleClick} />;
      case 4:
        return <Validation />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
   
    if (direction === "next") {
      if (!shipping) return;
      newStep++;
    }
    else newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };


  useEffect(() => {
    if (shipping) {
      setNextStep(true);
    }
  }, [shipping]);
  
  return (
    <div className="mx-auto">
      {/* Stepper */}
      <div className="horizontal container">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="my-10 p-10 ">{displayStep(currentStep)}</div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
};

export default StepProgress;
