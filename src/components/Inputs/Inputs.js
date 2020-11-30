import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/store';
import './Inputs.css';

export const Inputs = ({ query, perPage }) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(actions.change(event.target.name, event.target.value))
  }
  
  const handleSubmit = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
    }
  }

  return (
    <Form className="d-flex justify-content-between">
      <Form.Group>
        <Form.Control
          name="query"
          className="input"
          type="search"
          value={query}
          onChange={handleChange}
          onKeyPress={handleSubmit}
          placeholder="Search"
        />
      </Form.Group>
      <Form.Group className="d-flex align-items-center">
        <Form.Label className="my-0 mx-2">Count:</Form.Label>
        <Form.Control
          className="count input"
          as="select"
          value={perPage}
          onChange={handleChange}
          name="perPage"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}
