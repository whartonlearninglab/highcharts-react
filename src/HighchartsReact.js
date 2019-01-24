import React from 'react'
import PropTypes from 'prop-types'

// Adapted from highcharts-react-official v2.0.0 to work with React < 16.3.
// Could not use HighchartsReact from highcharts-react-official because it uses
// React.createRef(); which is only available in React 16.3 or higher

export default class HighchartsReact extends React.PureComponent {
  constructor(props) {
    super(props);
    this.container = null;
    this.setContainer = this.setContainer.bind(this);
  }

  componentDidMount() {
    const { highcharts, constructorType, options, callback } = this.props;
    // Create chart
    this.chart = highcharts[constructorType](this.container, options, callback);
  }

  componentDidUpdate() {
    const { props } = this;
    if (props.allowChartUpdate !== false) {
      this.chart.update(props.options, ...props.updateArgs);
    }
  }

  componentWillUnmount() {
    // Destroy chart
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  setContainer(div) {
    this.container = div;
  }

  render() {
    // Create container for the chart
    return <div ref={this.setContainer} />
  }
}

HighchartsReact.propTypes = {
  highcharts: PropTypes.object,
  constructorType: PropTypes.string,
  options: PropTypes.object,
  callback: PropTypes.func,
  allowChartUpdate: PropTypes.bool,
  updateArgs: PropTypes.array,
};

HighchartsReact.defaultProps = {
  highcharts: window.Highcharts,
  constructorType: 'chart',
  options: {},
  callback: undefined,
  allowChartUpdate: true,
  updateArgs: [true, true],
};
