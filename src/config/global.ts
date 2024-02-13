interface GlobalConfig {
  url: string
  websiteUrl: string
  auditUrl: string
  appUrl: string
  apy: string
  stakeTogetherUniversityUrlBr: string
  stakeTogetherUniversityUrlEn: string
  docsPt: string
  docsEn: string
  fees: {
    operation: string
    rewards: string
  }
  rango: {
    apiKey: string
    affiliateRef: string
    affiliatePercentage: number
    wallets: {
      ETH: string
    }
  }
}

export const globalConfig: GlobalConfig = {
  url: 'https://app.staketogether.org',
  websiteUrl: 'https://staketogether.org',
  appUrl: 'https://app.staketogether.org',
  auditUrl: 'https://github.com/staketogether/st-v1-contracts/tree/main/audits',
  stakeTogetherUniversityUrlEn: 'https://university.staketogether.org/en/collections/6550996-documentation',
  stakeTogetherUniversityUrlBr: 'https://university.staketogether.org/pt/collections/6550996-documentation',
  docsPt: 'https://docs.staketogether.org',
  docsEn: 'https://docs.staketogether.org/stake-together/v/stake-together-en/stake-together/what-we-do',
  apy: '5.1',
  fees: {
    operation: '0',
    rewards: '8'
  },
  rango: {
    apiKey: process.env.NEXT_PUBLIC_RANGO_API_KEY as string,
    affiliateRef: process.env.NEXT_PUBLIC_RANGO_AFFILIATE_REF as string,
    affiliatePercentage: 0.3,
    wallets: {
      ETH: '0x',
    }
  }
}
