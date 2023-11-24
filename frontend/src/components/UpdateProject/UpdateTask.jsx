import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './update.css';
import { toast } from 'react-toastify';

const updateProject = () => {
  const navigate = useNavigate();
  const [name, setProjName] = useState('');
  const [detail, setDescp] = useState('');
  const [deadline, setDate] = useState('');
  const [status, setStatus] = useState('');

  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch(`/api/getTasksData/${id}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
        });
        //* get Task data from backend:
        const resdata = await resp.json();
        console.log(resdata);
        setProjName(resdata.name);
        setDescp(resdata.detail);
        setDate(resdata.deadline);
        setStatus(resdata.status);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  //? To Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/updateTask/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          detail,
          status,
          deadline,
        }),
      });

      if (!response.ok) {
        throw new Error('No Response');
      } else {
        const result = await response.json();
        if (result) {
          toast.success('Updated SuccessFully', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setProjName('');
          setDescp('');
          setDate('');
          setStatus('');
          navigate(-1);
        } else {
          toast.success('Updated SuccessFully', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          navigate(-1);
        }
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  return (
    <>
      <div>
        <button className="btn1">
          {' '}
          <NavLink to="/manager" className="linkRemove">
            Go Back
          </NavLink>
        </button>
      </div>
      <div className="wrap">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-12">
              <h4 className="text-center" style={{ color: 'grey' }}>
                Update Task:
              </h4>
              <form>
                <div className="row mt-5">
                  <div className="col-md-6 col-sm-10">
                    <label htmlFor="Name"> Task Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setProjName(e.target.value)}
                      placeholder="Task name"
                    />
                  </div>
                  <div className="col-md-6 col-sm-10">
                    <label htmlFor="Name"> Task Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={detail}
                      onChange={(e) => setDescp(e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6 col-sm-10">
                    <label htmlFor="Name"> Task DeadLine</label>
                    <input
                      type="date"
                      className="form-control"
                      value={deadline}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Deadline"
                    />
                  </div>
                  <div className="col-md-6 col-sm-10 mt-4">
                    <label htmlFor="status">Task status: </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      name="format"
                      id="format"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="Started"> Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-info mt-4 mb-4"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default updateProject;
