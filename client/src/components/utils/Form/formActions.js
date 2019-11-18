export const isFormValid = (formData, formName) => {
  let formIsValid = true;
  for(let key in formData){
    formIsValid = formData[key].valid && formIsValid
  }
  return formIsValid;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value;
  }
  return dataToSubmit;
};

export const validate = (element, formData = []) => {
  let error = [true, ""];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const msg = `${!valid ? "El email debe ser valido" : ""}`;
    error = !valid ? [valid, msg] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const msg = `${!valid ? "Campo requerido" : ""}`;
    error = !valid ? [valid, msg] : error;
  }

  return error;
};

export const update = (element, formData, formName) => {
  const newFormData = { ...formData };

  const newElement = { ...newFormData[element.id] };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormData[element.id] = newElement;

  return newFormData;
};
