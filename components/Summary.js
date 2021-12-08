import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
	query AleoSummary {
		nodes(filter: { node_type: MINER, is_alive: true }) {
			summary {
				total
				asn
				mined
				mining
				syncing
				peering
				ready
			}
		}
	}
`;

export default function Summary() {
	const { data, loading, error } = useQuery(QUERY, {
		pollInterval: 25000,
	});

	const [total, setTotal] = useState("-");
	const [asn, setAsn] = useState("-");
	const [mining, setMining] = useState("-");
	const [syncing, setSyncing] = useState("-");
	const [peering, setPeering] = useState("-");
	const [ready, setReady] = useState("-");
	const [hello, setHello] = useState("-");
	const [mined, setMined] = useState("N/A");

	useEffect(() => {
		if (data?.nodes.summary) {
			const result = data.nodes.summary;
			setTotal(result.total);
			setAsn(result.asn);
			setMining(result.mining);
			setSyncing(result.syncing);
			setPeering(result.peering);
			setReady(result.ready);
		}
	}, [data]);

	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-26">
			<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 divide-y divide-x md:divide-y-0 divide-gray-200 shadow-xl border border-gray-200 rounded-lg">
				<div className="py-6 px-6">
					<div className="font-semibold">{total}</div>
					<div className="font-light text-sm text-gray-600">Total</div>
				</div>
				<div className="py-6 px-6">
					<div className="font-semibold">{mined}</div>
					<div className="font-light text-sm text-gray-600">Mined</div>
				</div>
				<div className="py-6 px-6">
					<div className="font-semibold">{asn}</div>
					<div className="font-light text-sm text-gray-600">ASN</div>
				</div>
				<div className="py-6 px-6">
					<div className="font-semibold">{mining}</div>
					<div className="font-light text-sm text-gray-600">Mining</div>
				</div>
				<div className="py-6 px-6">
					<div className="font-semibold">{syncing}</div>
					<div className="font-light text-sm text-gray-600">Syncing</div>
				</div>
				<div className="py-6 px-6">
					<div className="font-semibold">{peering}</div>
					<div className="font-light text-sm text-gray-600">Peering</div>
				</div>
				<div className="py-6 px-6">
					<div className="font-semibold">{ready}</div>
					<div className="font-light text-sm text-gray-600">Ready</div>
				</div>
				<div className="py-6 px-6">
					<a
						href="https://www.aleo.network/leaderboard/aleo1v9eukjz2gcs7cgtfahrltcez8sr8vpcr4yssulqlaqwp44z8dups87yeqr"
						target="_blank"
						className="font-semibold text-blue-500"
					>
						Rank
					</a>
					<div className="font-light text-sm text-gray-600">Rank</div>
				</div>
			</div>
		</div>
	);
}
