import React from "react";
import Head from "next/head";
import ClientOnly from "../components/ClientOnly";
import Header from "../components/Header";
import Table from "../components/Table";
import Summary from "../components/Summary";

export default function table() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Head>
				<title>Aleo Miner</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="h-16 w-full bg-gray-50 border-b border-gray-200">
				<Header />
			</header>
			<main className="w-full max-w-8xl mx-auto px-4 py-16">
				<div className="text-5xl text-center pb-10">Miners</div>
				<ClientOnly>
					<Summary />
					<Table />
				</ClientOnly>
			</main>
		</div>
	);
}
