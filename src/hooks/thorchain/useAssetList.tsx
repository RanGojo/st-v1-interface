
import axios, { HttpStatusCode } from "axios";
import { useCallback, useEffect, useState } from "react";

interface AssetInfo {
  asset: string;
  short_code: string;
  status: string;
  pending_inbound_asset: string;
  pending_inbound_rune: string;
  balance_asset: string;
  balance_rune: string;
  pool_units: string;
  LP_units: string;
  synth_units: string;
  synth_supply: string;
  savers_depth: string;
  savers_units: string;
  synth_mint_paused: boolean;
  synth_supply_remaining: string;
  loan_collateral: string;
  loan_collateral_remaining: string;
  loan_cr: string;
  derived_depth_bps: string;
}


export default function useAssetsList() {

  const [list, setList] = useState<AssetInfo[]>()


  const handleQuote = useCallback(async () => {
    const response = await axios.get<AssetInfo[]>(`https://thornode.ninerealms.com/thorchain/pools`)
    console.log(response)
    if (response.status === HttpStatusCode.Ok) {
      setList(response.data.filter(asset => asset.status === 'Available'))

    }
  }, [])

  useEffect(() => {
    !list && handleQuote()
  }, [handleQuote, list])


  return { list }
}
