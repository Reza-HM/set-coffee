import swal from "sweetalert";

const showSwal = (title: string, icon: string, buttons: string[]) => {
  swal({ title, icon, buttons });
};

export { showSwal };
