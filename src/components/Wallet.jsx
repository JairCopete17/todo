import { useAccount, useConnect } from 'wagmi'

export default function Wallet () {
	const [{ data: connectData }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

	const shortenedAddress = address => `${address.substring(0, 5)}...${address.substring(address.length - 4)}`

	return (
		<div className="w-full flex flex-row justify-between text-gray-600">
			{
				accountData
					? <p
							className="text-2xl font-bold truncate"
							title={accountData.ens?.name ? accountData.ens?.name : accountData.address}
						>
						, {accountData.ens?.name ? accountData.ens?.name : shortenedAddress(accountData.address)}!
						</p>
					: <p className="text-2xl font-bold">!</p>
			}
			{
				accountData
					? <button onClick={disconnect}>Disconnect</button>
					: connectData.connectors.map((connector) => (
							<button onClick={() => connect(connector)}>Connect</button>
						))
			}
		</div>
	)
}
