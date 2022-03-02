import React, { useState } from "react";
import {
  ChevronDoubleLeftIcon,
  ExternalLinkIcon,
  EyeOffIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Sidebar from "@/components/Reader/Sidebar";

export default function Read() {
  const [show, setShow] = useState(true);
  const { items } = usePage().props;

  return (
    <Authenticated>
      <div className="h-screen">
        <div className="">
          <div className="flex">
            <Transition
              show={show}
              as="div"
              enter="transition-all ease-in duration-500"
              enterFrom="max-w-0 transition-all"
              enterTo="max-w-80 transition-all"
              leave="transition-all ease-out duration-500"
              leaveFrom="max-w-80 transition-all"
              leaveTo="max-w-0 transition-all"
            >
              {show && (
                <div
                  className={`${
                    show ? "w-80" : "max-w-0"
                  } relative border-r border-slate-100 px-3 pt-2`}
                >
                  <div className="absolute inset-y-0 -right-3 flex h-screen flex-col justify-center">
                    <button
                      type="button"
                      onClick={() => setShow(false)}
                      className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-slate-50"
                    >
                      <ChevronDoubleLeftIcon className=" h-4 w-4" />
                    </button>
                  </div>
                  <Sidebar />
                </div>
              )}
            </Transition>
            <div className="flex h-screen flex-1 flex-col overflow-y-scroll bg-white">
              {items &&
                items.map(({ title, id, published_at }) => (
                  <div
                    key={id}
                    className="sticky top-0 border-b border-slate-100 bg-slate-50/90  px-6 py-2 backdrop-blur-sm"
                  >
                    <div className="mx-auto flex max-w-3xl items-center justify-between">
                      <div className="truncate">
                        <h1 className="font-mono text-sm font-semibold text-slate-800">
                          {title}
                        </h1>
                        <h6 className="font-mono text-xs text-slate-400">
                          {new Date(published_at).toLocaleDateString()}
                        </h6>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 transition active:scale-95"
                        >
                          <StarIcon className="h-4 w-4 text-white" />
                        </button>
                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 transition active:scale-95"
                        >
                          <EyeOffIcon className="h-4 w-4 text-white" />
                        </button>
                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-slate-400 text-white hover:text-slate-200 active:scale-95"
                        >
                          <ExternalLinkIcon className="h-4 w-4 " />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="prose prose-cyan max-w-3xl self-center">
                hello..
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}

// function SidebarTabs() {
//   const accordianRef = useRef(null);
//   const { feeds } = usePage().props;
//   return (
//     <div className="sticky top-2">
//       <Tab.Group>
//         <Tab.List className="flex space-x-2 rounded-full border border-slate-100 bg-white p-1">
//           <Tab className="flex w-full items-center justify-center rounded-full border border-slate-100 bg-gradient-to-br from-slate-700 to-slate-800 py-2 font-mono text-sm font-semibold text-slate-100 transition hover:text-slate-200 active:scale-95">
//             <EyeIcon className="h-4 w-4 " />
//             <span className="sr-only">Unread Items</span>
//           </Tab>
//           <Tab className="flex w-full items-center justify-center rounded-full bg-gray-50 py-2 font-mono text-sm font-semibold text-slate-400 transition active:scale-95 active:text-cyan-500">
//             <CollectionIcon className="h-4 w-4" />
//             <span className="sr-only">All Items</span>
//           </Tab>
//         </Tab.List>
//         <Tab.Panels className="mt-4">
//           <Tab.Panel className="">
//             <div className="mx-2">
//               <Link
//                 href={unread_index_path()}
//                 className="block w-full rounded-lg bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100"
//               >
//                 All Unread
//               </Link>
//             </div>
//             <Disclosure as="div" defaultOpen className="mt-4">
//               {({ open }) => (
//                 <>
//                   <Disclosure.Button className="flex w-full items-center px-2">
//                     <ChevronRightIcon
//                       className={`${
//                         open ? "rotate-90" : ""
//                       } mr-1  h-4 w-4 transition-all `}
//                     />
//                     <span className="font-mono text-sm font-medium text-slate-800">
//                       All Feeds
//                     </span>
//                   </Disclosure.Button>
//                   <Transition
//                     as={Fragment}
//                     enter="transition-all ease-in duration-500"
//                     enterFrom="max-h-0 transition-all"
//                     enterTo="max-h-40 transition-all"
//                     leave="transition-all ease-out duration-500"
//                     leaveFrom="max-h-40 transition-all"
//                     leaveTo="max-h-0 transition-all"
//                   >
//                     <Disclosure.Panel
//                       as="div"
//                       className="mx-7 space-y-3 overflow-hidden"
//                     >
//                       <div ref={accordianRef} className="space-y-3 py-4">
//                         {feeds.map((feed) => (
//                           <Link
//                             href={feed_unread_index_path(feed.id)}
//                             className="flex items-center"
//                           >
//                             <span className="text-sm font-medium text-slate-700">
//                               {feed.name}
//                             </span>
//                             <span className="ml-auto font-mono text-xs font-semibold text-slate-400">
//                               {feed.unread}
//                             </span>
//                           </Link>
//                         ))}
//                       </div>
//                     </Disclosure.Panel>
//                   </Transition>
//                 </>
//               )}
//             </Disclosure>
//             <div className="flex items-center px-2">
//               <ChevronRightIcon className="mr-1 h-4 w-4" />
//               <span className="font-mono text-sm font-medium text-slate-800">
//                 Groups
//               </span>
//             </div>
//           </Tab.Panel>
//           <Tab.Panel>Content 2</Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   );
// }
