import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
var numeral = require("numeral");

const QUERY = gql`
	query AleoSummary {
		metrics {
			max_message_version
			node_count {
				value
			}
			latest_block_auth {
				ip
				block {
					header {
						metadata {
							height
							difficulty_target
							cumulative_weight
						}
					}
				}
			}
			latest_block_max {
				ip
				block {
					header {
						metadata {
							height
							difficulty_target
							cumulative_weight
						}
					}
				}
			}
		}
	}
`;

function Header() {
	const { data } = useQuery(QUERY, {
		pollInterval: 10000,
	});

	const [nodes, setNodes] = useState(0);
	const [weight, setWeight] = useState(0);
	const [version, setVersion] = useState("11");
	const [lastBlock, setLastBlock] = useState(0);

	useEffect(() => {
		if (data?.metrics) {
			const result = data.metrics;
			setNodes(result.node_count.value);
			setVersion(result.max_message_version);
			setLastBlock(result.latest_block_max.block.header.metadata.height);
			setWeight(
				result.latest_block_max.block.header.metadata.cumulative_weight
			);
		}
	}, [data]);

	return (
		<div className="w-full flex justify-between">
			<div className="my-5 mx-4">Aleo Miner</div>
			<div className="my-3 mx-4 flex text-sm">
				<div className="mx-3">
					<div className="text-gray-500">Latest block:</div>
					<div>{numeral(lastBlock).format("0,0")}</div>
				</div>
				<div className="mx-3 hidden md:block">
					<div className="text-gray-500">Weight:</div>
					<div>{numeral(weight).format("0,0")}</div>
				</div>
				<div className="mx-3 hidden md:block">
					<div className="text-gray-500">Message version:</div>
					<div>{version}</div>
				</div>
				<div className="mx-3">
					<div className="text-gray-500">Nodes:</div>
					<div>{numeral(nodes).format("0,0")}</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
