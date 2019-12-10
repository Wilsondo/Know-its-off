import React, {Component} from 'react';
import Appliances from './components/appliances';
import Chart from "react-apexcharts";

class App extends Component {
    render() {
	const { loading } = this.state;
	if(loading){
	     return null
	}
        return (
	<div className="app">
            <Appliances appliances={this.state.appliances} />
	    <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
	</div>
        );
    }

    state = {
	loading: true,
        appliances: [],
	options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        },
        series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
        ]
    };

    componentDidMount() {
        fetch('https://know-its-off.appspot.com/api/appliances')
            .then(res => res.json())
            .then((data) => {
                this.setState({ appliances: data, loading: false })
            })
            .catch(console.log)
    }
}

export default App;
