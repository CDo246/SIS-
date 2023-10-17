import { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

export function CustomRoleDialog(props: {
  dialogOpenState: number;
  setDialogOpenState: React.Dispatch<React.SetStateAction<number>>;
  selectedRoleAgainst: string;
  setSelectedRoleAgainst: React.Dispatch<React.SetStateAction<string>>;
  selectedRoleFor: string;
  setSelectedRoleFor: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [warning, setWarning] = useState<string>("");
  const roleRef = useRef<null | HTMLInputElement>(null);
  const setSelectedRole =
    props.dialogOpenState == 1
      ? props.setSelectedRoleAgainst
      : props.setSelectedRoleFor;

  const handleClose = (confirm: boolean) => {
    if (confirm && roleRef.current?.value.trim() == "Custom...") {
      setWarning("You must enter a valid role.");
    } else {
      setWarning("");
      if (confirm && roleRef.current?.value.trim()) {
        setSelectedRole(roleRef.current?.value);
      } else setSelectedRole("");
      props.setDialogOpenState(0);
    }
  };
  return (
    <Dialog
      open={props.dialogOpenState != 0}
      onClose={() => handleClose(false)}
      className="relative z-50 dark:text-white"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="mx-auto lg:min-w-[600px] sm:min-w-[500px] max-w-xl rounded-lg bg-white dark:bg-gray-800 p-4">
          <div className="flex justify-between">
            <Dialog.Title className="text-lg font-bold pb-2 border-b-[1px]">
              Custom debater role
            </Dialog.Title>
            <button
              type="button"
              onClick={() => handleClose(false)}
              className="bg-gray-100/90 dark:bg-gray-700 hover:text-white shadow-xl bg-opacity-20 text-sm dark:text-gray-300 hover:bg-opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 w-9 px-0 ml-8 lg:ml-0 py-0"
            >
              <XMarkIcon className="min-w-9"></XMarkIcon>
            </button>
          </div>
          <Dialog.Description className="py-2">
            Enter a custom role for the{" "}
            {props.dialogOpenState == 1 ? "Against" : "For"} argument: <br />
          </Dialog.Description>
          <div className="lg:space-x-2 space-y-2 flex flex-col justify-center lg:flex-row">
            <label className="font-bold flex items-center">Custom Role:</label>
            <input
              autoFocus
              placeholder="Enter custom role here..."
              ref={roleRef}
              type="text"
              //   value={
              //     props.dialogOpenState == "Against"
              //       ? props.selectedRoleAgainst
              //       : props.selectedRoleFor
              //   }
              maxLength={42}
              //   onChange={(e) => {
              //     props.dialogOpenState == "Against"
              //       ? props.setSelectedRoleAgainst(e.target.value)
              //       : props.setSelectedRoleFor(e.target.value);
              //   }}
              onKeyUp={(e) => {
                if (e.key == "Enter" && !e.shiftKey) handleClose(true);
              }}
              className="text-black flex-grow rounded-md p-2 bg-sky-100"
            />
            <button
              onClick={() => handleClose(true)}
              className="flex h-9 items-center lg:self-center self-end bg-sky-700 w-min text-white"
            >
              <CheckIcon className="h-5 inline"></CheckIcon>Confirm
            </button>
          </div>
          <span className="text-red-500">{warning}</span>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
