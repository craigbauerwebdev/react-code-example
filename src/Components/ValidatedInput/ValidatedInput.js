import React, { Fragment } from "react";

import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";

export const ValidatedInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;

  return (
    <Fragment>
      <Input {...others} pattern='^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$' />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </Fragment>
  );
};
