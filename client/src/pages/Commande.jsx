import React from 'react'

const Commande = () => {
    const track = JSON.parse(localStorage.getItem("track"))
  return (
    <div className="relative lg:min-h-full">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
        <div className="lg:col-start-2">
          <h1 className="text-sm font-medium text-indigo-600">
            Commande
          </h1>
        
          <p className="mt-2 text-base text-gray-500">
           Suivi
          </p>

          <dl className="mt-16 text-sm font-medium">
            <dt className="text-gray-900">{track.tracker_url}</dt>
            <dd className="mt-2 text-indigo-600">{track.orderId}</dd>
          </dl>

          {/* <SummaryOrder /> */}

          <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
              <dt className="font-medium text-gray-900">
                Informations de paiement
              </dt>
              <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                <div className="flex-auto"></div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Commande