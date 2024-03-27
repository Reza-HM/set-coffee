import swal from "sweetalert";

const showSwal = (
  title: string,
  icon: string | undefined,
  buttons: string[]
) => {
  swal({ title, icon, buttons });
};

export { showSwal };
