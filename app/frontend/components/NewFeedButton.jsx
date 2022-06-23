import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { feeds_path } from "@/routes";
import Input from "@/components/Base/Input";
import Button from "./Base/Button";
import IconButton from "./Base/IconButton";
import Modal from "@/components/Modal/Modal";

export default function NewFeedButton() {
  const [open, setOpen] = useState(false);

  const {
    data,
    setData,
    post,
    errors,
    processing,
    transform,
    reset,
    clearErrors,
  } = useForm({
    url: "",
    initially_fetch: "three_days_ago",
  });

  function closeModal() {
    reset();
    clearErrors();
    setOpen(false);
  }

  function submit(e) {
    e.preventDefault();
    transform(() => ({ feed: { ...data } }));

    post(feeds_path(), {
      onSuccess: () => {
        closeModal();
      },
    });
  }

  return (
    <div className="relative">
      <IconButton
        id="new-feed-button"
        label="Add new feed"
        icon="PlusIcon"
        color="darkSlate"
        onClick={() => setOpen(!open)}
      />

      <Modal
        open={open}
        close={() => setOpen(false)}
        title="Add a New Feed"
        icon="RssIcon"
        subtitle="Paste in a Feed URL."
        submit={() => submit()}
      >
        <form onSubmit={submit}>
          <div className="space-y-6">
            <Input
              label="Feed URL"
              value={data.url}
              type="text"
              onChange={(e) => setData("url", e.target.value)}
              name="name"
              id="name"
              errors={errors.url}
            />
            <div className="">
              <div className="relative rounded-lg border border-slate-300 px-3 py-2 focus-within:border-cyan-600 focus-within:ring-0 focus-within:ring-cyan-600">
                <label
                  htmlFor="initially-fetch"
                  className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-mono text-xs font-medium text-slate-800"
                >
                  Initially Fetch
                </label>
                <select
                  id="initially-fetch"
                  value={data.initially_fetch}
                  onChange={(e) => setData("initially_fetch", e.target.value)}
                  className="block w-full border-0 p-0 text-sm text-slate-800 placeholder-gray-500 focus:ring-0"
                >
                  <option value="one_day_ago">Last 24 Hours</option>
                  <option value="three_days_ago">Last 3 Days</option>
                  <option value="one_week_ago">Last 7 Days</option>
                  <option value="two_weeks_ago">Last 2 Weeks</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button color="cyan" disabled={processing} type="submit">
              Add Feed
            </Button>
            <Button type="button" onClick={() => closeModal()}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
