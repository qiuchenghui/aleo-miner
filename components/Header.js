import React from "react";

function Header({ posts }) {
	console.log(posts);
	return <div className="w-full my-5 mx-4">Aleo Miner</div>;
}

const minerAddress =
	"aleo1v9eukjz2gcs7cgtfahrltcez8sr8vpcr4yssulqlaqwp44z8dups87yeqr";

export async function getStaticProps() {
	const res = await fetch(
		`https://www.aleo.network/api/miner-info?address=${minerAddress}`
	);
	const posts = await res.json();
	console.log(posts);

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { posts }, // will be passed to the page component as props
	};
}

export default Header;
