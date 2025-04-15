export default function MedicineList({ medicines }) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Medicine List</h2>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">SL</th>
              <th className="border px-4 py-2">Medicine Name</th>
            </tr>
          </thead>
          <tbody>
            {medicines && medicines.length > 0 ? (
              medicines.map((med, i) => (
                <tr key={med.id} className="text-center">
                  <td className="border px-4 py-2">{i + 1}</td>
                  <td className="border px-4 py-2">{med.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="border px-4 py-2 text-center text-gray-500">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  