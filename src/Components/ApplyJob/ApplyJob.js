import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import styles from "../../CSS/ApplyJob.module.css";

class ApplyJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aadharNumber: "",
    };
  }

  handleChange = (event) => {
    let itemValue = event.target.value;
    this.setState({
      [event.target.name]: itemValue,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("From handleSubmit", this.state.aadharNumber);

    axios
      .post(
        `https://pacific-taiga-02637.herokuapp.com/jobs/${this.props.jobId}/apply`,
        {
          aadharNumber: this.state.aadharNumber,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const data = response.data;
          //   console.log(data);
          this.setState({ data });
          alert(`Your application has been sent.`);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      })
      .catch((error) => {
        alert(`Please register before applying!`);
        console.log(error);
        setTimeout(() => {
          window.location.href = "/user/register";
        }, 2000);
      });

    this.setState({
      aadharNumber: "",
    });
  };

  render() {
    const { aadharNumber } = this.state;
    const { handleClose } = this.props;

    return (
      <div className={styles.PopUpBox}>
        <div className={styles.Box}>
          <span className={styles.CloseIcon} onClick={handleClose}>
            x
          </span>
          <p>
            {" "}
            If you haven't registered yet, please
            <a href="/user/register"> register </a>
            before applying.
          </p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="aadharNumber"
                value={aadharNumber}
                placeholder="Enter your AADHAR Number"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button className={styles.Button} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default ApplyJob;
