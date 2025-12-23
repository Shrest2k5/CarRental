import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY || "₹"

  useEffect(() => {
    const selectedCar = dummyCarData.find(
      car => car._id.toString() === id
    )
    setCar(selectedCar)
  }, [id])

  if (!car) return <Loader />

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 w-full">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500"
      >
        <img
          src={assets.arrow_icon}
          alt="back"
          className="rotate-180 opacity-65"
        />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 w-full">

          {/* ✅ FULL IMAGE – NO CROPPING */}
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto object-contain rounded-xl shadow-md mb-6 bg-black"
          />

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} ● {car.year}
              </p>
            </div>

            <hr />

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-medium mb-3">Description</h2>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-medium mb-3">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror"
                ].map(item => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img
                      src={assets.check_icon}
                      className="h-4 mr-2"
                      alt=""
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – BOOKING */}
        <form className="shadow-lg h-max sticky top-20 rounded-xl p-6 space-y-6 text-gray-500">
          <p className="flex justify-between text-2xl font-semibold text-gray-800">
            {currency}{car.pricePerDay}
            <span className="text-base text-gray-400 font-normal">
              per day
            </span>
          </p>

          <hr />

          <div className="flex flex-col gap-2">
            <label>Pickup Date</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Return Date</label>
            <input
              type="date"
              required
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-xl">
            Book Now
          </button>

          <p className="text-center text-sm">
            No credit card required
          </p>
        </form>
      </div>
    </div>
  )
}

export default CarDetails
