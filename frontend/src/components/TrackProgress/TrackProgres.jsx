import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useParams, useNavigate } from 'react-router-dom';

const TrackProgres = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Project, setClickProject] = useState([]);
  const [TaskDetail, setClickTask] = useState([{}]);
  const [clickDetail, setClickDetail] = useState(false);

  const showClickProject = async () => {
    try {
      const resp = await fetch(`/api/showClickProject/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      //* get data from backend:
      const resdata = await resp.json();
      setClickProject(resdata);
    } catch (err) {
      console.log(err);
    }
  };
  const showClickTasks = async (e) => {
    e.preventDefault();
    setClickDetail(true);
    try {
      const res = await fetch(`/api/showClickTask/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      //* get data from backend:
      const resdata = await res.json();
      if (TaskDetail.length === 0) {
        toast.warning('No Tasks to Show', {
          position: 'top-right',
          autoClose: 1000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
      } else {
        setClickTask(resdata);
      }
    } catch (err) {
      setClickDetail(false);
      console.log(err);
    }
  };
  useEffect(() => {
    showClickProject();
  }, []);

  const goBack = () => {
    navigate('/manager');
  };
  //to show tasks of given project:

  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => goBack()}
        >
          Go Back
        </button>
      </div>
      <div className="text-center mt-4">
        <h2>Tracking Progress </h2>
      </div>
      <div className="container-fluid mt-5">
        <div className="table-responsive">
          <table className="table table-info table-striped table-hover">
            <thead>
              <tr className="table-danger text-center">
                <th className="text-center" scope="col">
                  Project No#
                </th>
                <th className="text-center" scope="col">
                  Proj Name
                </th>
                <th className="text-center" scope="col">
                  Description
                </th>
                <th className="text-center" scope="col">
                  DeadLine
                </th>
                <th className="text-center" scope="col">
                  CreatorId#
                </th>
                <th className="text-center" scope="col">
                  TaskIds#
                </th>
              </tr>
            </thead>
            <tbody>
              {Project.map((project, index) => {
                const { name, description, deadline, creator_id } = project;
                return (
                  <tr key={index} className="table-info text-center">
                    <th className="text-center" scope="row">
                      {index + 1}
                    </th>
                    <td className="text-center">{name}</td>
                    <td className="text-center">{description}</td>
                    <td className="text-center">{deadline}</td>
                    <td className="text-center">{creator_id}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-success"
                        onClick={showClickTasks}
                      >
                        Show Detailed Tasks
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {clickDetail ? (
        <div>
          <div className="text-center mt-4">
            <h2>Detailed Task View</h2>
          </div>
          <div className="container-fluid mt-5">
            <div className="table-responsive">
              <table className="table table-info table-striped table-hover">
                <thead>
                  <tr className="table-success text-center">
                    <th className="text-center" scope="col">
                      Task No#
                    </th>
                    <th className="text-center" scope="col">
                      Task Name
                    </th>
                    <th className="text-center" scope="col">
                      Task Detail
                    </th>
                    <th className="text-center" scope="col">
                      DeadLine
                    </th>
                    <th className="text-center" scope="col">
                      status
                    </th>
                    <th className="text-center" scope="col">
                      userIds
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {TaskDetail.map((task, index) => {
                    const { name, detail, deadline, status, user_id } = task;
                    console.log(name, detail, deadline, status, user_id);
                    return (
                      <tr key={index} className="table-info text-center">
                        <th className="text-center" scope="row">
                          {index + 1}
                        </th>
                        <td className="text-center">{name}</td>
                        <td className="text-center">{detail}</td>
                        <td className="text-center">{deadline}</td>
                        <td className="text-center">{status}</td>
                        <td className="text-center">{user_id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TrackProgres;
