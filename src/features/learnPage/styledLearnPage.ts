import styled from 'styled-components'

export const StyledPacksPage = styled.div`
  .learnWrapper {
    margin-top: 18px;
  }
  .headerH1 {
    margin-top: 27px;
    margin-bottom: 18px;
    text-align: center;
  }
  .headerH4 {
    text-align: left;
    margin-top: 13px;
  }
  .answerBtn {
    margin-top: 29px;
    margin-bottom: 15px;
  }
  .answer {
    margin-top: 35px;
  }
  .headerUl {
    margin-top: 24px;
  }
  .element {
    margin: 12px 0;
  }

  .label input[type='radio'],
  .checked input[type='radio'] {
    visibility: hidden;
    position: absolute;
  }

  .label,
  .checked {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: fit-content;
  }
  .label:before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 12px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #000000;
    border-radius: 50%;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .checked:before {
    border: 4px solid ${({ theme }) => theme.colors.buttonPrimaryBg};
  }
  .nextBtn {
    margin-top: 42px;
    margin-bottom: 3px;
  }
`
