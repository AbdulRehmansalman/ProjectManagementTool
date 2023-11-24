import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import './update.css';
import { toast } from 'react-toastify';

const updateProject = () => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState('');
  const [name, setProjName] = useState('');
  const [descp, setDescp] = useState('');
  const [deadline, setDate] = useState('');

  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch(`/api/getProject/${id}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
        });
        //* get Project data from backend:
        const resdata = await resp.json();
        console.log(resdata);
        setProjName(resdata.name);
        setDescp(resdata.description);
        setDate(resdata.deadline);
        setCreator(resdata.creator_id);
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
      const response = await fetch(`/api/updateProject/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          descp,
          creator,
          deadline,
        }),
      });

      if (!response.ok) {
        throw new Error('No Response');
      } else {
        const result = await response.json();
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
        setProjName('');
        setDescp('');
        setDate('');
        setCreator('');
        navigate('/manager');
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
                Update Project:
              </h4>
              <form>
                <div className="row mt-5">
                  <div className="col-md-6 col-sm-10">
                    <label htmlFor="Name"> Project Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setProjName(e.target.value)}
                      placeholder="Project name"
                    />
                  </div>
                  <div className="col-md-6 col-sm-10">
                    <label htmlFor="Name"> Project Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={descp}
                      onChange={(e) => setDescp(e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6 col-sm-10">
                    <label htmlFor="Name"> Project DeadLine</label>
                    <input
                      type="date"
                      className="form-control"
                      value={deadline}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Deadline"
                    />
                  </div>
                  <div className="col-md-6 col-sm-10">
                    <label htmlFor="creator"> Project Creator id # </label>
                    <input
                      type="text"
                      className="form-control"
                      value={creator}
                      onChange={(e) => setCreator(e.target.value)}
                      placeholder="Creator id"
                    />
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
