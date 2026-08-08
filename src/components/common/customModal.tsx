import type { SweetAlertOptions } from "sweetalert2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type modalProps = {
  options: SweetAlertOptions;
  onConfirmAction: (...args: any[]) => void;
};

export async function showModal({ options, onConfirmAction }: modalProps) {
  const modalRes = await withReactContent(Swal).fire(options);
  if (modalRes.isConfirmed) {
    onConfirmAction();
  }
}
