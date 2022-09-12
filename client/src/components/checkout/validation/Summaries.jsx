import { Link } from "react-router-dom";
import { UserAuth } from "../../../contexts/AuthContext";
import SummaryOrder from "../SummaryOrder";


export default function Summaries() {

    const { contextShipping,contextOrder } = UserAuth();
    const [shipping] = contextShipping;
    const [order] = contextOrder;

  console.log('userOrder',order);

  return (
    <>
      <div className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
          <img
            src="https://images.unsplash.com/photo-1494426383302-7b9d36a1a028?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="summaries"
            className="h-full w-full object-full"
          />
        </div>

        <div>
          <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">
                Paiement réussi
              </h1>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Merci pour la commande
              </p>
              <p className="mt-2 text-base text-gray-500">
                Nous apprécions votre commande, nous la traitons actuellement.
                Alors accrochez-vous et nous vous enverrons une confirmation
                très bientôt !
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Tracking number</dt>
                <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
              </dl>

              {/* <SummaryOrder /> */}

              <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping Address
                  </dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">{`${shipping?.firstname} ${shipping?.lastname}`}</span>
                      <span className="block">{shipping?.address}</span>
                      <span className="block">{`${shipping?.city} ${shipping?.zipcode}`}</span>
                      {shipping.apartment && (
                        <span className="block">{shipping?.apartment}</span>
                      )}
                      <span className="block">{shipping?.phone}</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Informations de paiement
                  </dt>
                  <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                    <div className="flex-auto">
                      <p>Paypal</p>
                      <p>{order.payer.email_address}</p>
                      <p className="text-gray-900">{`${order.payer.name.given_name}   ${order.payer.name.surname}`}</p>
                      <p>{order.payer.email_address}</p>
                      <p>{order.purchase_units[0].description}</p>
                      <p>{order.purchase_units[0].amount.value} €</p>
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link
                  to="/"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continuer vos achats <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
