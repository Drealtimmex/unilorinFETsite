import React from 'react'

const page = () => {
  return (
    <div id="mainDashboard" className="main-container">
      <main className="content-area">

        {/* admin panel */}
        <div
          id="adminPanel"
          className="p-4 rounded-3 shadow-sm mb-4"
        >
          <h2 className="h5 mb-4 fw-bold">Admin Panel</h2>

          <div className="mb-4 pb-4 border-bottom">
            <h3 className="h6 fw-bold">Switch Admin Role</h3>
            <div className="row g-2 mb-2">
              <div className="col-md-6">
                <select className="form-select" id="switchAdminRoleSelect">
                  <option value="HOD">HOD</option>
                  <option value="Level Adviser">Level Adviser</option>
                  <option value="Faculty Officer">Faculty Officer</option>
                  <option value="Dean">Dean</option>
                  <option value="Sub-Dean">Sub-Dean</option>
                  <option value="Faculty President">Faculty President</option>
                  <option value="Faculty PRO">Faculty PRO</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select" id="switchAdminLevelSelect">
                  <option value="All">All Levels</option>
                  <option value="100">100-level</option>
                  <option value="200">200-level</option>
                  <option value="300">300-level</option>
                  <option value="400">400-level</option>
                  <option value="500">500-level</option>
                </select>
              </div>
            </div>
            <button id="switchRoleBtn" className="btn btn-primary w-100 fw-bold">
              Update Role
            </button>
          </div>

          <h3 className="h6 mb-4 fw-bold">Post New Notification</h3>
          <form id="postForm">
            <div className="mb-3">
              <label className="form-label">Title</label> 
              <input
                type="text"
                className="form-control"
                id="postTitle"
                placeholder="e.g., Test Tomorrow"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Body</label>
              <textarea
                className="form-control"
                id="postBody"
                placeholder="e.g., Thermodynamics className is cancelled today."
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Department</label>
              <select className="form-select" id="postDepartment">
                <option value="All Department">All Department</option>
                <option value="Agricultural and Bio Systems Engineering">
                  Agricultural and Bio Systems Engineering
                </option>
                <option value="Water Resources and Environmental Engineering">
                  Water Resources and Environmental Engineering
                </option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Food Engineering">Food Engineering</option>
                <option value="Computer Engineering">
                  Computer Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Biomedical Engineering">
                  Biomedical Engineering
                </option>
                <option value="Material and Metallurgical Engineering">
                  Material and Metallurgical Engineering
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label"
                >Expiration Date</label
              >
              <input type="date" className="form-control" id="postExpirationDate" />
            </div>
            <button type="submit" className="btn btn-post w-100 fw-bold">
              Post Notification
            </button>
          </form>
        </div>


        {/* department tab */}
        <div
          id="departmentTabs"
          className="department-tabs d-flex justify-content-start flex-wrap mb-4"
        >
          <button className="btn m-1 active" data-dept="All">All</button>
          <button
            className="btn m-1"
            data-dept="Agricultural and Bio Systems Engineering"
          >
            Agricultural and Bio Systems Engineering
          </button>
          <button
            className="btn m-1"
            data-dept="Water Resources and Environmental Engineering"
          >
            Water Resources and Environmental Engineering
          </button>
          <button className="btn m-1" data-dept="Chemical Engineering">
            Chemical Engineering
          </button>
          <button className="btn m-1" data-dept="Food Engineering">
            Food Engineering
          </button>
          <button className="btn m-1" data-dept="Computer Engineering">
            Computer Engineering
          </button>
          <button className="btn m-1" data-dept="Electrical Engineering">
            Electrical Engineering
          </button>
          <button className="btn m-1" data-dept="Civil Engineering">
            Civil Engineering
          </button>
          <button className="btn m-1" data-dept="Mechanical Engineering">
            Mechanical Engineering
          </button>
          <button className="btn m-1" data-dept="Biomedical Engineering">
            Biomedical Engineering
          </button>
          <button
            className="btn m-1"
            data-dept="Material and Metallurgical Engineering"
          >
            Material and Metallurgical Engineering
          </button>
        </div>



        {/* available notification */}
        <div id="notificationList">
          <div className="text-center text-muted p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading notifications...</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default page
