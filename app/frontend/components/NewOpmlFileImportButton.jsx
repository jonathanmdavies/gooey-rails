import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/inertia-react";
import toast from "react-hot-toast";
import { CloudUploadIcon } from "@heroicons/react/solid";
import { import_path } from "@/routes";
import Toast from "@/components/Toast";
import Button from "./Base/Button";

export default function NewOpmlFileImportButton() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const { data, setData, post, errors, processing } = useForm({
    opml_file: null,
  });

  function closeModal() {
    setOpen(false);
  }

  function submit(e) {
    e.preventDefault();
    post(import_path(), {
      onSuccess: () => {
        closeModal();
        toast.custom((t) => (
          <Toast toast={t} icon="CheckCircleIcon" type="success">
            Feeds Importing...
          </Toast>
        ));
      },
    });
  }

  return (
    <div className="relative">
      <Button
        type="button"
        onClick={() => setOpen(true)}
        icon="BookmarkAltIcon"
        color="darkSlate"
      >
        Import OPML
      </Button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => closeModal()}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Dialog.Overlay className="fixed inset-0 bg-slate-500 bg-opacity-50 backdrop-blur-sm transition-opacity " />
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <form
              onSubmit={submit}
              className="z-50 inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
            >
              <div className="border-b border-slate-200 bg-gradient-to-tl from-slate-100 to-slate-50 p-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500">
                  <CloudUploadIcon className="h-4 w-4 text-white" />
                </div>
                <div className="mt-2 sm:mt-4">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-medium text-slate-800"
                  >
                    Upload an OPML File
                  </Dialog.Title>
                  <div className="mt-px">
                    <p className="font-mono text-xs text-slate-500">
                      Select an OPML file to upload – we will process the file.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 p-6">
                <div className="">
                  <div className="relative rounded-lg border border-slate-300 px-3 py-2 focus-within:border-cyan-600 focus-within:ring-0 focus-within:ring-cyan-600">
                    <label
                      htmlFor="opml_file"
                      className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-mono text-xs font-medium text-slate-800"
                    >
                      OPML File
                    </label>

                    <input
                      type="file"
                      accept="application/xml"
                      onChange={(e) => setData("opml_file", e.target.files[0])}
                      name="opml_file"
                      id="opml_file"
                      className="w-full border-none border-cyan-500 p-2 text-xs text-slate-500  placeholder-gray-500 outline-none outline-1 ring-0 ring-transparent file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-2 file:py-1 file:text-xs file:text-white focus:outline-0"
                    />
                  </div>
                  {errors.opml_file && (
                    <div className="">{errors.opml_file}</div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <Button
                  disabled={processing || !data.opml_file}
                  color="cyan"
                  type="submit"
                >
                  Upload File
                </Button>

                <Button
                  ref={cancelButtonRef}
                  type="button"
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
