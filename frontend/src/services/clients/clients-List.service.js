import React from 'react';

class ClientsList extends React.Component {

  constructor() {
    super();
  }

  getData(id) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    headers['Authorization'] = `Bearer `

    axios.get(
      process.env.REACT_APP_BACKEND+'/services/' + id,
      {
        headers,
        timeout: 10000
      }
    )
      .then(response => {
        this.setState({
          gettingData: true
        });
        this.setState({
          name: response.data.name,
          notify_expires_days: response.data.notify_expires_days,
          alert_template_email: response.data.alert_template_email
        })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({
          gettingData: true
        })
      });
  }
} 

export default ClientsList;