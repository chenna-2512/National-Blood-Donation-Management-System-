// import React from 'react';

import Footer1 from "./Footer1";
import Heading from "./Heading";

const Readmore = () => {

  return (
    <>
    <Heading/>
        <div className="my-24 md:my-20 p-8 font-sans">
        <h1 className="text-3xl font-bold text-center mb-6">Why Blood Donation Matters</h1>

        <div className="text-lg space-y-4">
            <p>
            Blood donation is a life-saving act that supports emergency care, surgeries, cancer treatment, and more. With no artificial substitute for blood, donor support is essential.
            </p>
            <p>
            One unit of blood can be separated into components—red cells, plasma, and platelets—to treat different conditions. This makes each donation incredibly impactful.
            </p>
            <p>
            Not only does donating blood help others, but it also benefits you by reducing iron overload, improving heart health, and giving a sense of purpose.
            </p>
            <p className="text-center font-semibold">
            Below is a blood group compatibility chart to understand who can donate to whom:
            </p>
        </div>

        {/* Compatibility Table */}
        <div className="overflow-x-auto mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">🩸 Blood Group Compatibility</h2>
            <table className="table-auto w-full border border-gray-400 text-center">
            <thead className="bg-red-200">
                <tr>
                <th className="border px-4 py-2">Blood Group</th>
                <th className="border px-4 py-2">Can Donate To</th>
                <th className="border px-4 py-2">Can Receive From</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                <tr>
                <td className="border px-4 py-2 font-semibold">O-</td>
                <td className="border px-4 py-2">All groups</td>
                <td className="border px-4 py-2">O-</td>
                </tr>
                <tr>
                <td className="border px-4 py-2 font-semibold">O+</td>
                <td className="border px-4 py-2">O+, A+, B+, AB+</td>
                <td className="border px-4 py-2">O+, O-</td>
                </tr>
                <tr>
                <td className="border px-4 py-2 font-semibold">A-</td>
                <td className="border px-4 py-2">A+, A-, AB+, AB-</td>
                <td className="border px-4 py-2">A-, O-</td>
                </tr>
                <tr>
                <td className="border px-4 py-2 font-semibold">A+</td>
                <td className="border px-4 py-2">A+, AB+</td>
                <td className="border px-4 py-2">A+, A-, O+, O-</td>
                </tr>
                <tr>
                <td className="border px-4 py-2 font-semibold">B-</td>
                <td className="border px-4 py-2">B+, B-, AB+, AB-</td>
                <td className="border px-4 py-2">B-, O-</td>
                </tr>
                <tr>
                <td className="border px-4 py-2 font-semibold">B+</td>
                <td className="border px-4 py-2">B+, AB+</td>
                <td className="border px-4 py-2">B+, B-, O+, O-</td>
                </tr>
                <tr>
                <td className="border px-4 py-2 font-semibold">AB-</td>
                <td className="border px-4 py-2">AB+, AB-</td>
                <td className="border px-4 py-2">AB-, A-, B-, O-</td>
                </tr>
                <tr>
                <td className="border px-4 py-2 font-semibold">AB+</td>
                <td className="border px-4 py-2">AB+ only</td>
                <td className="border px-4 py-2">All groups</td>
                </tr>
            </tbody>
            </table>
        </div>

        <p className="mt-10 text-center text-xl font-semibold text-red-600">
            Remember: Your blood could be the lifeline someone’s waiting for.
        </p>
        </div>
        <Footer1/>
    </>
  );
};

export default Readmore;
