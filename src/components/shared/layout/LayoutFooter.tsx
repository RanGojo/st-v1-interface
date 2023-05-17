import styled from 'styled-components'

export default function LayoutFooter() {
  const date = new Date()
  return (
    <Container>
      <span>© {date.getFullYear()} Stake Together | All rights reserved.</span>
    </Container>
  )
}
const { Container } = {
  Container: styled.div`
    width: 100%;
    padding: 16px 32px;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      line-height: 22px;
      text-align: center;
      display: flex;
      align-items: center;
    }
  `
}
