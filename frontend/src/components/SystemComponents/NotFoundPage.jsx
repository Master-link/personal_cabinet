import React from 'react';

import './notfound.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="not_found">
      <center>
        <h1>404 Not Found</h1>
      </center>
      <hr />
      <span>nginx/1.10.3</span>
    </div>
  );
};
