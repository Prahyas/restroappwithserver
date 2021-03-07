import React, { Fragment } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import TableErrorNotice from "./TableErrorNotice";

const AddTables = ({
  table,
  handleInputChange,
  handleSubmit,
  error,
  setError,
}) => {
  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        {error && (
          <TableErrorNotice
            message={error}
            clearError={() => setError(undefined)}
          />
        )}
        <FormGroup>
          <Label for="exampleEmail">Table Name</Label>
          <Input
            type="input"
            name="tableName"
            value={table.tableName}
            onChange={handleInputChange}
          />
        </FormGroup>
      </Form>
    </Fragment>
  );
};

export default AddTables;
