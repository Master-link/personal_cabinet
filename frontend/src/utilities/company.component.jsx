import React, { useState, useEffect } from 'react';

const Company = () => {
  const [client, setClient] = useState();

  useEffect(() => {
    if (localStorage.getItem('currentClient') !== null) {
      setClient(
        JSON.parse(localStorage.getItem('currentClient'))
          .client,
      );
    }
  }, []);

  return <>{client && client.name}</>;
};

export default Company;
