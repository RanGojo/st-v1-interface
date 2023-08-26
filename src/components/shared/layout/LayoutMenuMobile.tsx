import useActiveRoute from '@/hooks/useActiveRoute'

import Link from 'next/link'
import { AiOutlineGift, AiOutlineRise } from 'react-icons/ai'
import { styled } from 'styled-components'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'
function LayoutMenuMobile() {
  const { t } = useLocaleTranslation()
  const { isActive } = useActiveRoute()
  return (
    <Container>
      <NextLink href='/pools'>
        <MenuButton
          className={`${isActive('pools') || isActive('stake') || isActive('unstake') ? 'active' : ''}`}
        >
          <AiOutlineRise size={16} />
          {t('v2.header.invest')}
        </MenuButton>
      </NextLink>
      <NextLink href='/incentives'>
        <MenuButton>
          <AiOutlineGift size={16} /> {t('v2.header.incentives')}
        </MenuButton>
      </NextLink>
    </Container>
  )
}

const { Container, NextLink, MenuButton } = {
  Container: styled.nav`
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(143, 152, 214);
    padding: ${({ theme }) => theme.size[16]};
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};
    border-top: 1px solid ${({ theme }) => theme.color.blackAlpha[500]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: none;
    }
  `,
  NextLink: styled(Link)`
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
  `,
  MenuButton: styled.button`
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};

    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;

    background: transparent;
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;

    &.active {
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }
  `
}

export default LayoutMenuMobile
