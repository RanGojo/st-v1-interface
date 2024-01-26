import axios, { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";


export interface QuoteThor {
  expected_amount_out: string;
  expected_amount_out_streaming: string;
  expiry: number;
  fees: {
    affiliate: string;
    asset: string;
    liquidity: string;
    outbound: string;
    slippage_bps: number;
    total: string;
    total_bps: number;
  };
  inbound_address: string;
  max_streaming_quantity: number;
  memo: string;
  notes: string;
  outbound_delay_blocks: number;
  outbound_delay_seconds: number;
  recommended_min_amount_in: string;
  slippage_bps: number;
  router?: `0x${string}`
  streaming_slippage_bps: number;
  streaming_swap_blocks: number;
  total_swap_seconds: number;
  warning: string;
}

export default function useQuoteAssets() {

  const [quote, setQuote] = useState<QuoteThor>()


  const handleQuoteAssets = useCallback(async (fromAsset: string, toAsset: string, amount: string, wallet?: string) => {
    if (!fromAsset || !toAsset || !amount) {
      return
    }

    let url = `https://thornode.ninerealms.com/thorchain/quote/swap?from_asset=${fromAsset}&to_asset=${toAsset}&amount=${amount}`
    if (wallet) {
      url += `&destination=${wallet}`
    }
    const response = await axios.get<QuoteThor>(url)

    if (response.status === HttpStatusCode.Ok) {
      console.log('response.data', response.data)
      setQuote(response.data)
    }
  }, [])



  return { quote, handleQuoteAssets, clearQuote: () => setQuote(undefined) }
}
