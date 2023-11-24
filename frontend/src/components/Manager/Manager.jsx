import React, { useState, useContext, useEffect } from 'react';
import { ClipboardEdit } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { ShieldEllipsis } from 'lucide-react';
import { PlusCircle } from 'lucide-react';
import '../../App.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const Manager = () => {
  const [centredModal, setCentredModal] = useState(false);

  const [name, setProjName] = useState('');
  const [description, setDescp] = useState('');
  const [deadline, setDate] = useState('');

  const [Projdata, setProjData] = useState([{}]);

  const navigate = useNavigate();
  // for Display all projects
  const showProjects = async () => {
    try {
      const resp = await fetch('/api/userProjects', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
      });
      //* get data from backend:
      const resdata = await resp.json();
      setProjData(resdata);
      console.log(JSON.stringify(Projdata));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    showProjects();
  }, []);

  const toggleOpen = () => setCentredModal(!centredModal);

  const handleProject = async () => {
    try {
      const res = await fetch('/api/SaveProjects', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
        body: JSON.stringify({
          name,
          description,
          deadline,
        }),
      });

      const dataSaved = await res.json();
      console.log('The Data Saved is ' + dataSaved);
      if (!res.ok) {
        toast.warning('Fill all Valid Information', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        showProjects();
        setCentredModal(false);
        toast.success('Created SuccessFully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProject = async (_id) => {
    try {
      const resp = await fetch(`/api/deleteProjects/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      // Check if the deletion was successful based on the response Json

      const dataDeleted = await resp.json();
      if (dataDeleted) {
        showProjects();
        toast.success('Deleted SuccessFully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.error('Deleted Not SuccessFully', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const onButtonClickUpdate = (_id) => {
    navigate(`/updateProject/${_id}`);
  };
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
      <div className="text-center mt-2">
        <button
          type="button"
          className="btn col-sm-12 col-md-12 "
          onClick={toggleOpen}
        >
          Create Projects
        </button>
      </div>
      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog centered className="modal modal-lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create New Project</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <label htmlFor="title" className="label">
                {' '}
                Title:{' '}
              </label>
              <input
                className="mt-2"
                type="text"
                name="title"
                value={name}
                onChange={(e) => setProjName(e.target.value)}
              />
              <label htmlFor="title" className="label">
                {' '}
                Date:
              </label>
              <input
                className="mt-2"
                type="date"
                name="date"
                value={deadline}
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="title" className="label">
                {' '}
                Description:
              </label>
              <input
                className="mt-2"
                type="text"
                name="title"
                value={description}
                onChange={(e) => setDescp(e.target.value)}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <button type="button" className="btn" onClick={handleProject}>
                Create Projects
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <div className="flexwrap">
        {Projdata.map((project, index) => {
          const { name, description, deadline, creator_id } = project;
          return (
            <div key={index} className="main">
              <div className="card">
                <div className="btns mb-3">
                  <button
                    className="button"
                    onClick={() => onButtonClickUpdate(project._id)}
                  >
                    <ClipboardEdit color="#18f3f7" size="20px" />
                    <NavLink
                      to={`/updateProject/${project._id}`}
                      className="linkRemove"
                    >
                      Update
                    </NavLink>
                  </button>
                  <button
                    className="button"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    <Trash2 color="#c8330e" size="20px" />
                    Delete
                  </button>
                </div>
                <div className="card-title">
                  <h4>
                    Project Name: <span>{name}</span>
                  </h4>
                </div>
                <div className="small-desc">
                  <h4>
                    Proj Description: <span>{description}</span>
                  </h4>
                </div>
                <div className="small-desc">
                  <h4>
                    DeadLine: <span>{deadline}</span>
                  </h4>
                </div>
                <div className="card-title">
                  <h5>
                    Creater_id: <span>{creator_id}</span>
                  </h5>
                </div>
                <div className="btns">
                  <button className="Btn mb-2">
                    <PlusCircle color="#05ffc1" />
                    <NavLink
                      className="linkRemove"
                      to={`/createTask/${project._id}`}
                    >
                      Assign Task
                    </NavLink>
                  </button>
                  <button className="Btn mb-2">
                    <ShieldEllipsis color="#05ffc1" />
                    <NavLink
                      className="linkRemove"
                      to={`/progressTrack/${project._id}`}
                    >
                      Track Progress
                    </NavLink>
                  </button>
                </div>

                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Manager;
