// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function RegisterPage() {
//   const router = useRouter();

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [birthDate, setBirthDate] = useState('');
//   const [birthPlace, setBirthPlace] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = () => {
//     if (
//       !firstName ||
//       !lastName ||
//       !birthDate ||
//       !birthPlace ||
//       !email ||
//       !phone ||
//       !password
//     ) {
//       alert('Please fill all the fields.');
//       return;
//     }

//     // Add your registration logic here (API call, validation, etc.)
//     console.log({
//       firstName,
//       lastName,
//       birthDate,
//       birthPlace,
//       email,
//       phone,
//       password,
//     });

//     // After successful registration, redirect to login or quiz page
//     router.push('/login');
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

//         <input
//           type="text"
//           placeholder="First Name"
//           className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Last Name"
//           className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />

//         <input
//           type="date"
//           placeholder="Birth Date"
//           className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={birthDate}
//           onChange={(e) => setBirthDate(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Birth Place"
//           className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={birthPlace}
//           onChange={(e) => setBirthPlace(e.target.value)}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="tel"
//           placeholder="Phone Number"
//           className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleRegister}
//           className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
//         >
//           Register
//         </button>
//       </div>
//     </main>
//   );
// }
// 7777777777777
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const wilayas = [
  {"id":"1","code":"1","name":"Adrar"}, 
  {"id":"2","code":"2","name":"Chlef"}, 
  {"id":"3","code":"3","name":"Laghouat"},
  {"id":"4","code":"4","name":"Oum El Bouaghi"},
  {"id":"5","code":"5","name":"Batna"},
  {"id":"6","code":"6","name":"Béjaïa"},
  {"id":"7","code":"7","name":"Biskra"},
  {"id":"8","code":"8","name":"Bechar"},
  {"id":"9","code":"9","name":"Blida"},
  {"id":"10","code":"10","name":"Bouira"},
  {"id":"11","code":"11","name":"Tamanrasset"},
  {"id":"12","code":"12","name":"Tbessa"},
  {"id":"13","code":"13","name":"Tlemcen"},
  {"id":"14","code":"14","name":"Tiaret"},
  {"id":"15","code":"15","name":"Tizi Ouzou"},
  {"id":"16","code":"16","name":"Alger"},
  {"id":"17","code":"17","name":"Djelfa"},
  {"id":"18","code":"18","name":"Jijel"},
  {"id":"19","code":"19","name":"Se9tif"},
  {"id":"20","code":"20","name":"Saefda"},
  {"id":"21","code":"21","name":"Skikda"},
  {"id":"22","code":"22","name":"Sidi Bel Abbes"},
  {"id":"23","code":"23","name":"Annaba"},
  {"id":"24","code":"24","name":"Guelma"},
  {"id":"25","code":"25","name":"Constantine"},
  {"id":"26","code":"26","name":"Medea"},
  {"id":"27","code":"27","name":"Mostaganem"},
  {"id":"28","code":"28","name":"M'Sila"},
  {"id":"29","code":"29","name":"Mascara"},
  {"id":"30","code":"30","name":"Ouargla"},
  {"id":"31","code":"31","name":"Oran"},
  {"id":"32","code":"32","name":"El Bayadh"},
  {"id":"33","code":"33","name":"Illizi"},
  {"id":"34","code":"34","name":"Bordj Bou Arreridj"},
  {"id":"35","code":"35","name":"Boumerdes"},
  {"id":"36","code":"36","name":"El Tarf"},
  {"id":"37","code":"37","name":"Tindouf"},
  {"id":"38","code":"38","name":"Tissemsilt"},
  {"id":"39","code":"39","name":"El Oued"},
  {"id":"40","code":"40","name":"Khenchela"},
  {"id":"41","code":"41","name":"Souk Ahras"},
  {"id":"42","code":"42","name":"Tipaza"},
  {"id":"43","code":"43","name":"Mila"},
  {"id":"44","code":"44","name":"Ain Defla"},
  {"id":"45","code":"45","name":"Naama"},
  {"id":"46","code":"46","name":"Ain Temouchent"},
  {"id":"47","code":"47","name":"Ghardaefa"},
  {"id":"48","code":"48","name":"Relizane"},
  {"id":"49","code":"49","name":"El M'ghair"},
  {"id":"50","code":"50","name":"El Menia"},
  {"id":"51","code":"51","name":"Ouled Djellal"},
  {"id":"52","code":"52","name":"Bordj Baji Mokhtar"},
  {"id":"53","code":"53","name":"Béni Abbès"},
  {"id":"54","code":"54","name":"Timimoun"},
  {"id":"55","code":"55","name":"Touggourt"},
  {"id":"56","code":"56","name":"Djanet"},
  {"id":"57","code":"57","name":"In Salah"},
  {"id":"58","code":"58","name":"In Guezzam"}
];

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (
      !firstName ||
      !lastName ||
      !birthDate ||
      !birthPlace ||
      !email ||
      !phone ||
      !password
    ) {
      alert('Please fill all the fields.');
      return;
    }

    // Registration logic here
    console.log({
      firstName,
      lastName,
      birthDate,
      birthPlace,
      email,
      phone,
      password,
    });

    router.push('/login');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <input
          type="text"
          placeholder="First Name"
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="date"
          placeholder="Birth Date"
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <select
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
        >
          <option value="">Select Birth Place</option>
          {wilayas.map((w) => (
            <option key={w.id} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </div>
    </main>
  );
}
