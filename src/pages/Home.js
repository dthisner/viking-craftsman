import React from 'react'

import Avatar from '../assets/profilePicture.png'
import Portfolio from '../data/portfolio.json'

const Home = () => {
  const current = Portfolio[0]

  return (
    <div
      className="container-fluid"
      style={{maxWidth: '1500px', paddingTop: '1rem'}}
    >
      <div className="row">
        <div className="col-md-3">
          <div>
            <div
              className="card shadow-sm p-3 mb-3 bg-white rounded"
              style={{width: '20rem'}}
            >
              <img src={Avatar} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Dennis Thisner</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Senior QA Engineer @ Apply Digital
                </h6>
                <p className="card-text">Vancouver, BC, Canada</p>
              </div>
            </div>
          </div>
          <div
            className="card shadow-sm p-3 mb-3 bg-white rounded"
            style={{width: '20rem'}}
          >
            <div className="card-header">Skills</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cypress (JS)</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
            </ul>
          </div>
        </div>
        <div className="col-md">
          <div className="card shadow-sm p-3 mb-3 bg-white rounded">
            <div className="card-body">
              <h5 className="card-title">
                {current.positions[0].role}- {current.company}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Since {current.startDate}
              </h6>

              <div className="card-text">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div
                        className="card shadow-sm p-3 mb-3 bg-white rounded"
                        style={{width: '29rem'}}
                      >
                        <div className="card-header">Responsibillities</div>
                        <ul className="list-group list-group-flush">
                          {renderList(
                            current.positions[0].responsibillities,
                            'resp',
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="col"></div>
                    <div
                      className="card shadow-sm p-3 mb-3 bg-white rounded"
                      style={{width: '29rem'}}
                    >
                      <div className="card-header">Tech</div>
                      <ul className="list-group list-group-flush">
                        {renderList(current.positions[0].tech, 'tech')}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const renderList = (list, name) => {
  return list.map((t, i) => {
    return (
      <li className="list-group-item" key={`${name}-${i}`}>
        {' '}
        - {t}
      </li>
    )
  })
}

export default Home
