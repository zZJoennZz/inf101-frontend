import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./clients.scss";

import { PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";

//components
import ClientList from "../../components/ClientsList/ClientsList";
import Modal from "../../components/Modal";
import ClientPagination from "../../components/ClientPagination";
import ContentLoading from "../../components/ContentLoading";

import { getClients, delClient } from "../../functions/apiCalls";

import NewClient from "./NewClient";

const Clients = () => {
  const queryClient = useQueryClient();
  let [openModal, setOpenModal] = React.useState(false);
  let [currentPage, setCurrentPage] = React.useState(1);
  let [clientsPerPage, setClientsPerPage] = React.useState(5);
  let [searchTxt, setSearchTxt] = React.useState("");

  const { data, status } = useQuery(["allClients"], () => getClients());

  const deleteCt = useMutation(delClient, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["allClients"]);
      toast(res.message);
    },
    onError: (res) => {
      toast(res.message);
    },
  });

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients =
    data && data.data.slice(indexOfFirstClient, indexOfLastClient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <div className="p-2">
        <div className="mb-3">
          <Modal
            isOpen={openModal}
            content={<NewClient closeModal={(e) => setOpenModal(e)} />}
            title="Add new client"
            closeModal={() => setOpenModal(!openModal)}
            btnClass="float-right flex items-center text-gray-700 border border-gray-700 p-3 rounded-full hover:bg-cyan-700 hover:border-cyan-700 hover:text-white"
            btnText={
              <>
                <PlusIcon className="inline-block w-5 h-5 md:mr-2" /> Add new
              </>
            }
          />
          <h1 className="text-2xl font-bold text-teal-700">Clients</h1>
          <p className="italic">Manage clients</p>
        </div>
        <div className="flex items-center p-2 md:p-4 bg-gray-100 rounded-full mb-3">
          <SearchIcon className="w-8 h-8 text-gray-400" />
          <input
            type="text"
            className="w-full border-none outline-none p-2 bg-transparent"
            placeholder="Search..."
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </div>

        <div className="row clients-list">
          <div className="float-right mb-3">
            <div className="inline-block mr-3 text-xs">Clients per page</div>
            <select
              className="p-1 text-xs bg-slate-100 border border-slate-300 rounded-md outline-none"
              onChange={(e) => setClientsPerPage(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div
            className={
              data && data.length <= clientsPerPage ? "hidden" : "block"
            }
          >
            <ClientPagination
              clientsPerPage={clientsPerPage}
              totalClients={data && data.length}
              paginate={paginate}
            />
          </div>
          <div className="w-full float-left">
            {status === "loading" && <ContentLoading />}
            {status === "error" && (
              <p className="text-center text-slate-500 italic">
                Something went wrong! Contact website administrator.
              </p>
            )}
            {data && (
              <ClientList
                filterText={searchTxt}
                data={currentClients}
                deleteClient={deleteCt}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
