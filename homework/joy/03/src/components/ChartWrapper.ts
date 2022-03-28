import { $ } from '@/utils/utils';

export const ChartWrapper = () => {
  function setChartData(data: any) {
    const chartData = data.slice(-14).map((value: any) => value.Cases);
    const chartLabel = data
      .slice(-14)
      .map((value: any) =>
        new Date(value.Date).toLocaleDateString().slice(5, -1),
      );

    renderChart(chartData, chartLabel);
  }

  function renderChart(data: any, labels: any) {
    const ctx = $('#lineChart').getContext('2d');

    // @ts-ignore
    Chart.defaults.global.defaultFontColor = '#f5eaea';
    // @ts-ignore
    Chart.defaults.global.defaultFontFamily = 'Exo 2';
    // @ts-ignore
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Confirmed for the last two weeks',
            backgroundColor: '#feb72b',
            borderColor: '#feb72b',
            data,
          },
        ],
      },
      options: {},
    });
  }

  return {
    setChartData,
  };
};
