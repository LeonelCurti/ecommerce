export const isFormValid = (formData, formName) => {
  let formIsValid = true;
  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }
  return formIsValid;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (key !== "confirmPassword") {
      dataToSubmit[key] = formData[key].value;
    }
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

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    const msg = `${!valid ? "Las contraseñas no coinciden" : ""}`;
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

export const populateOptionFields = (formdata, arrayData = [], field) => {
  const newArray = [];
  const newFormdata = { ...formdata };
  arrayData.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });
  newFormdata[field].config.options = newArray;
  return newFormdata
};

export const resetFields= (formData, formName)=>{
  const newFormData = {...formData};
  for(let key in newFormData){
    
    if (key==='images') {
      newFormData[key].value = [];      
    }else{
      newFormData[key].value = "";
    }

    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = '';
  }
  return newFormData
}

export const populateFields = (formData, fields)=>{
  for(let key in formData){
    formData[key].value = fields[key];
    formData[key].valid = true;
    formData[key].touched = true;
    formData[key].validationMessage = '';

  }
  return formData
}
