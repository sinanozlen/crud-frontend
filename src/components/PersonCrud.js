import axios from "axios";
import { useEffect, useState } from "react";

function PersonCrud() {
  const [prsname, setPrsname] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState(""); 
  const [taskDate, setTaskDate] = useState(""); // Tarih state
  const [currentPersonId, setCurrentPersonId] = useState(null);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get("https://localhost:7031/api/Person/GetPerson");
      setPersons(result.data);
    } catch (err) {
      console.error("Error loading persons:", err);
      alert("Error loading persons: " + err.message);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7031/api/Person/AddPerson", {
        prsname: prsname,
        task: task,
        description: description,
        date: taskDate,  // Tarih ekleniyor
      });
      alert("Person added successfully!");
      setPrsname("");
      setTask("");
      setDescription("");  // Aciklamayi sifirla
      setTaskDate("");  // Tarihi sifirla
      Load();
    } catch (err) {
      console.error("Error adding person:", err);
      alert("Error adding person: " + err.message);
    }
  }

  function editPerson(person) {
    setPrsname(person.prsname);
    setTask(person.task);
    setDescription(person.description);  
    setTaskDate(person.date);  // Tarihi set et
    setCurrentPersonId(person.id);
  }

  async function deletePerson(id) {
    try {
      await axios.delete("https://localhost:7031/api/Person/DeletePerson/" + id);
      Load();
    } catch (err) {
      console.error("Error deleting person:", err);
      alert("Error deleting person: " + err.message);
    }
  }

  async function update(event) {
    event.preventDefault();
    if (!prsname || !task || !taskDate) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      // Onceki kayit silinmeli
      await axios.delete("https://localhost:7031/api/Person/DeletePerson/" + currentPersonId);
     
      await axios.post("https://localhost:7031/api/Person/AddPerson", {
        prsname: prsname,
        task: task,
        description: description,
        date: taskDate, 
      });

      alert("Person updated successfully!");
      setPrsname("");
      setTask("");
      setDescription("");  
      setTaskDate("");  
      setCurrentPersonId(null);
      Load();
    } catch (err) {
      console.error("Error updating person:", err);
      alert("Error updating person: " + err.message);
    }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Günlük Taskler</h1>
      <div className="container mx-auto mt-6">
        <div className="card bg-white shadow-lg p-6 rounded-lg">
          <div className="card-body">
            <form>
              <div className="form-control mb-4">
                <label className="label text-gray-700">
                  <span className="label-text font-semibold">Kişi İsmi</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered p-3 rounded-lg w-full border-gray-300"
                  id="prsname"
                  value={prsname}
                  onChange={(event) => setPrsname(event.target.value)}
                  placeholder="Kişi Adı Gir"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label text-gray-700">
                  <span className="label-text font-semibold">Görev</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered p-3 rounded-lg w-full border-gray-300"
                  id="task"
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                  placeholder="Görev Gir"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label text-gray-700">
                  <span className="label-text font-semibold">Açıklama</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered p-3 rounded-lg w-full border-gray-300"
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Açıklama Gir"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label text-gray-700">
                  <span className="label-text font-semibold">Tarih</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered p-3 rounded-lg w-full border-gray-300"
                  value={taskDate}
                  onChange={(event) => setTaskDate(event.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  className="btn btn-primary px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                  onClick={save}
                >
                  Kaydet
                </button>
                <button
                  className="btn btn-warning px-6 py-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none"
                  onClick={update}
                  disabled={!currentPersonId}
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <br />
      <div className="overflow-x-auto mt-6">
        <table className="table w-full table-striped table-hover">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Kişi İsmi</th>
              <th className="px-4 py-2 text-left text-gray-600">Görev</th>
              <th className="px-4 py-2 text-left text-gray-600">Açıklama</th> 
              <th className="px-4 py-2 text-left text-gray-600">Tarih</th>  
              <th className="px-4 py-2 text-left text-gray-600">Seçenekler</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id} className="hover:bg-gray-200">
                <td className="px-4 py-2">{person.prsname}</td>
                <td className="px-4 py-2">{person.task}</td>
                <td className="px-4 py-2">{person.description}</td>
                <td className="px-4 py-2">{new Date(person.date).toLocaleDateString()}</td> 
                <td className="px-4 py-2">
                  <button
                    className="btn btn-primary text-white px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none"
                    onClick={() => editPerson(person)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="btn btn-danger text-white ml-2 px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 focus:outline-none"
                    onClick={() => deletePerson(person.id)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PersonCrud;
