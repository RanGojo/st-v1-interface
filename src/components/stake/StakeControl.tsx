import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import StakePoolInfo from './StakePoolInfo'
import StakeSwitchActions from './StakeSwitchAction'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'
import { AiFillCheckCircle, AiOutlineShareAlt } from 'react-icons/ai'
import { StakeForm } from './StakeForm'
import { StakeFormEmpty } from './StakeFormEmpty'
import { Tooltip } from 'antd'
import useTranslation from '@/hooks/useTranslation'

interface StakeControlProps {
  poolAddress: `0x${string}` | undefined
  type: 'deposit' | 'withdraw'
}

export default function StakeControl({ poolAddress, type }: StakeControlProps) {
  const { t } = useTranslation()
  const { account } = useConnectedAccount()
  const hasAccountAndPool = account && poolAddress

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  return (
    <Container>
      <Form>
        {hasAccountAndPool && (
          <header>
            <div>
              <EnsAvatar size={32} address={poolAddress} />
              <Verified>
                <EnsName larger address={poolAddress} />
                <VerifiedIcon fontSize={16} />
              </Verified>
            </div>
            <Tooltip trigger='click' title={t('copiedToClipboard')}>
              <ShareButton onClick={copyToClipboard}>
                <ShareIcon />
              </ShareButton>
            </Tooltip>
          </header>
        )}
        <StakeSwitchActions poolAddress={poolAddress} />
        {hasAccountAndPool && <StakeForm type={type} accountAddress={account} poolAddress={poolAddress} />}
        {!hasAccountAndPool && (
          <StakeFormEmpty type={type} accountAddress={account} poolAddress={poolAddress} />
        )}
      </Form>
      <StakePoolInfo poolAddress={poolAddress} />
    </Container>
  )
}

const { Container, Form, Verified, VerifiedIcon, ShareButton, ShareIcon } = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
  `,
  Form: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, 468px);

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[500]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    header {
      padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[8]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};
      border: none;
      transition: background-color 0.1s ease;
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
      }
    }
  `,
  Verified: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    color: ${({ theme }) => theme.color.whatsapp[600]};
    > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
  `,
  VerifiedIcon: styled(AiFillCheckCircle)`
    color: ${({ theme }) => theme.color.secondary};
  `,
  ShareButton: styled.button`
    border: none;
    width: 32px;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.secondary};
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 50%;
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }
  `,
  ShareIcon: styled(AiOutlineShareAlt)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `
}
