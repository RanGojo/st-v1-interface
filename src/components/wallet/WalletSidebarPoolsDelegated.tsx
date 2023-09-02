import EnsAvatar from '@/components/shared/ens/EnsAvatar'
import EnsName from '@/components/shared/ens/EnsName'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebar from '@/hooks/useWalletSidebar'
import { truncateWei } from '@/services/truncate'
import { Delegation } from '@/types/Delegation'
import Link from 'next/link'
import styled from 'styled-components'

type WalletSideBarPoolsDelegatedProps = {
  accountDelegations: Delegation[]
}

export default function WalletSidebarPoolsDelegated({ accountDelegations }: WalletSideBarPoolsDelegatedProps) {
  const { t } = useLocaleTranslation()
  const { setOpenSidebar } = useWalletSidebar()

  return (
    <Container>
      {accountDelegations.length === 0 && (
        <EmptyContainer>
          <span>{t('noStake')}</span>
        </EmptyContainer>
      )}
      {accountDelegations.map((delegation, index) => (
        <DelegatedPool
          key={index}
          href={`/invest/deposit/${delegation.delegated.address}`}
          onClick={() => setOpenSidebar(false)}
        >
          <div>
            <div>
              <EnsAvatar address={delegation.delegated.address} />
              <EnsName address={delegation.delegated.address} />
            </div>
          </div>
          <span>
            {truncateWei(delegation.delegationBalance, 6)}
            <span>{t('lsd.symbol')}</span>
          </span>
        </DelegatedPool>
      ))}
    </Container>
  )
}

const { Container, DelegatedPool, EmptyContainer } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    margin-top: ${({ theme }) => theme.size[16]};

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    div > span:nth-child(2) > span {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  EmptyContainer: styled.div`
    span {
      width: 100%;
      text-align: center;
    }
  `,
  DelegatedPool: styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    border-radius: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.blackAlpha[50]};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    transition: background-color 0.1s ease;
    &:hover {
      background: ${({ theme }) => theme.color.blackAlpha[100]};
    }

    > div {
      display: flex;

      > div {
        display: flex;
        gap: ${({ theme }) => theme.size[8]};
      }

      > span {
        color: ${({ theme }) => theme.color.black};
      }
    }

    > span {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
