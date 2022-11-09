import styled from 'styled-components'

export const StyledPacksPage = styled.div`
  .learnWrapper {
    margin-top: 18px;

    .questionArea {
      display: flex;
      flex-direction: row;

      .questionSpan {
        margin-right: 3px;
      }

      .questionDiv {
        width: 100%;
      }
    }
    .questionImg {
      flex-direction: column;
    }
  }

  .headerH1 {
    margin-top: 27px;
    margin-bottom: 18px;
    text-align: center;
  }

  .shotsArea {
    display: flex;
    flex-direction: row;
    align-items: center;

    .headerH4 {
      text-align: left;
      margin-top: 13px;
    }

    .shotsNumber {
      margin-top: 13px;
      margin-left: 3px;
      opacity: 0.5;
      max-width: 100%;
    }
  }
  .imageArea {
    display: flex;
    justify-content: center;
    margin-top: 13px;
    .image {
      max-height: 200px;
      margin: 0 auto;
    }
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
