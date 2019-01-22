import React from "react";

export default class HighchartsReact extends React.PureComponent {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const props = this.props;
    const highcharts = props.highcharts || window.Highcharts;
    // Create chart
    this.chart = highcharts[props.constructorType || "chart"](
      this.container,
      props.options,
      props.callback ? props.callback : undefined
    );
  }

  componentDidUpdate() {
    if (this.props.allowChartUpdate !== false) {
      this.chart.update(
        this.props.options,
        ...(this.props.updateArgs || [true, true])
      );
    }
  }

  componentWillUnmount() {
    // Destroy chart
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  render() {
    // Create container for the chart

    return (
      <div ref={(div) => { this.container = div }} />
    )
  }
}
