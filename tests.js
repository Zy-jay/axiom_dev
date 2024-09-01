function App() {
    const { data, error, isPending } = useReadContracts({
      contracts: tokenAddresses.map(address => ({
        address,
        abi,
        functionName: 'totalSupply',
      })),
    });
  
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <div>
        {data.map((supply, index) => (
          <div key={index}>
            Total Supply of Token {tokenAddresses[index]}: {supply?.toString()}
          </div>
        ))}
      </div>
    );
  }