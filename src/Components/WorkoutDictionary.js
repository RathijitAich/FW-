import React, { useEffect, useState } from "react";



export const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  // Fetch workouts from the backend API
  useEffect(() => {
    fetch("http://localhost:8080/api/workouts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the data for debugging
        setWorkouts(data);
        setFilteredWorkouts(data); // Set filteredWorkouts initially to all workouts
      })
      .catch((error) => console.error("Error fetching workouts:", error));
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

   // Handle search button click to filter workouts
   const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = workouts.filter((workout) =>
      workout.workoutName.toLowerCase().includes(lowercasedQuery) ||
      workout.workoutDescription.toLowerCase().includes(lowercasedQuery)
    );
    
    setFilteredWorkouts(filtered);
  };


  // Handle sort by name button click
  const handleSortByName = () => {
    const sorted = [...filteredWorkouts].sort((a, b) =>
      a.workoutName.localeCompare(b.workoutName)
    );
    setFilteredWorkouts(sorted);
  };

  return (
    <div>
      
      

       

      <div className="container mb-4 mt-4">

         {/* Search bar */}
         <input
          type="text"
          placeholder="Search for a workout"
          className="form-control"
          value={searchQuery}
          onChange={handleSearchChange}
          
        />
        {/* Search button */}
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>

        
        {/* Sort button */}
        <button className="btn btn-secondary mt-2 ms-2" onClick={handleSortByName}>
          Sort by Name
        </button>
      </div>

      <div className="container">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout, index) => (
            <div className="card mb-4 shadow-sm" key={index}>
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-4">
                  <img
                    src={`/${workout.workoutName
                      .toLowerCase()
                      .replace(/\s/g, "_")}.png`} // Convert to lowercase and replace spaces
                    className="img-fluid rounded-start"
                    alt={workout.workoutName}
                    style={{ maxHeight: "150px", objectFit: "cover" }}
                  />
                </div>
                {/* Content Section */}
                <div className="col-md-8">
                  <div className="card-body" style={{ backgroundColor: "antiquewhite" }}>
                    <h5 className="card-title fw-bold">{workout.workoutName}</h5>
                    <p className="card-text">{workout.workoutDescription}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        <strong>Type:</strong> {workout.workoutType}
                        <br />
                        <strong>Target Muscle:</strong> {workout.targetMuscle || "General"}
                        <br />
                        <strong>Equipment:</strong> {workout.equipmentRequired || "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No workouts found!</p>
        )}
      </div>
    </div>
  );
};

export default Workouts;
