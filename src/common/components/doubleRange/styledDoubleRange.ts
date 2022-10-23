import styled from 'styled-components'

export const StyledDoubleRange = styled.div`
  margin-left: 48px;
  width: 251px;
  height: 62px;
  .rangeBlock {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .numberBlock {
    width: 35px;
    height: 35px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: black;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
  .double-range-slider-container {
    position: relative;
    font-size: 16px;
    color: #fff;
    width: 155px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .double-range-slider-rail {
    background: #366eff;
    opacity: 0.5;
    width: 155px;
    height: 10px;
    border-radius: 50px;
    z-index: 0;
  }

  .double-range-slider-track {
    background-color: #366eff;
    width: 155px;
    height: 10px;
    border-radius: 50px;
    position: absolute;
  }

  .double-range-slider-ball {
    background-color: #f5f5f5;
    outline: #366eff 5px solid;
    z-index: 2;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
  }

  .double-range-slider-active {
    z-index: 4;
  }

  .double-range-slider-tooltip {
    background-color: #366eff;
    visibility: hidden;
    display: flex;
    align-items: center;
    height: 20px;
    width: auto;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 15px 20px;
    flex-wrap: nowrap;
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }

  /* Position the tooltip */
  .double-range-slider-ball .double-range-slider-tooltip {
    left: 50%;
    transform: translateX(-50%);
  }

  .double-range-slider-over {
    bottom: 47.5px;
  }

  .double-range-slider-under {
    top: 47.5px;
  }

  .double-range-slider-mid {
    bottom: 37.5px;
  }

  .double-range-slider-over::after {
    border-color: #366eff transparent transparent transparent;
    top: 100%; /* At the bottom of the tooltip */
  }

  .double-range-slider-under::after {
    border-color: transparent transparent #366eff transparent;
    bottom: 100%; /* At the top of the tooltip */
  }

  .double-range-slider-tooltip::after {
    content: ' ';
    position: absolute;
    /*margin-left: var(--after-margin-left, -10px);*/
    border-width: 10px;
    border-style: solid;
    pointer-events: none;
    /*left: var(--after-left, 50%);*/
  }

  .double-range-slider-text-holder {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */ /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */ /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    white-space: nowrap;
  }

  .double-range-slider-step {
    position: absolute;
    z-index: 1;
    height: 10px;
    width: 5px;
    border-radius: 30px;
    background-color: #f5f5f5;
  }
`
