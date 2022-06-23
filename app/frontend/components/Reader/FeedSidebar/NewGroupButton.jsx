import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import toast from "react-hot-toast";
import { PlusCircleIcon } from "@heroicons/react/solid";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Base/Button";
import Input from "@/components/Base/Input";
import Toast from "@/components/Toast";
import { groups_path } from "@/routes";
import { classNames } from "@/utils";

export default function NewGroupButton() {
  const [open, setOpen] = useState(false);

  const { data, setData, post, errors, processing, transform } = useForm({
    name: "",
  });

  function submit(e) {
    e.preventDefault();
    transform(() => ({
      group: { ...data },
    }));
    post(groups_path(), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        toast.custom((t) => (
          <Toast toast={t} icon="RefreshIcon" type="success">
            Group successfully created.
          </Toast>
        ));
      },
    });
  }

  return (
    <div className="">
      <button
        type="button"
        name="Add Group"
        onClick={() => setOpen(!open)}
        className="flex flex-shrink-0 items-center justify-center rounded "
      >
        <PlusCircleIcon
          className={classNames(
            "h-4 w-4 text-slate-800 transition hover:text-slate-700 active:scale-95",
            open && "rotate-45"
          )}
        />
      </button>
      <div className="">
        <Modal
          open={open}
          close={() => setOpen(false)}
          title="Create a Group"
          icon="FolderOpenIcon"
          subtitle="Organise your feeds."
          submit={() => submit()}
        >
          <form className="relative" onSubmit={submit}>
            <Input
              label="Group Name"
              value={data.name}
              type="text"
              onChange={(e) => setData("name", e.target.value)}
              name="Group Name"
              id="group-name"
              errors={errors.name}
            />

            <div className="pt-4 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <Button color="cyan" disabled={processing} type="submit">
                Create Group
              </Button>
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
