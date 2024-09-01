import Moralis from "moralis";

function sortByBalance(data) {
	return data.sort((a, b) => {
		return a.balance_formatted - b.balance_formatted;
	});
}

Moralis.start({
	apiKey:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImEwZjU4ODA5LWRkNzItNDMyYi05ZTljLTIzMjgxZTc2ZmNmNCIsIm9yZ0lkIjoiNDA1Nzg1IiwidXNlcklkIjoiNDE2OTY4IiwidHlwZUlkIjoiYWMzOTM3MjctZTFhOS00N2M2LTgzZDctMjNhYzQwMmVlMjU0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjQ1MTczMDIsImV4cCI6NDg4MDI3NzMwMn0.lCYLQBX6fHjx-cufAaMNCZiWR0HfWNO2uG_4GxFOS2k",
});

export const getTokenHoldersSum = async (tokenAddress) => {
	try {
		const response = await Moralis.EvmApi.token.getTokenOwners({
			chain: "0xa4b1",
			order: "ASC",
			tokenAddress: tokenAddress,
		});
		const sorted = sortByBalance(response.toJSON().result);
		sorted.pop();
		const sum = sorted.reduce(
			(acc, curr) => Number(acc) + Number(curr.balance_formatted),
			0
		);
		return sum;
	} catch (e) {
		console.error(e);
	}
};
