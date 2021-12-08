import React, { useState, Fragment } from "react";
import { useTable } from "react-table";
import { Dialog, Transition } from "@headlessui/react";
import { useQuery, gql } from "@apollo/client";
import _ from "lodash";

const QUERY = gql`
	query ($ip: String!) {
		node(ip: $ip) {
			ip
			last_seen
			created
			country
			country_code
			company
			asn
			block_mined
			block_height
			node_type
			node_status
			latest_cumulative_weight
			hostname
			message_version
			version
			org
			last_height_update
			connected_peers
			port
		}
		rpc_get_node_state(ip: $ip) {
			ip
		}
	}
`;

const nodeList = [
	"18.181.146.85",
	"54.199.13.229",
	"52.194.223.233",
	"54.249.97.59",
	"35.72.12.127",
	"3.115.105.92",
	"35.77.53.27",
	"35.74.235.118",
	"35.75.9.198",
	"18.181.110.39",
];

function useAllQuery(list) {
	const nodeQueryList = list.map((ip) => {
		const { data, loading, error } = useQuery(QUERY, {
			variables: { ip: ip },
			pollInterval: 42000,
		});
		return { ip: ip, data: data, loading: loading, error: error };
	});
	return nodeQueryList;
}

Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
		}
	}
	return fmt;
};

export default function Table() {
	const [isOpen, setIsOpen] = useState(false);
	const nodeQueryList = useAllQuery(nodeList);
	const tableList = [];
	tableList = nodeQueryList.map((item) => {
		const emptyNode = {
			asn: "-",
			block_height: "-",
			block_mined: 0,
			company: "-",
			connected_peers: 0,
			country: "-",
			country_code: "-",
			created: "-",
			hostname: "-",
			ip: item.ip,
			last_height_update: "-",
			last_seen: "-",
			latest_cumulative_weight: "-",
			message_version: 11,
			node_status: "-",
			node_type: "MINER",
			org: "-",
			port: 4132,
			version: "2.0",
			__typename: "Node",
			status: 1,
		};
		if (item.loading == true) {
			return emptyNode;
		} else if (item.error) {
			emptyNode.status = 0;
			return emptyNode;
		} else {
			const node = _.assign(emptyNode, item.data.node);
			node.last_seen = new Date(node.last_seen).format("MM-dd hh:mm:ss");
			return node;
		}
	});

	const result = React.useMemo(() => tableList, [tableList]);

	const columns = React.useMemo(
		() => [
			{
				Header: "IP",
				accessor: "ip", // accessor is the "key" in the data
			},
			{
				Header: "Blocks",
				accessor: "block_height",
			},
			{
				Header: "Cumulative Weight",
				accessor: "latest_cumulative_weight",
			},
			{
				Header: "Company",
				accessor: "company",
			},
			{
				Header: "Country",
				accessor: "country",
			},
			{
				Header: "Node Status",
				accessor: "node_status",
			},
			{
				Header: "last update",
				accessor: "last_seen",
			},
			{
				Header: "Status",
				accessor: "status",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: result });

	return (
		<div className="w-full max-w-7xl mx-auto px-4 py-14">
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={() => setIsOpen(false)}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-sm p-4 my-4 text-left bg-green-300 border border-gray-200 sm:rounded-lg">
								<Dialog.Title className="flex justify-between text-md text-white">
									<span>Copy SSH Link Successful!</span>
									<button
										type="button"
										className="inline-flex justify-center border border-transparent rounded-md hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={() => setIsOpen(false)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</Dialog.Title>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
			<div className="overflow-hidden overflow-x-scroll shadow-xl border border-gray-200 sm:rounded-lg">
				<table
					{...getTableProps()}
					className="min-w-full divide-y divide-gray-200"
				>
					<thead className="bg-gray-50">
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps()}
										scope="col"
										className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										<div className="flex items-center justify-between">
											{column.render("Header")}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody
						{...getTableBodyProps()}
						className="bg-white divide-y divide-gray-200"
					>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td
												{...cell.getCellProps()}
												className="px-6 py-4 whitespace-nowrap"
												role="cell"
											>
												{cell.column.id === "status" ? (
													cell.value === 1 ? (
														cell.row.values.node_status === "SHUTTING_DOWN" ? (
															<div className="text-yellow-500">warn</div>
														) : (
															<div className="text-green-400">online</div>
														)
													) : (
														<div className="text-red-400">offline</div>
													)
												) : cell.column.id === "ip" ? (
													<>
														<a
															href={`https://aleochain.io/checker?ip=${cell.value}`}
															className="text-sm text-blue-500"
															target="_blank"
														>
															{cell.render("Cell")}
														</a>
														<button
															className="text-sm"
															onClick={() => {
																navigator.clipboard.writeText(
																	`ssh -i "handynode.pem" ubuntu@ec2-${cell.value
																		.split(".")
																		.join(
																			"-"
																		)}.ap-northeast-1.compute.amazonaws.com`
																);
																setIsOpen(true);
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-4 w-4 -mb-0.5 ml-1 text-blue-500"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
																/>
															</svg>
														</button>
													</>
												) : (
													<div className="text-sm text-gray-500">
														{cell.render("Cell")}
													</div>
												)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
