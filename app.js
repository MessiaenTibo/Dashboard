let chart

const _generateLabels = (amount) => {
    return new Array(amount)
      .fill()
      .map(
        (_, i) =>
          `${new Date(
            new Date().setDate(new Date().getDate() - i),
          ).toLocaleDateString()}`,
      )
      .reverse()
  }
  
  const _generateValues = (amount) => {
    return new Array(amount)
      .fill()
      .map(() => Math.floor(Math.random() * 1000))
      .reverse()
  }
  
  const sampleData = {
    day: {
      labels: [`${new Date().toLocaleDateString()}`],
      data: [Math.floor(Math.random() * 1000)],
    },
    week: {
      labels: _generateLabels(7),
      data: _generateValues(7),
    },
    month: {
      labels: _generateLabels(30),
      data: _generateValues(30),
    },
    year: {
      labels: _generateLabels(365),
      data: _generateValues(365),
    },
  }


const updateChart = function () {
    const ctx = document.querySelector('.js-graph');
    const { labels, data } = sampleData['day']
    if (chart) {
        chart.data.labels = labels
        chart.data.datasets[0].data = data
      
      
        return chart.update()
      }
      else
      {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                    label: 'Number of visitors',
                    data,
                    backgroundColor: 'rgba(163, 160, 251, 1)',
                    //barPercentage: 0.5,
                    barThickness: 20,
                },
              ],
            },
          })
      }
}


const listenToUi = function () {
    const buttons = document.querySelectorAll('.js-button-click');
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        let test = this.value;
        if (test == 'year') {
          chart.data.datasets[0].barThickness = 1;
        } else if (test == 'month') {
          chart.data.datasets[0].barThickness = 15;
        } else if (test == 'week') {
          chart.data.datasets[0].barThickness = 15;
        } else if (test == 'day') {
          chart.data.datasets[0].barThickness = 15;
        }
        console.log(test);
        const { labels, data } = sampleData[test];
        if (chart) {
          chart.data.labels = labels;
          chart.data.datasets[0].data = data;
  
          return chart.update();
        }
      });
    });
  };


document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded');
    init()
  });
  
  const init=function() {
    updateChart();
    listenToUi();
  }