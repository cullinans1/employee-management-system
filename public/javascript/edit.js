const employeeId = document.querySelector('input[name="employee-id"]').value;
const editFormHandler = async function (event) {
  event.preventDefault();

  const pto = document.querySelector('input[name="employee-pto"]').value;
  const holiday = document.querySelector('input[name="employee-holiday"]')
    .value;
  const sick = document.querySelector('input[name="employee-sick"]').value;

  await fetch(`/api/admin/edit/${employeeId}`, {
    method: "PUT",
    body: JSON.stringify({
      pto,
      holiday,
      sick,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("Sucess!");
  document.location.replace("/admin-dashboard");
};

const confirmDelete = function (event) {
  event.preventDefault();
  document.querySelector('#danger-btn').setAttribute('class', 'btn btn-danger');
  document.querySelector('#delete-btn').setAttribute('class', 'hidden');
};
const deleteClickHandler = async function () {
  await fetch(`/api/admin/${employeeId}`, {
    method: "DELETE",
  });
  alert('Employee Deleted');
  document.location.replace("/admin-dashboard");
};

document
  .querySelector("#edit-employee-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", confirmDelete);
document
  .querySelector("#danger-btn")
  .addEventListener("click", deleteClickHandler);
